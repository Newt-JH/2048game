'use client';

import React from 'react';

interface GameModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onNewGame: () => void;
  onContinue?: () => void;
  type: 'win' | 'lose';
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  title,
  message,
  onNewGame,
  onContinue,
  type
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-2xl">
        <div className={`text-6xl mb-4 ${type === 'win' ? 'text-yellow-500' : 'text-red-500'}`}>
          {type === 'win' ? '🎉' : '😢'}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="space-y-3">
          <button
            onClick={onNewGame}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>

          {onContinue && (
            <button
              onClick={onContinue}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Keep Playing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModal;