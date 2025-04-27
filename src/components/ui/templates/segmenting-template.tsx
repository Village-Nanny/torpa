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
      setActiveCharacter(null);
      setCanSelect(false);
    }
  }, [problem, isTutorialProblem]);

  useEffect(() => {
    if (isTutorialProblem && tutorialStep === 'complete') {
      onInternalTutorialComplete?.();
    }
  }, [isTutorialProblem, tutorialStep, onInternalTutorialComplete]);

  const regularAudioSequence = React.useMemo(() => {
    if (isTutorialProblem) return [];
    const sequence: AudioSequenceItem[] = [];
    switch (nonTutorialStep) {
      case 'intro': {
        const tutorialProblem = problem as TutorialSegmentingProblem;
        sequence.push({ path: tutorialProblem.wrongInstructUserNarration });
        break;
      }
      case 'character': {
        // Play only the correct audio path in the sequence, similar to blending
        sequence.push({ path: problem.correctAudioPath });
        break;
      }
      case 'choice': {
        // Use instructUserNarration from TutorialSegmentingProblem for choice instruction
        const tutorialProblem = problem as TutorialSegmentingProblem;
        sequence.push({ path: tutorialProblem.instructUserNarration });
        break;
      }
    }
    return sequence;
  }, [isTutorialProblem, nonTutorialStep, problem]);

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
            setNonTutorialStep('choice');
            setActiveCharacter(null);
            break;
          case 'choice':
            setCanSelect(true);
            break;
        }
      }
    },
    onAudioStart: item => {
      if (isTutorialProblem) {
        const tutorialProblem = problem as TutorialSegmentingProblem;
        if (item.path === tutorialProblem.imageNarration) setAnimatedImage('correct');
        else setAnimatedImage(null);
      }
    },
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
    return !!(isTutorialProblem && tutorialStep === 'character' && !charactersClicked.includes(Character.LULU));
  }, [isTutorialProblem, tutorialStep, charactersClicked]);

  const shouldAnimateFrancine = useMemo(() => {
    return !!(isTutorialProblem && tutorialStep === 'character' && !charactersClicked.includes(Character.FRANCINE));
  }, [isTutorialProblem, tutorialStep, charactersClicked]);

  const handleCharacterClick = useCallback(
    (character: Character) => {
      if (!isTutorialProblem || tutorialStep !== 'character') return;
      if (charactersClicked.includes(character)) return;
      setActiveCharacter(character);
      setCharactersClicked(prev => [...prev, character]);
    },
    [isTutorialProblem, tutorialStep, charactersClicked]
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

  useEffect(() => {
    if (isTutorialProblem) {
      console.log(tutorialStep);
      if (tutorialStep === 'intro' || tutorialStep === 'choice' || tutorialStep === 'feedback') {
        play();
      }
    } else {
      if (nonTutorialStep === 'intro' || nonTutorialStep === 'choice') {
        stop();
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
                isActive={activeCharacter === Character.LULU}
                canReplay={canSelect}
                feedback={feedback}
                onClick={() => {
                  if (isTutorialProblem && tutorialStep === 'character') {
                    handleCharacterClick(Character.LULU);
                  } else if (canSelect) {
                    handleChoice(Character.LULU);
                  }
                }}
                isClicked={charactersClicked.includes(Character.LULU)}
                shouldAnimate={shouldAnimateLulu}
              />
              <CharacterChoice
                character={Character.FRANCINE}
                isActive={activeCharacter === Character.FRANCINE}
                canReplay={canSelect}
                feedback={feedback}
                onClick={() => {
                  if (isTutorialProblem && tutorialStep === 'character') {
                    handleCharacterClick(Character.FRANCINE);
                  } else if (canSelect) {
                    handleChoice(Character.FRANCINE);
                  }
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
