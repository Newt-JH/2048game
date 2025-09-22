'use client';

import React from 'react';

interface GameHeaderProps {
  score: number;
  bestScore: number;
  onNewGame: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, bestScore, onNewGame }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-6xl sm:text-7xl font-bold text-gray-800 mb-2">2048</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Swipe or use arrow keys to play!
        </p>
      </div>

      {/* Score and Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* Current Score */}
          <div className="bg-gray-200 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase">
              Score
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              {score.toLocaleString()}
            </div>
          </div>

          {/* Best Score */}
          <div className="bg-gray-200 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase">
              Best
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              {bestScore.toLocaleString()}
            </div>
          </div>
        </div>

        {/* New Game Button */}
        <button
          onClick={onNewGame}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameHeader;