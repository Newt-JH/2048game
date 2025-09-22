'use client';

import React from 'react';

interface TileProps {
  value: number;
  row: number;
  col: number;
}

const getTileStyles = (value: number) => {
  if (value === 0) return 'opacity-0';

  const styles: { [key: number]: string } = {
    2: 'bg-gray-100 text-gray-800',
    4: 'bg-gray-200 text-gray-800',
    8: 'bg-orange-200 text-orange-800',
    16: 'bg-orange-300 text-orange-900',
    32: 'bg-orange-400 text-white',
    64: 'bg-orange-500 text-white',
    128: 'bg-yellow-300 text-white text-xl sm:text-2xl font-bold',
    256: 'bg-yellow-400 text-white text-xl sm:text-2xl font-bold',
    512: 'bg-yellow-500 text-white text-xl sm:text-2xl font-bold',
    1024: 'bg-yellow-600 text-white text-lg sm:text-xl font-bold',
    2048: 'bg-yellow-700 text-white text-lg sm:text-xl font-bold animate-pulse',
    4096: 'bg-red-500 text-white text-lg sm:text-xl font-bold',
    8192: 'bg-red-600 text-white text-lg sm:text-xl font-bold',
  };

  return styles[value] || 'bg-purple-600 text-white text-lg sm:text-xl font-bold';
};

const Tile: React.FC<TileProps> = ({ value, row, col }) => {
  if (value === 0) return null;

  return (
    <div
      className={`
        w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32
        rounded-md
        flex items-center justify-center
        font-bold text-sm sm:text-lg md:text-xl lg:text-2xl
        transition-all duration-150 ease-in-out
        transform hover:scale-105
        ${getTileStyles(value)}
      `}
    >
      {value}
    </div>
  );
};

export default Tile;