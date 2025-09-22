'use client';

import { useState, useCallback } from 'react';

export type Grid = number[][];
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 4;

// 빈 그리드 생성
function createEmptyGrid(): Grid {
  return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
}

// 빈 셀 찾기
function getEmptyCells(grid: Grid): [number, number][] {
  const emptyCells: [number, number][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  return emptyCells;
}

// 랜덤 위치에 새 타일 추가 (무조건 2)
function addNewTile(grid: Grid): Grid {
  const newGrid = grid.map(row => [...row]);
  const emptyCells = getEmptyCells(newGrid);

  if (emptyCells.length === 0) return newGrid;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const [row, col] = emptyCells[randomIndex];
  newGrid[row][col] = 2; // 무조건 2

  return newGrid;
}

// 한 줄을 왼쪽으로 슬라이드 + 합치기
function slideRowLeft(row: number[]): { newRow: number[], score: number } {
  // 1. 0이 아닌 숫자들만 왼쪽으로 모으기
  const filtered = row.filter(cell => cell !== 0);

  // 2. 같은 숫자끼리 합치기
  const merged: number[] = [];
  let score = 0;
  let i = 0;

  while (i < filtered.length) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      // 같은 숫자가 인접해 있으면 합치기
      const sum = filtered[i] * 2;
      merged.push(sum);
      score += sum;
      i += 2; // 두 개를 합쳤으므로 2칸 건너뛰기
    } else {
      merged.push(filtered[i]);
      i += 1;
    }
  }

  // 3. 나머지 자리를 0으로 채우기
  const newRow = [...merged];
  while (newRow.length < GRID_SIZE) {
    newRow.push(0);
  }

  return { newRow, score };
}

// 그리드 회전 (시계방향 90도)
function rotateGridClockwise(grid: Grid): Grid {
  const newGrid = createEmptyGrid();
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      newGrid[j][GRID_SIZE - 1 - i] = grid[i][j];
    }
  }
  return newGrid;
}

// 그리드 회전 (반시계방향 90도)
function rotateGridCounterClockwise(grid: Grid): Grid {
  const newGrid = createEmptyGrid();
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      newGrid[GRID_SIZE - 1 - j][i] = grid[i][j];
    }
  }
  return newGrid;
}

// 방향에 따른 이동
function moveGrid(grid: Grid, direction: Direction): { newGrid: Grid, score: number, moved: boolean } {
  let workGrid = grid.map(row => [...row]);
  let totalScore = 0;

  // 모든 방향을 LEFT로 변환해서 처리
  switch (direction) {
    case 'UP':
      workGrid = rotateGridCounterClockwise(workGrid);
      break;
    case 'DOWN':
      workGrid = rotateGridClockwise(workGrid);
      break;
    case 'RIGHT':
      workGrid = workGrid.map(row => [...row].reverse());
      break;
    case 'LEFT':
    default:
      // 그대로 유지
      break;
  }

  // 각 행을 왼쪽으로 슬라이드
  const processedGrid = workGrid.map(row => {
    const result = slideRowLeft(row);
    totalScore += result.score;
    return result.newRow;
  });

  // 원래 방향으로 되돌리기
  let finalGrid = processedGrid;
  switch (direction) {
    case 'UP':
      finalGrid = rotateGridClockwise(finalGrid);
      break;
    case 'DOWN':
      finalGrid = rotateGridCounterClockwise(finalGrid);
      break;
    case 'RIGHT':
      finalGrid = finalGrid.map(row => [...row].reverse());
      break;
    case 'LEFT':
    default:
      // 그대로 유지
      break;
  }

  // 이동이 일어났는지 확인
  const moved = !gridsEqual(grid, finalGrid);

  return { newGrid: finalGrid, score: totalScore, moved };
}

// 두 그리드가 같은지 확인
function gridsEqual(grid1: Grid, grid2: Grid): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid1[i][j] !== grid2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// 게임 오버 확인
function isGameOver(grid: Grid): boolean {
  // 빈 셀이 있으면 게임 계속
  if (getEmptyCells(grid).length > 0) {
    return false;
  }

  // 인접한 셀끼리 합칠 수 있는지 확인
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = grid[i][j];
      // 오른쪽 셀과 비교
      if (j < GRID_SIZE - 1 && grid[i][j + 1] === current) {
        return false;
      }
      // 아래쪽 셀과 비교
      if (i < GRID_SIZE - 1 && grid[i + 1][j] === current) {
        return false;
      }
    }
  }

  return true;
}

// 승리 확인 (2048 타일이 있는지)
function hasWon(grid: Grid): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 2048) {
        return true;
      }
    }
  }
  return false;
}

export function useGame() {
  const [grid, setGrid] = useState<Grid>(() => {
    const emptyGrid = createEmptyGrid();
    return addNewTile(addNewTile(emptyGrid)); // 시작할 때 2개의 타일
  });

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('2048-best') || '0');
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const move = useCallback((direction: Direction) => {
    if (gameOver) return;

    const result = moveGrid(grid, direction);

    if (!result.moved) return; // 이동이 없으면 아무것도 하지 않음

    const newGrid = addNewTile(result.newGrid);
    const newScore = score + result.score;
    const newBestScore = Math.max(bestScore, newScore);

    setGrid(newGrid);
    setScore(newScore);
    setBestScore(newBestScore);
    setGameOver(isGameOver(newGrid));
    setWon(won || hasWon(newGrid));

    // 최고 점수 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('2048-best', newBestScore.toString());
    }
  }, [grid, score, bestScore, gameOver, won]);

  const newGame = useCallback(() => {
    const emptyGrid = createEmptyGrid();
    const startGrid = addNewTile(addNewTile(emptyGrid));

    setGrid(startGrid);
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, []);

  const keepPlaying = useCallback(() => {
    setWon(false);
  }, []);

  return {
    grid,
    score,
    bestScore,
    gameOver,
    won,
    move,
    newGame,
    keepPlaying
  };
}