'use client';
export const dynamic = 'force-dynamic';

import React, { useCallback, useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { startGame, submitAnswerAndRecord, getCurrentProblem } from '@/src/store/slices/gameSlice';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { Problems } from '@/src/types/enums/problems.enum';
import { RootState, AppDispatch } from '@/src/store';
import { GAME_CONFIG } from '@/src/config/gameConfig';
import BlendingPage from '@/src/components/ui/pages/blending-page';
import SegmentingPage from '@/src/components/ui/pages/segmenting-page';
import TutorialBlendingPage from '@/src/components/ui/pages/tutorial-blending-page';
import { StartScreen } from '@/src/components/ui/pages/start-screen';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import { Button } from '@/src/components/ui/atoms/button';

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
  const currentProblem = useSelector((state: RootState) => getCurrentProblem(state));
  const currentProblemType = useSelector((state: RootState) => state.game.config?.[state.game.currentProblemIndex]);
  const score = useSelector((state: RootState) => state.game.score);
  const [gameStarted, setGameStarted] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  const startGameHandler = useCallback(
    async (includeTutorial: boolean) => {
      const gameConfig = includeTutorial
        ? GAME_CONFIG
        : GAME_CONFIG.filter(type => type !== Problems.TUTORIAL_BLENDING);
      await dispatch(startGame(gameConfig));
      setGameStarted(true);
    },
    [dispatch]
  );

  if (loading || !user) {
    return null;
  }

  if (!gameStarted) {
    return <StartScreen onStart={startGameHandler} showHeader={false} />;
  }

  const handleSubmit = (answer: string) => {
    dispatch(submitAnswerAndRecord(answer, user.uid));
  };

  const getBackgroundColor = () => {
    switch (currentProblemType) {
      case Problems.TUTORIAL_BLENDING:
        return 'bg-green-600';
      case Problems.BLENDING:
        return 'bg-green-600';
      case Problems.SEGMENTING:
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="relative min-h-screen">
      <DotPattern className={`absolute inset-0 ${getBackgroundColor()} text-gray-200`} />
      {currentProblem ? (
        currentProblemType === Problems.TUTORIAL_BLENDING ? (
          <TutorialBlendingPage problem={currentProblem as BlendingProblem} onSubmit={handleSubmit} />
        ) : currentProblemType === Problems.BLENDING ? (
          <BlendingPage problem={currentProblem as BlendingProblem} onSubmit={handleSubmit} />
        ) : currentProblemType === Problems.SEGMENTING ? (
          <SegmentingPage problem={currentProblem as SegmentingProblem} onSubmit={handleSubmit} />
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center text-black">Unknown Problem</div>
          </div>
        )
      ) : (
        <div className="relative min-h-screen flex items-center justify-center">
          <DotPattern className="absolute inset-0 bg-blue-600 text-gray-200" />
          <div className="relative z-10 text-center space-y-8">
            <h1 className="text-6xl font-bold text-white mb-4">🎉 Game Over! 🎉</h1>
            <div className="text-4xl text-white">
              <p className="font-bold mb-2">Your Final Score</p>
              <p className="text-7xl font-extrabold text-white">{score}</p>
            </div>
            <div className="mt-8 flex flex-col gap-4 items-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-white/20 hover:bg-white/30 text-white text-xl font-bold px-8 py-4 rounded-xl">
                Play Again! 🎮
              </Button>
              <Link href="/dashboard">
                <Button className="bg-white/20 hover:bg-white/30 text-white text-xl font-bold px-8 py-4 rounded-xl">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
