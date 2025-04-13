'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlendingProblem, TutorialBlendingProblem } from '@/src/types/blending';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAudioSequence } from '@/src/hooks/useAudioSequence';

interface BlendingGameTemplateProps {
  problem: BlendingProblem;
  onSubmit: (answer: string) => void;
  onError?: (error: string) => void;
  isTutorial?: boolean;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export function BlendingGameTemplate({
  problem,
  onSubmit,
  onError,
  isTutorial,
  showNavigation,
  onNext,
  onPrev,
}: BlendingGameTemplateProps) {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [canSelect, setCanSelect] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const [tutorialStep, setTutorialStep] = useState<'intro' | 'character' | 'choice' | 'feedback' | 'complete'>('intro');

  const [currentCharacter] = useState<Character>(Math.random() < 0.5 ? Character.LULU : Character.FRANCINE);

  // Check if the problem is a TutorialBlendingProblem
  const isTutorialProblem = useMemo(() => {
    return problem instanceof TutorialBlendingProblem;
  }, [problem]);

  // For pure tutorial problems (auto-advance), automatically submit after 1 second
  useEffect(() => {
    if (isTutorial && isTutorialProblem && tutorialStep === 'complete') {
      const timer = setTimeout(() => {
        // Use the correct image path for automatic submission
        onSubmit(problem.correctImagePath);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTutorial, isTutorialProblem, problem, onSubmit, tutorialStep]);

  // Audio sequence for regular problems
  const regularAudioSequence = useMemo(() => [{ path: problem.audioPath }], [problem.audioPath]);

  // Audio sequence for tutorial problems
  const tutorialAudioSequence = useMemo(() => {
    if (!isTutorial || !isTutorialProblem) {
      return [];
    }

    const tutorialProblem = problem as TutorialBlendingProblem;

    switch (tutorialStep) {
      case 'intro':
        // Start with introduction narration
        return [
          // Introduction audio - "Let's play a game!"
          // "This is a pot and this is a door"
          ...(tutorialProblem.correctImageAudio ? [{ path: tutorialProblem.correctImageAudio }] : []),
          ...(tutorialProblem.wrongImageAudio ? [{ path: tutorialProblem.wrongImageAudio }] : []),
          // "Tap Lulu/Francine to listen to her"
          ...(tutorialProblem.tapCharacterNarration ? [{ path: tutorialProblem.tapCharacterNarration }] : []),
        ];
      case 'character':
        // When character is tapped, play the word
        return [...(problem.audioPath ? [{ path: problem.audioPath }] : [])];
      case 'choice':
        // After word is played, instruct to choose
        return [
          // "Which one did she say? Tap the right picture"
          ...(tutorialProblem.instructUserNarration ? [{ path: tutorialProblem.instructUserNarration }] : []),
        ];
      case 'feedback':
        if (feedback === 'success') {
          // Correct feedback
          return [
            ...(tutorialProblem.correctImageNarration ? [{ path: tutorialProblem.correctImageNarration }] : []),
            ...(tutorialProblem.correctNextNarration ? [{ path: tutorialProblem.correctNextNarration }] : []),
          ];
        } else {
          // Incorrect feedback
          return [
            ...(tutorialProblem.wrongImageNarration ? [{ path: tutorialProblem.wrongImageNarration }] : []),
            ...(tutorialProblem.retryAudioPath ? [{ path: tutorialProblem.retryAudioPath }] : []),
          ];
        }
      default:
        return [];
    }
  }, [isTutorial, isTutorialProblem, problem, tutorialStep, feedback]);

  const handleSequenceComplete = useCallback(() => {
    if (isTutorial && isTutorialProblem) {
      // Handle tutorial flow transitions
      switch (tutorialStep) {
        case 'intro':
          setTutorialStep('character');
          break;
        case 'character':
          setTutorialStep('choice');
          setActiveCharacter(null);
          setCanSelect(true);
          break;
        case 'choice':
          // Wait for user selection
          break;
        case 'feedback':
          if (feedback === 'success') {
            setTutorialStep('complete');
          } else {
            // Reset to try again
            setFeedback(null);
            setTutorialStep('intro');
            setCanSelect(false);
          }
          break;
        default:
          break;
      }
    } else {
      // Regular problem flow
      setActiveCharacter(null);
      setCanSelect(true);
    }
  }, [isTutorial, isTutorialProblem, tutorialStep, feedback]);

  const handleAudioError = useCallback(
    (error: string) => {
      onError?.(error);
    },
    [onError]
  );

  // Use appropriate audio sequence based on mode
  const audioSequence = useMemo(() => {
    return isTutorial && isTutorialProblem ? tutorialAudioSequence : regularAudioSequence;
  }, [isTutorial, isTutorialProblem, tutorialAudioSequence, regularAudioSequence]);

  const { play, stop, status } = useAudioSequence({
    sequence: audioSequence,
    initialDelay: 1500,
    onSequenceComplete: handleSequenceComplete,
    onError: handleAudioError,
    loop: false,
    autoPlay: isTutorial && isTutorialProblem && tutorialStep !== 'character',
  });

  const playBlendingAudio = useCallback(() => {
    if (isTutorial && isTutorialProblem) {
      if (tutorialStep === 'character') {
        setActiveCharacter(currentCharacter);
        play();
      }
    } else {
      setCanSelect(false);
      setActiveCharacter(currentCharacter);
      play();
    }
  }, [play, currentCharacter, isTutorial, isTutorialProblem, tutorialStep]);

  // Handle character click for tutorial
  const handleCharacterClick = useCallback(() => {
    if (isTutorial && isTutorialProblem && tutorialStep === 'character') {
      playBlendingAudio();
    }
  }, [isTutorial, isTutorialProblem, tutorialStep, playBlendingAudio]);

  // Only play audio for non-tutorial problems or at specific tutorial steps
  useEffect(() => {
    if (!isTutorial || !isTutorialProblem) {
      playBlendingAudio();
    } else if (tutorialStep === 'intro' || tutorialStep === 'choice' || tutorialStep === 'feedback') {
      play();
    }

    return () => {
      stop();
    };
  }, [playBlendingAudio, play, stop, isTutorial, isTutorialProblem, tutorialStep]);

  useEffect(() => {
    setActiveCharacter(
      status === 'playing' && tutorialStep !== 'intro' && tutorialStep !== 'choice' && tutorialStep !== 'feedback'
        ? currentCharacter
        : null
    );
  }, [status, currentCharacter, tutorialStep]);

  function handleChoice(imagePath: string) {
    if (!canSelect) return;

    if (isTutorial && isTutorialProblem) {
      if (problem.isCorrect(imagePath)) {
        setFeedback('success');
      } else {
        setFeedback('retry');
      }
      setTutorialStep('feedback');
      setCanSelect(false);
    } else {
      onSubmit(imagePath);
    }
  }

  // For tutorial problems in auto-advance mode, just return a minimal div
  if (isTutorial && isTutorialProblem && tutorialStep === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-blue-500/20 rounded-xl text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Tutorial Mode</h2>
          <p>Loading next step...</p>
        </div>
      </div>
    );
  }

  // Regular problem rendering
  const choices = React.useMemo(() => {
    const options = [
      { type: 'correct', image: problem.correctImagePath },
      { type: 'wrong', image: problem.wrongImagePath },
    ];
    return Math.random() < 0.5 ? options : options.reverse();
  }, [problem]);

  // Get character display properties
  const getCharacterProps = () => {
    if (currentCharacter === Character.LULU) {
      return {
        emoji: '🐞',
        name: 'Lulu',
        backgroundColor: 'bg-red-400',
      };
    } else {
      return {
        emoji: '🐸',
        name: 'Francine',
        backgroundColor: 'bg-green-400',
      };
    }
  };

  const characterProps = getCharacterProps();

  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <div className="z-10 max-w-3xl px-4 mx-auto">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">Choose the Right Picture! 🎯</h1>

          {feedback && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-center p-6 rounded-xl ${
                feedback === 'success' ? 'bg-green-500/30' : 'bg-yellow-500/30'
              }`}>
              {feedback === 'success' ? (
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl text-white font-bold">Perfect! 🌟</p>
                  <p className="text-2xl md:text-3xl text-white">You found the right picture! ⭐️</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl text-white font-bold">Try Again! 🎯</p>
                  <p className="text-2xl md:text-3xl text-white">Listen carefully and look at the pictures! 👀</p>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex justify-center gap-20 md:gap-32 mt-8">
            {choices.map(option => (
              <div
                key={option.type}
                onClick={() => canSelect && !feedback && handleChoice(option.image)}
                className={!canSelect || feedback ? 'cursor-default' : 'cursor-pointer'}>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden hover:scale-110 transition-transform">
                  <Image src={option.image} alt={`${option.type} image`} fill className="object-contain" priority />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div
              onClick={handleCharacterClick}
              className={`cursor-pointer ${tutorialStep === 'character' ? 'animate-pulse' : ''}`}>
              <CharacterAvatar
                emoji={characterProps.emoji}
                name={characterProps.name}
                backgroundColor={characterProps.backgroundColor}
                isAnimated={activeCharacter === currentCharacter}
                className={`transition-transform duration-200 ${
                  activeCharacter === currentCharacter ? 'scale-125 shadow-xl' : 'hover:scale-110'
                }`}
              />
            </div>
          </div>

          <motion.div
            className="h-[80px] mt-8"
            animate={{ height: canSelect && !feedback ? 'auto' : '0px' }}
            transition={{ duration: 0.3 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: canSelect && !feedback ? 1 : 0,
                y: canSelect && !feedback ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}>
              <Button
                variant="ghost"
                size="lg"
                onClick={playBlendingAudio}
                className="bg-white/20 px-6 py-3 text-white font-bold text-xl hover:bg-white/30">
                Listen Again! 🔄
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {showNavigation && (
          <div className="mt-12 flex justify-center gap-8">
            {onPrev && (
              <Button
                variant="ghost"
                size="lg"
                onClick={onPrev}
                className="w-20 h-20 md:w-24 md:h-24 p-0 text-white bg-green-500 hover:bg-green-400 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
                <ChevronLeft className="w-12 h-12" />
              </Button>
            )}
            {onNext && (
              <Button
                variant="ghost"
                size="lg"
                onClick={onNext}
                className="w-20 h-20 md:w-24 md:h-24 p-0 text-white bg-green-500 hover:bg-green-400 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
                <ChevronRight className="w-12 h-12" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
