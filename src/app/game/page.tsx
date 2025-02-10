'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, submitAnswer, getCurrentProblem } from '@/src/store/slices/gameSlice';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';

import { RootState, AppDispatch } from '@/src/store';
import { GAME_CONFIG } from '@/src/config/gameConfig';
import BlendingPage from '@/src/components/ui/pages/BlendingPage';
import SegmentingPage from '@/src/components/ui/pages/SegmentingPage';

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
  const currentProblem = useSelector((state: RootState) => getCurrentProblem(state));
  const score = useSelector((state: RootState) => state.game.score);
  const [gameStarted, setGameStarted] = useState(false);

  const startGameHandler = () => {
    dispatch(startGame(GAME_CONFIG));
    setGameStarted(true);
  };

  const handleSubmit = (answer: string) => {
    dispatch(submitAnswer(answer));
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={startGameHandler}
          className="px-6 py-3 text-xl font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentProblem ? (
        currentProblem instanceof BlendingProblem ? (
          <BlendingPage problem={currentProblem} onSubmit={handleSubmit} />
        ) : currentProblem instanceof SegmentingProblem ? (
          <SegmentingPage problem={currentProblem} onSubmit={handleSubmit} />
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center text-black">Unknown Problem</div>
          </div>
        )
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center text-black">
            <div className="text-4xl font-bold mb-4">Game Over!</div>
            <div className="text-2xl">Final Score: {score}</div>
          </div>
        </div>
      )}
    </div>
  );
}
