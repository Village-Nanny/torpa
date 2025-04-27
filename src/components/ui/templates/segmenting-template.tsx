'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SegmentingProblem, TutorialSegmentingProblem } from '@/src/types/segmenting';
import { useAudioSequence, AudioSequenceItem } from '@/src/hooks/useAudioSequence';

interface SegmentingGameTemplateProps {
  problem: SegmentingProblem;
  onSubmit: (answer: string) => void;
  onError?: (error: string) => void;
  tutorialContent?: React.ReactNode;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  isTutorial?: boolean;
  onInternalTutorialComplete?: () => void;
}

export function SegmentingGameTemplate({
  problem,
  onSubmit,
  onError,
  tutorialContent,
  showNavigation,
  onNext,
  onPrev,
  isTutorial,
  onInternalTutorialComplete,
}: SegmentingGameTemplateProps) {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [canSelect, setCanSelect] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const [tutorialStep, setTutorialStep] = useState<'intro' | 'character' | 'choice' | 'feedback' | 'complete'>('intro');
  const [nonTutorialStep, setNonTutorialStep] = useState<'intro' | 'character' | 'choice'>('intro');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [animatedImage, setAnimatedImage] = useState<'correct' | 'wrong' | null>(null);
  const [charactersClicked, setCharactersClicked] = useState<Character[]>([]);
  const [nonTutorialActiveCharacter, setNonTutorialActiveCharacter] = useState<Character | null>(null);
  const [nonTutorialCanSelect, setNonTutorialCanSelect] = useState(false);

  const isTutorialProblem = isTutorial && problem instanceof TutorialSegmentingProblem;

  useEffect(() => {
    if (isTutorialProblem) {
      setTutorialStep('intro');
      setActiveCharacter(null);
      setCanSelect(false);
      setFeedback(null);
      setWrongAttempts(0);
      setAnimatedImage(null);
      setCharactersClicked([]);
    } else {
      setNonTutorialStep('intro');
      setNonTutorialActiveCharacter(null);
      setNonTutorialCanSelect(false);
      setCharactersClicked([]);
    }
  }, [problem, isTutorialProblem]);

  useEffect(() => {
    if (isTutorialProblem && tutorialStep === 'complete') {
      onInternalTutorialComplete?.();
    }
  }, [isTutorialProblem, tutorialStep, onInternalTutorialComplete]);

  const regularAudioSequence = useMemo(() => {
    if (isTutorialProblem) return [];
    const sequence: AudioSequenceItem[] = [];
    switch (nonTutorialStep) {
      case 'intro': {
        const tapInstruction =
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingTap Luluthen tap Francine.m4a';
        sequence.push({ path: tapInstruction });
        break;
      }
      case 'character': {
        break;
      }
      case 'choice': {
        const instructAudio =
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingWho said it the right way.m4a';
        sequence.push({ path: instructAudio });
        break;
      }
    }
    return sequence;
  }, [isTutorialProblem, nonTutorialStep]);

  const tutorialAudioSequence = useMemo(() => {
    if (!isTutorialProblem) return [];
    const tutorialProblem = problem as TutorialSegmentingProblem;
    const sequence: AudioSequenceItem[] = [];
    switch (tutorialStep) {
      case 'intro':
        if (tutorialProblem.imageNarration) sequence.push({ path: tutorialProblem.imageNarration });
        if (tutorialProblem.tapCharacterNarration) sequence.push({ path: tutorialProblem.tapCharacterNarration });
        break;
      case 'character':
        if (charactersClicked.length > 0) {
          const last = charactersClicked[charactersClicked.length - 1];
          const audioPath = last === Character.LULU ? tutorialProblem.correctAudioPath : tutorialProblem.wrongAudioPath;
          sequence.push({ path: audioPath });
        }
        break;
      case 'choice':
        if (tutorialProblem.instructUserNarration) sequence.push({ path: tutorialProblem.instructUserNarration });
        break;
      case 'feedback':
        if (feedback === 'success') {
          if (tutorialProblem.correctChoiceNarration) sequence.push({ path: tutorialProblem.correctChoiceNarration });
          if (tutorialProblem.correctChoiceNextNarration)
            sequence.push({ path: tutorialProblem.correctChoiceNextNarration });
        } else {
          if (tutorialProblem.retryNarration) sequence.push({ path: tutorialProblem.retryNarration });
        }
        break;
    }
    return sequence;
  }, [isTutorialProblem, problem, tutorialStep, feedback, charactersClicked]);

  const audioSequence = useMemo(() => {
    return isTutorialProblem ? tutorialAudioSequence : regularAudioSequence;
  }, [isTutorialProblem, tutorialAudioSequence, regularAudioSequence]);

  const { play, stop, status } = useAudioSequence({
    sequence: audioSequence,
    initialDelay: 1000,
    onSequenceComplete: () => {
      if (isTutorialProblem) {
        switch (tutorialStep) {
          case 'intro':
            setTutorialStep('character');
            setAnimatedImage(null);
            break;
          case 'character':
            if (charactersClicked.length === 2) {
              setTutorialStep('choice');
            }
            setActiveCharacter(null);
            break;
          case 'choice':
            setCanSelect(true);
            setCharactersClicked([]);
            break;
          case 'feedback':
            if (feedback === 'success') {
              setTutorialStep('complete');
            } else {
              setFeedback(null);
              setTutorialStep('intro');
              setCanSelect(false);
              setCharactersClicked([]);
            }
            break;
        }
      } else {
        switch (nonTutorialStep) {
          case 'intro':
            setNonTutorialStep('character');
            break;
          case 'character':
            break;
          case 'choice':
            setNonTutorialCanSelect(true);
            break;
        }
      }
    },
    onAudioStart: () => {},
    onError: onError,
    loop: false,
    autoPlay: isTutorialProblem ? tutorialStep !== 'character' : nonTutorialStep !== 'character',
  });

  const handleAudioError = useCallback(
    (error: string) => {
      onError?.(error);
    },
    [onError]
  );

  const shouldAnimateLulu = useMemo(() => {
    if (isTutorialProblem) {
      return tutorialStep === 'character' && !charactersClicked.includes(Character.LULU);
    } else {
      return nonTutorialStep === 'character' && !charactersClicked.includes(Character.LULU);
    }
  }, [isTutorialProblem, tutorialStep, nonTutorialStep, charactersClicked]);

  const shouldAnimateFrancine = useMemo(() => {
    if (isTutorialProblem) {
      return tutorialStep === 'character' && !charactersClicked.includes(Character.FRANCINE);
    } else {
      return nonTutorialStep === 'character' && !charactersClicked.includes(Character.FRANCINE);
    }
  }, [isTutorialProblem, tutorialStep, nonTutorialStep, charactersClicked]);

  const handleCharacterTap = useCallback(
    (character: Character) => {
      if (isTutorialProblem) {
        if (tutorialStep !== 'character') return;
        if (charactersClicked.includes(character)) return;
        setActiveCharacter(character);
        setCharactersClicked(prev => [...prev, character]);
      } else {
        if (nonTutorialStep !== 'character') return;
        if (charactersClicked.includes(character)) return;
        setNonTutorialActiveCharacter(character);
        setCharactersClicked(prev => [...prev, character]);
        const audioPath = character === Character.LULU ? problem.correctAudioPath : problem.wrongAudioPath;
        const audio = new Audio(audioPath);
        audio.play();
        audio.onended = () => {
          setCharactersClicked(prev => {
            const updated = prev;
            if (updated.length === 2) {
              setNonTutorialStep('choice');
            }
            setNonTutorialActiveCharacter(null);
            return updated;
          });
        };
      }
    },
    [isTutorialProblem, tutorialStep, nonTutorialStep, charactersClicked, problem]
  );

  const handleChoice = useCallback(
    (character: Character) => {
      if (!canSelect) return;
      if (isTutorialProblem) {
        stop();
        const tutorialProblem = problem as TutorialSegmentingProblem;
        const isCorrect = tutorialProblem.isCorrect(
          character === Character.LULU ? tutorialProblem.correctAudioPath : tutorialProblem.wrongAudioPath
        );
        if (isCorrect) {
          setFeedback('success');
          setWrongAttempts(0);
        } else {
          setFeedback('retry');
          setWrongAttempts(prev => prev + 1);
        }
        setTutorialStep('feedback');
        setCanSelect(false);
      } else {
        onSubmit(character === Character.LULU ? problem.correctAudioPath : problem.wrongAudioPath);
      }
    },
    [canSelect, isTutorialProblem, problem, stop, onSubmit]
  );

  const handleNonTutorialChoice = useCallback(
    (character: Character) => {
      if (!nonTutorialCanSelect) return;
      onSubmit(character === Character.LULU ? problem.correctAudioPath : problem.wrongAudioPath);
    },
    [nonTutorialCanSelect, onSubmit, problem]
  );

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
  }, [stop, isTutorialProblem, tutorialStep, nonTutorialStep]);

  useEffect(() => {
    if (isTutorialProblem) {
      setActiveCharacter(
        status === 'playing' && tutorialStep !== 'intro' && tutorialStep !== 'choice' && tutorialStep !== 'feedback'
          ? activeCharacter
          : null
      );
    } else {
      setActiveCharacter(status === 'playing' && nonTutorialStep === 'character' ? activeCharacter : null);
    }
  }, [status, activeCharacter, tutorialStep, nonTutorialStep, isTutorialProblem]);

  useEffect(() => {
    if (isTutorialProblem && tutorialStep === 'character' && charactersClicked.length > 0) {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersClicked, isTutorialProblem, tutorialStep]);

  useEffect(() => {
    if ((isTutorialProblem && tutorialStep === 'choice') || (!isTutorialProblem && nonTutorialStep === 'choice')) {
      setCharactersClicked([]);
    }
  }, [isTutorialProblem, tutorialStep, nonTutorialStep]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <div className="z-10 max-w-3xl px-4 mx-auto">
        {tutorialContent || (
          <div className="space-y-8 text-center">
            <motion.div
              animate={{ scale: animatedImage === 'correct' ? 1.1 : animatedImage === 'wrong' ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
              <Image src={problem.imagePath} alt="Problem Image" fill className="object-contain" priority />
            </motion.div>

            <div className="flex justify-center gap-20 md:gap-32 mt-8">
              <CharacterChoice
                character={Character.LULU}
                isActive={
                  isTutorialProblem ? activeCharacter === Character.LULU : nonTutorialActiveCharacter === Character.LULU
                }
                canReplay={isTutorialProblem ? canSelect : nonTutorialCanSelect}
                feedback={feedback}
                onClick={() => {
                  handleCharacterTap(Character.LULU);
                  if (!isTutorialProblem && nonTutorialStep === 'choice') handleNonTutorialChoice(Character.LULU);
                  if (isTutorialProblem && canSelect) handleChoice(Character.LULU);
                }}
                isClicked={charactersClicked.includes(Character.LULU)}
                shouldAnimate={shouldAnimateLulu}
              />
              <CharacterChoice
                character={Character.FRANCINE}
                isActive={
                  isTutorialProblem
                    ? activeCharacter === Character.FRANCINE
                    : nonTutorialActiveCharacter === Character.FRANCINE
                }
                canReplay={isTutorialProblem ? canSelect : nonTutorialCanSelect}
                feedback={feedback}
                onClick={() => {
                  handleCharacterTap(Character.FRANCINE);
                  if (!isTutorialProblem && nonTutorialStep === 'choice') handleNonTutorialChoice(Character.FRANCINE);
                  if (isTutorialProblem && canSelect) handleChoice(Character.FRANCINE);
                }}
                isClicked={charactersClicked.includes(Character.FRANCINE)}
                shouldAnimate={shouldAnimateFrancine}
              />
            </div>
          </div>
        )}

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

interface CharacterChoiceProps {
  character: Character;
  isActive: boolean;
  canReplay: boolean;
  feedback: 'success' | 'retry' | null;
  onClick: () => void;
  shouldAnimate: boolean;
  isClicked?: boolean;
}

function CharacterChoice({
  character,
  isActive,
  canReplay,
  feedback,
  onClick,
  shouldAnimate,
  isClicked,
}: CharacterChoiceProps) {
  const isLulu = character === Character.LULU;

  return (
    <div onClick={onClick} className="cursor-pointer">
      <CharacterAvatar
        emoji={isLulu ? '🐞' : '🐸'}
        name={isLulu ? 'Lulu' : 'Francine'}
        backgroundColor={isLulu ? 'bg-red-400' : 'bg-green-400'}
        isAnimated={isActive}
        className={`
          ${isActive ? 'scale-125 shadow-xl' : 'hover:scale-110'}
          ${shouldAnimate ? 'animate-bounce' : ''}
          ${isClicked ? 'opacity-50' : ''}
        `}
      />
    </div>
  );
}
