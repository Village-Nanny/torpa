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
import { ConfirmDialog } from '@/src/components/ui/molecules/confirm-dialogue';
import { AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/src/components/ui/atoms/fade-in';
import { GameOverPage } from '@/src/components/ui/pages/game-over-page';
import TutorialSegmentingPage from '@/src/components/ui/pages/tutorial-segmenting-page';
import TutorialBlendingPage from '@/src/components/ui/pages/tutorial-blending-page';
import { HomeNavButton } from '@/src/components/ui/molecules/home-nav-button';
import { useAudio } from '@/src/hooks/use-audio';
import { GameIntroScreen } from '@/src/components/ui/organisms/onboarding/game-intro-screen';
import { BlendingTutorial } from '@/src/types/blending-tutorial';
import { SegmentingTutorial } from '@/src/types/segmenting-tutorial';

const ErrorScreen = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-rose-600">
    <div className="text-center text-white max-w-md p-6">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-6">{message}</p>
      <p className="mb-6">Share this message with the developer</p>

      <Button onClick={onRetry} className="bg-white text-rose-600 hover:bg-rose-100">
        Try Again
      </Button>
    </div>
  </div>
);

type Problem = BlendingProblem | SegmentingProblem | BlendingTutorial | SegmentingTutorial;

const ProblemRenderer = ({
  problemType,
  problem,
  onSubmit,
  onError,
}: {
  problemType: Problems | null;
  problem: Problem | null;
  onSubmit: (answer: string) => void;
  onError: (error: string) => void;
}) => {
  if (!problem || !problemType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-black">Problem not available</div>
      </div>
    );
  }

  switch (problemType) {
    case Problems.TUTORIAL_SEGMENTING:
      if (problem instanceof SegmentingTutorial) {
        return (
          <TutorialSegmentingPage
            tutorial={problem}
            onTutorialComplete={() => {
              console.log('GamePage - Tutorial segmenting complete, submitting to advance game state');
              onSubmit('tutorial_segmenting_complete');
            }}
            onError={onError}
          />
        );
      } else {
        console.error('Invalid problem type for TUTORIAL_SEGMENTING', problem);
        onError('Invalid tutorial data.');
        return null;
      }
    case Problems.TUTORIAL_BLENDING:
      if (problem instanceof BlendingTutorial) {
        return (
          <TutorialBlendingPage
            tutorial={problem}
            onTutorialComplete={() => {
              console.log('GamePage - Tutorial blending complete, submitting to advance game state');
              onSubmit('tutorial_blending_complete');
            }}
            onError={onError}
          />
        );
      } else {
        console.error('Invalid problem type for TUTORIAL_BLENDING', problem);
        onError('Invalid tutorial data.');
        return null;
      }
    case Problems.INITIAL_BLENDING:
    case Problems.FINAL_BLENDING:
      return <BlendingPage problem={problem as BlendingProblem} onSubmit={onSubmit} onError={onError} />;
    case Problems.INITIAL_SEGMENTING:
    case Problems.FINAL_SEGMENTING:
      return <SegmentingPage problem={problem as SegmentingProblem} onSubmit={onSubmit} onError={onError} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-black">Unknown Problem Type</div>
        </div>
      );
  }
};

export default function GamePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { stopAllAudio } = useAudio();

  // Redux state
  const currentProblem = useSelector((state: RootState) => getCurrentProblem(state));
  const currentProblemType = useSelector((state: RootState) => state.game.config?.[state.game.currentProblemIndex]);
  const currentProblemIndex = useSelector((state: RootState) => state.game.currentProblemIndex);
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);

  // Local state
  const [introShown, setIntroShown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeavingGame, setIsLeavingGame] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      redirect('/login');
    }
  }, [user, authLoading]);

  // Handler to continue from intro screen
  const handleIntroComplete = useCallback(() => {
    setIntroShown(true);
  }, []);

  // Handler to start the game
  const startGameHandler = useCallback(
    async (includeTutorial: boolean) => {
      try {
        setIsLoading(true);
        setError(null);

        const gameConfig = includeTutorial
          ? GAME_CONFIG
          : GAME_CONFIG.filter(type => type !== Problems.TUTORIAL_SEGMENTING && type !== Problems.TUTORIAL_BLENDING);

        await dispatch(startGame(gameConfig));
        setGameStarted(true);
        setIntroShown(false);
      } catch (error) {
        console.error('Failed to start game:', error);
        setError('Unable to start the game. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  // Handler for answer submission
  const handleSubmit = useCallback(
    (answer: string) => {
      try {
        if (!user) {
          setError('You must be logged in to submit answers');
          return;
        }

        dispatch(submitAnswerAndRecord(answer, user.uid));
      } catch (error) {
        console.error('Error submitting answer:', error);
        setError('Failed to submit your answer. Please try again.');
      }
    },
    [dispatch, user]
  );

  // Handler for error retry
  const handleRetry = useCallback(() => {
    setError(null);
    router.refresh();
  }, [router]);

  // Handler to navigate to home
  const handleHomeClick = useCallback(() => {
    setShowConfirmDialog(true);
  }, []);

  // Update the handler for confirm leaving
  const handleConfirmLeave = useCallback(async () => {
    try {
      setIsLeavingGame(true);

      // Stop all audio playback before leaving
      stopAllAudio();

      // Simulate a slight delay for the loading state to be visible
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error leaving game:', error);
      setError('Failed to leave game. Please try again.');
    } finally {
      setIsLeavingGame(false);
    }
  }, [router, stopAllAudio]);

  // Get the appropriate background color based on problem type
  const getBackgroundColor = useCallback(() => {
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
  }, [currentProblemType]);

  // Show error screen if there's an error
  if (error) {
    return <ErrorScreen message={error} onRetry={handleRetry} />;
  }

  // Ensure user is authenticated
  if (!user) {
    return null; // This will trigger the redirect in the useEffect
  }

  return (
    <div className="relative min-h-screen">
      {/* Loading overlay */}
      {(authLoading || isLoading) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 rounded-lg p-6 text-center text-white">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-xl font-medium">Loading...</p>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmLeave}
        title="Leave Game?"
        description="Are you sure you want to leave? Your current progress will be lost."
        isConfirmLoading={isLeavingGame}
      />

      <HomeNavButton onClick={handleHomeClick} />

      <DotPattern
        className={`absolute inset-0 transition-colors duration-700 ease-in-out ${!gameStarted ? 'bg-blue-600' : getBackgroundColor()} text-gray-200`}
      />

      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <FadeIn key="start-screen" className="relative z-10">
            <StartScreen onStart={startGameHandler} showHeader={false} />
          </FadeIn>
        ) : !introShown ? (
          <FadeIn key="intro-screen" className="relative z-10">
            <GameIntroScreen onContinue={handleIntroComplete} />
          </FadeIn>
        ) : (
          <FadeIn key={`problem-${currentProblemIndex}`} className="relative z-10">
            {currentProblem ? (
              <ProblemRenderer
                problemType={currentProblemType || null}
                problem={currentProblem}
                onSubmit={handleSubmit}
                onError={setError}
              />
            ) : (
              <GameOverPage />
            )}
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
