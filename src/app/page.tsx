'use client';

import React from 'react';
import { useGame } from './hooks/useGame';
import { useControls } from './hooks/useControls';
import GameBoard from './components/GameBoard';

export default function Home() {
  const { grid, score, bestScore, gameOver, won, move, newGame, keepPlaying } = useGame();

  // 컨트롤 설정
  useControls({ onMove: move, gameOver });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 p-4 overflow-hidden">
      <div className="w-full max-w-lg mx-auto">

        {/* 제목 */}
        <div className={`text-center mb-6 transition-opacity duration-300 ${gameOver || won ? 'opacity-30' : ''}`}>
          <h1 className="text-6xl font-bold text-gray-800 mb-2">2048</h1>
          <p className="text-gray-600">Join the tiles, get to 2048!</p>
        </div>

        {/* 점수판 */}
        <div className={`flex justify-between items-center mb-4 transition-opacity duration-300 ${gameOver || won ? 'opacity-30' : ''}`}>
          <div className="flex gap-2">
            <div className="bg-gray-200 px-3 py-2 rounded text-center">
              <div className="text-xs text-gray-600 uppercase font-bold">Score</div>
              <div className="text-lg font-bold">{score}</div>
            </div>
            <div className="bg-gray-200 px-3 py-2 rounded text-center">
              <div className="text-xs text-gray-600 uppercase font-bold">Best</div>
              <div className="text-lg font-bold">{bestScore}</div>
            </div>
          </div>

          <button
            onClick={newGame}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-bold transition-colors"
          >
            New Game
          </button>
        </div>

        {/* 게임 보드 */}
        <div className="mb-8 mt-4 relative z-30">
          <GameBoard grid={grid} />
        </div>

        {/* 설명 */}
        <div className={`text-center text-gray-600 text-sm transition-opacity duration-300 ${gameOver || won ? 'opacity-30' : ''}`}>
          <p className="mb-1">
            <strong>HOW TO PLAY:</strong> Use arrow keys or swipe to move tiles.
          </p>
          <p>When two tiles with the same number touch, they merge into one!</p>
        </div>

        {/* 전체 딤드 오버레이 (게임 보드와 모달 제외) */}
        {(gameOver || won) && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-10 pointer-events-none"></div>
        )}

        {/* 게임 오버 모달 */}
        {gameOver && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-xl border-2 border-red-300">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Game Over!</h2>
              <button
                onClick={newGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-bold"
              >
                다시하기
              </button>
            </div>
          </div>
        )}

        {/* 승리 모달 */}
        {won && !gameOver && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-xl border-2 border-yellow-300">
              <h2 className="text-2xl font-bold mb-2 text-yellow-600">You Win! 🎉</h2>
              <p className="text-gray-600 mb-4">Congratulations! You reached 2048!</p>
              <div className="flex gap-2">
                <button
                  onClick={newGame}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-bold"
                >
                  New Game
                </button>
                <button
                  onClick={keepPlaying}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold"
                >
                  Keep Playing
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}