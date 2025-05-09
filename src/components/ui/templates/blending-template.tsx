'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import { ReplayButton } from '@/src/components/ui/atoms/replay-button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlendingProblem, TutorialBlendingProblem } from '@/src/types/blending';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useAudioSequence, AudioSequenceItem } from '@/src/hooks/useAudioSequence';

interface BlendingGameTemplateProps {
  problem: BlendingProblem | TutorialBlendingProblem;
  onSubmit: (answer: string) => void;
  onInternalTutorialComplete?: () => void;
  onError?: (error: string) => void;
  isTutorial?: boolean;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export function BlendingGameTemplate({
  problem,
  onSubmit,
  onInternalTutorialComplete,
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
  const [nonTutorialStep, setNonTutorialStep] = useState<'intro' | 'character' | 'choice'>('intro');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [animatedImage, setAnimatedImage] = useState<'correct' | 'wrong' | null>(null);
  const [isPlayingReplay, setIsPlayingReplay] = useState(false);

  const currentCharacter = problem.visibleCharacter;

  const isTutorialProblem = useMemo(() => {
    return isTutorial && problem instanceof TutorialBlendingProblem;
  }, [problem, isTutorial]);

  useEffect(() => {
    if (isTutorialProblem) {
      console.log('BlendingGameTemplate - New tutorial problem, resetting internal state');
      setTutorialStep('intro');
      setActiveCharacter(null);
      setCanSelect(false);
      setFeedback(null);
      setWrongAttempts(0);
      setAnimatedImage(null);
    } else {
      setNonTutorialStep('intro');
      setActiveCharacter(null);
      setCanSelect(false);
    }
  }, [problem, isTutorialProblem]);

  useEffect(() => {
    if (isTutorialProblem && tutorialStep === 'complete') {
      console.log('BlendingGameTemplate - Tutorial step complete, calling onInternalTutorialComplete');
      onInternalTutorialComplete?.();
    }
  }, [isTutorialProblem, tutorialStep, onInternalTutorialComplete]);

  const regularAudioSequence = useMemo(() => {
    if (isTutorialProblem) return [];

    const sequence: AudioSequenceItem[] = [];

    switch (nonTutorialStep) {
      case 'intro':
        const tapInstruction =
          currentCharacter === Character.LULU
            ? '/assets/audio/blending_training/TORPA Blending Training/TORPA  Blending TrainingTap Lulu to Listen to Her.m4a'
            : '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingTap Francine to listen to her.m4a';
        sequence.push({ path: tapInstruction });
        break;
      case 'character':
        if (problem.audioPath) {
          sequence.push({ path: problem.audioPath });
        }
        break;
      case 'choice':
        sequence.push({
          path: '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - Which one did she sayTap the right picture.m4a',
        });
        break;
    }

    return sequence;
  }, [isTutorialProblem, nonTutorialStep, problem.audioPath, currentCharacter]);

  const tutorialAudioSequence = useMemo(() => {
    if (!isTutorialProblem) {
      return [];
    }

    const tutorialProblem = problem as TutorialBlendingProblem;
    const sequence: AudioSequenceItem[] = [];

    switch (tutorialStep) {
      case 'intro':
        const order =
          Array.isArray(tutorialProblem.narrationOrder) && tutorialProblem.narrationOrder.length > 0
            ? tutorialProblem.narrationOrder
            : ['wrong', 'correct'];

        order.forEach(type => {
          if (type === 'correct' && tutorialProblem.correctImageAudio) {
            sequence.push({ path: tutorialProblem.correctImageAudio });
          } else if (type === 'wrong' && tutorialProblem.wrongImageAudio) {
            sequence.push({ path: tutorialProblem.wrongImageAudio });
          }
        });

        if (tutorialProblem.tapCharacterNarration) {
          sequence.push({ path: tutorialProblem.tapCharacterNarration });
        }
        return sequence;

      case 'character':
        if (problem.audioPath) {
          sequence.push({ path: problem.audioPath });
        }
        return sequence;

      case 'choice':
        if (tutorialProblem.instructUserNarration) {
          sequence.push({ path: tutorialProblem.instructUserNarration });
        }
        return sequence;

      case 'feedback':
        if (feedback === 'success') {
          if (tutorialProblem.correctImageNarration) {
            sequence.push({ path: tutorialProblem.correctImageNarration });
          }
          if (tutorialProblem.correctNextNarration) {
            sequence.push({ path: tutorialProblem.correctNextNarration });
          }
        } else {
          console.log('wrongAttempts', wrongAttempts);
          if (wrongAttempts > 1) {
            if (tutorialProblem.wrongNextNarration) {
              sequence.push({ path: tutorialProblem.wrongNextNarration });
            }
          } else {
            if (tutorialProblem.retryAudioPath) {
              sequence.push({ path: tutorialProblem.retryAudioPath });
            }
          }
        }
        return sequence;

      default:
        return sequence;
    }
  }, [isTutorialProblem, problem, tutorialStep, feedback, wrongAttempts]);

  const audioSequence = useMemo(() => {
    return isTutorialProblem ? tutorialAudioSequence : regularAudioSequence;
  }, [isTutorialProblem, tutorialAudioSequence, regularAudioSequence]);

  const handleSequenceComplete = useCallback(() => {
    if (isTutorialProblem) {
      switch (tutorialStep) {
        case 'intro':
          setTutorialStep('character');
          setAnimatedImage(null);
          break;
        case 'character':
          setTutorialStep('choice');
          setActiveCharacter(null);
          setCanSelect(true);
          break;
        case 'choice':
          break;
        case 'feedback':
          if (feedback === 'success') {
            setTutorialStep('complete');
          } else if (wrongAttempts > 1) {
            console.log('BlendingGameTemplate - Auto-submitting after too many wrong attempts');
            setTutorialStep('complete');
          } else {
            setFeedback(null);
            setTutorialStep('intro');
            setCanSelect(false);
          }
          break;
        default:
          break;
      }
    } else {
      switch (nonTutorialStep) {
        case 'intro':
          setNonTutorialStep('character');
          break;
        case 'character':
          setNonTutorialStep('choice');
          setActiveCharacter(null);
          break;
        case 'choice':
          setCanSelect(true);
          break;
      }
    }
  }, [isTutorialProblem, tutorialStep, feedback, wrongAttempts, nonTutorialStep]);

  const handleAudioError = useCallback(
    (error: string) => {
      onError?.(error);
    },
    [onError]
  );

  const handleAudioStart = useCallback(
    (item: AudioSequenceItem) => {
      if (isTutorialProblem) {
        const tutorialProblem = problem as TutorialBlendingProblem;
        if (item.path === tutorialProblem.wrongImageAudio) {
          setAnimatedImage('wrong');
        } else if (item.path === tutorialProblem.correctImageAudio) {
          setAnimatedImage('correct');
        } else {
          setAnimatedImage(null);
        }
      }
    },
    [isTutorialProblem, problem]
  );

  const { play, stop, status } = useAudioSequence({
    sequence: audioSequence,
    initialDelay: 1500,
    onSequenceComplete: handleSequenceComplete,
    onAudioStart: handleAudioStart,
    onError: handleAudioError,
    loop: false,
    autoPlay: isTutorialProblem ? tutorialStep !== 'character' : nonTutorialStep !== 'character',
  });

  const playBlendingAudio = useCallback(() => {
    if (isTutorialProblem) {
      if (tutorialStep === 'character') {
        setActiveCharacter(currentCharacter);
        play();
      }
    } else {
      if (nonTutorialStep === 'character') {
        setActiveCharacter(currentCharacter);
        play();
      }
    }
  }, [play, currentCharacter, isTutorialProblem, tutorialStep, nonTutorialStep]);

  const handleReplayAudio = useCallback(() => {
    if (problem.audioPath) {
      setIsPlayingReplay(true);
      const audio = new Audio(problem.audioPath);
      audio.onended = () => setIsPlayingReplay(false);
      audio.play().catch(err => {
        console.error('Error playing audio:', err);
        setIsPlayingReplay(false);
        onError?.('Failed to play audio');
      });
    }
  }, [problem.audioPath, onError]);

  const handleCharacterClick = useCallback(() => {
    if (
      (isTutorialProblem && tutorialStep === 'character') ||
      (!isTutorialProblem && nonTutorialStep === 'character')
    ) {
      playBlendingAudio();
    }
  }, [isTutorialProblem, tutorialStep, nonTutorialStep, playBlendingAudio]);

  useEffect(() => {
    if (isTutorialProblem) {
      if (tutorialStep === 'intro' || tutorialStep === 'choice' || tutorialStep === 'feedback') {
        play();
      }
    } else {
      if (nonTutorialStep === 'intro' || nonTutorialStep === 'choice') {
        play();
      }
    }

    return () => {
      stop();
    };
  }, [play, stop, isTutorialProblem, tutorialStep, nonTutorialStep]);

  useEffect(() => {
    if (isTutorialProblem) {
      setActiveCharacter(
        status === 'playing' && tutorialStep !== 'intro' && tutorialStep !== 'choice' && tutorialStep !== 'feedback'
          ? currentCharacter
          : null
      );
    } else {
      setActiveCharacter(status === 'playing' && nonTutorialStep === 'character' ? currentCharacter : null);
    }
  }, [status, currentCharacter, tutorialStep, nonTutorialStep, isTutorialProblem]);

  const choices = React.useMemo(() => {
    const options = [
      { type: 'correct', image: problem.correctImagePath },
      { type: 'wrong', image: problem.wrongImagePath },
    ];
    if (!problem.correctImagePath || !problem.wrongImagePath) return [];
    return Math.random() < 0.5 ? options : options.reverse();
  }, [problem.correctImagePath, problem.wrongImagePath]);

  const characterProps = useMemo(() => {
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
  }, [currentCharacter]);

  function handleChoice(imagePath: string) {
    if (!canSelect) return;

    if (isTutorialProblem) {
      const tutorialProblem = problem as TutorialBlendingProblem;
      if (tutorialProblem.isCorrect(imagePath)) {
        setFeedback('success');
        setWrongAttempts(0);
      } else {
        setFeedback('retry');
        setWrongAttempts(prev => prev + 1);
      }
      setTutorialStep('feedback');
      setCanSelect(false);
    } else {
      onSubmit(imagePath);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <div className="z-10 max-w-3xl px-4 mx-auto">
        <div className="space-y-8 text-center">
          <div className="flex justify-center gap-20 md:gap-32 mt-8">
            {choices.map(option => (
              <motion.div
                key={option.type}
                animate={{
                  scale: animatedImage === option.type ? 1.15 : 1.0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onClick={() => canSelect && !feedback && handleChoice(option.image)}
                className={!canSelect || feedback ? 'cursor-default' : 'cursor-pointer'}>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden hover:scale-110 transition-transform">
                  <Image src={option.image} alt={`image`} fill className="object-contain" priority />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <div
              onClick={handleCharacterClick}
              className={`cursor-pointer ${
                (isTutorialProblem && tutorialStep === 'character') ||
                (!isTutorialProblem && nonTutorialStep === 'character')
                  ? 'animate-pulse'
                  : ''
              }`}>
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
            transition={{ duration: 0.3 }}></motion.div>

          {/* Replay button */}
          {((!isTutorialProblem && nonTutorialStep === 'choice') ||
            (isTutorialProblem && (tutorialStep === 'choice' || tutorialStep === 'feedback'))) && (
            <div className="mt-4">
              <ReplayButton isPlaying={isPlayingReplay} onClick={handleReplayAudio} />
            </div>
          )}
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
