'use client';
export const dynamic = 'force-dynamic';

import React, { useCallback, useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, submitAnswerAndRecord, getCurrentProblem } from '@/src/store/slices/gameSlice';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { Problems } from '@/src/types/enums/problems.enum';
import { RootState, AppDispatch } from '@/src/store';
import { GAME_CONFIG } from '@/src/config/gameConfig';
import BlendingPage from '@/src/components/ui/pages/blending-page';
import SegmentingPage from '@/src/components/ui/pages/segmenting-page';
import { StartScreen } from '@/src/components/ui/pages/start-screen';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import { Button } from '@/src/components/ui/atoms/button';
import { Home } from 'lucide-react';
import { ConfirmDialog } from '@/src/components/ui/molecules/confirm-dialogue';
import { AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/src/components/ui/atoms/fade-in';
import { GameOverPage } from '@/src/components/ui/pages/game-over-page';
import TutorialSegmentingPage from '@/src/components/ui/pages/tutorial-segmenting-page';
import TutorialBlendingPage from '@/src/components/ui/pages/tutorial-blending-page';

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
  const currentProblem = useSelector((state: RootState) => getCurrentProblem(state));
  const currentProblemType = useSelector((state: RootState) => state.game.config?.[state.game.currentProblemIndex]);

  const [gameStarted, setGameStarted] = useState(false);
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const currentProblemIndex = useSelector((state: RootState) => state.game.currentProblemIndex);

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  const startGameHandler = useCallback(
    async (includeTutorial: boolean) => {
      const gameConfig = includeTutorial
        ? GAME_CONFIG
        : GAME_CONFIG.filter(type => type !== Problems.TUTORIAL_SEGMENTING);
      await dispatch(startGame(gameConfig));
      setGameStarted(true);
    },
    [dispatch]
  );

  if (loading || !user) {
    return null;
  }

  const handleSubmit = (answer: string) => {
    dispatch(submitAnswerAndRecord(answer, user.uid));
  };

  const getBackgroundColor = () => {
    switch (currentProblemType) {
      case Problems.TUTORIAL_BLENDING:
      case Problems.FINAL_BLENDING:
      case Problems.INITIAL_BLENDING:
        return 'bg-green-600';
      case Problems.TUTORIAL_SEGMENTING:
      case Problems.FINAL_SEGMENTING:
      case Problems.INITIAL_SEGMENTING:
        return 'bg-rose-700';
      default:
        return 'bg-gray-600';
    }
  };

  const handleHomeClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmLeave = () => {
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen">
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmLeave}
        title="Leave Game?"
        description="Are you sure you want to leave? Your current progress will be lost."
      />

      <Button
        onClick={handleHomeClick}
        variant="outline"
        className="absolute top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white inline-flex items-center gap-2 transition-all duration-200">
        <Home className="w-4 h-4" />
        Home
      </Button>

      <DotPattern
        className={`absolute inset-0 transition-colors duration-700 ease-in-out ${!gameStarted ? 'bg-blue-600' : getBackgroundColor()} text-gray-200`}
      />

      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <FadeIn key="start-screen" className="relative z-10">
            <StartScreen onStart={startGameHandler} showHeader={false} />
          </FadeIn>
        ) : (
          <FadeIn key={`problem-${currentProblemIndex}`} className="relative z-10">
            {currentProblem ? (
              currentProblemType === Problems.TUTORIAL_SEGMENTING ? (
                <TutorialSegmentingPage problem={currentProblem as SegmentingProblem} onSubmit={handleSubmit} />
              ) : currentProblemType === Problems.TUTORIAL_BLENDING ? (
                <TutorialBlendingPage problem={currentProblem as BlendingProblem} onSubmit={handleSubmit} />
              ) : currentProblemType === Problems.INITIAL_BLENDING || currentProblemType === Problems.FINAL_BLENDING ? (
                <BlendingPage problem={currentProblem as BlendingProblem} onSubmit={handleSubmit} />
              ) : currentProblemType === Problems.INITIAL_SEGMENTING ||
                currentProblemType === Problems.FINAL_SEGMENTING ? (
                <SegmentingPage problem={currentProblem as SegmentingProblem} onSubmit={handleSubmit} />
              ) : (
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center text-black">Unknown Problem</div>
                </div>
              )
            ) : (
              <GameOverPage />
            )}
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
