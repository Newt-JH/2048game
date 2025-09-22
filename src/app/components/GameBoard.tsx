'use client';

import React from 'react';
import { Grid } from '../hooks/useGame';

interface GameBoardProps {
  grid: Grid;
}

// 숫자별 색상 스타일
function getTileStyle(value: number): string {
  if (value === 0) return '';

  const styles: { [key: number]: string } = {
    2: 'bg-blue-100 text-blue-900',
    4: 'bg-blue-200 text-blue-900',
    8: 'bg-green-300 text-green-900',
    16: 'bg-green-400 text-white',
    32: 'bg-yellow-400 text-white',
    64: 'bg-orange-400 text-white',
    128: 'bg-orange-500 text-white font-bold',
    256: 'bg-red-400 text-white font-bold',
    512: 'bg-red-500 text-white font-bold',
    1024: 'bg-purple-500 text-white font-bold',
    2048: 'bg-purple-600 text-white font-bold animate-pulse',
  };

  return styles[value] || 'bg-purple-600 text-white font-bold text-sm';
}

export default function GameBoard({ grid }: GameBoardProps) {
  // grid가 정의되지 않았거나 비어있으면 로딩 표시
  if (!grid || !Array.isArray(grid) || grid.length === 0) {
    return (
      <div className="bg-gray-500 p-2 rounded-md w-fit mx-auto">
        <div className="grid grid-cols-4 gap-2">
          {Array(16).fill(0).map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded bg-gray-300"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-500 p-2 rounded-md w-fit mx-auto">
      <div className="grid grid-cols-4 gap-2">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded flex items-center justify-center
                text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold
                transition-all duration-300 ease-in-out transform hover:scale-105
                ${cell === 0 ? 'bg-gray-300' : getTileStyle(cell)}
              `}
            >
              {cell !== 0 && cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}