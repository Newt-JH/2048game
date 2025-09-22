'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Direction } from './useGame';

interface UseControlsProps {
  onMove: (direction: Direction) => void;
  gameOver: boolean;
}

export function useControls({ onMove, gameOver }: UseControlsProps) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // 키보드 컨트롤
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault();
        onMove('UP');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault();
        onMove('DOWN');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault();
        onMove('LEFT');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault();
        onMove('RIGHT');
        break;
    }
  }, [onMove, gameOver]);

  // 터치 시작
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (gameOver) return;

    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }, [gameOver]);

  // 터치 끝
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (gameOver) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    const minSwipeDistance = 30;

    // 스와이프 거리가 충분한지 확인
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return;
    }

    // 방향 결정 (더 큰 변화량 기준)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 가로 스와이프
      if (deltaX > 0) {
        onMove('RIGHT');
      } else {
        onMove('LEFT');
      }
    } else {
      // 세로 스와이프
      if (deltaY > 0) {
        onMove('DOWN');
      } else {
        onMove('UP');
      }
    }
  }, [onMove, gameOver]);

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 정리
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleKeyDown, handleTouchStart, handleTouchEnd]);
}