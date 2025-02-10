'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, submitAnswer, getCurrentProblem } from '@/src/store/slices/gameSlice';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { Problems } from '@/src/types/enums/problems.enum';
import { RootState, AppDispatch } from '@/src/store';
import { GAME_CONFIG } from '@/src/config/gameConfig';
import BlendingPage from '@/src/components/ui/pages/BlendingPage';
import SegmentingPage from '@/src/components/ui/pages/SegmentingPage';
import TutorialBlendingPage from '@/src/components/ui/pages/TutorialBlendingPage';
import { StartScreen } from '@/src/components/ui/pages/start-screen';

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const currentProblem = useSelector((state: RootState) => getCurrentProblem(state));
  const currentProblemType = useSelector((state: RootState) => state.game.config?.[state.game.currentProblemIndex]);
  const score = useSelector((state: RootState) => state.game.score);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const tutorial = searchParams.get('tutorial');
    if (tutorial !== null) {
      startGameHandler(tutorial === 'true');
    }
  }, [searchParams]);

  const startGameHandler = (includeTutorial: boolean) => {
    const gameConfig = includeTutorial ? GAME_CONFIG : GAME_CONFIG.filter(type => type !== Problems.TUTORIAL_BLENDING);

    dispatch(startGame(gameConfig));
    setGameStarted(true);
  };

  const handleSubmit = (answer: string) => {
    dispatch(submitAnswer(answer));
  };

  if (!gameStarted) {
    return <StartScreen onStart={startGameHandler} showHeader={false} />;
  }

  return (
    <div className="min-h-screen">
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
