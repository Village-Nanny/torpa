'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BlendingProblem } from '@/src/types/blending';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlendingGameTemplateProps {
  problem: BlendingProblem;
  onSubmit: (answer: string) => void;
  tutorialStep?: number;
  tutorialContent?: React.ReactNode;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export function BlendingGameTemplate({
  problem,
  onSubmit,
  tutorialStep,
  tutorialContent,
  showNavigation,
  onNext,
  onPrev,
}: BlendingGameTemplateProps) {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [canReplay, setCanReplay] = useState(true);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudioWithAnimation = useCallback((audioPath: string, character: Character, nextAction?: () => void) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveCharacter(character);
    audioRef.current = new Audio(audioPath);
    audioRef.current.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    audioRef.current.onended = () => {
      setActiveCharacter(null);
      if (nextAction) {
        nextAction();
      } else {
        setCanReplay(true);
      }
    };
  }, []);

  const playSequence = useCallback(() => {
    setCanReplay(false);
    playAudioWithAnimation(problem.correctAudioPath, Character.LULU, () => {
      setTimeout(() => {
        playAudioWithAnimation(problem.wrongAudioPath, Character.FRANCINE, () => {
          setCanReplay(true);
        });
      }, 1000);
    });
  }, [playAudioWithAnimation, problem]);

  useEffect(() => {
    if (!tutorialStep || tutorialStep === 4) {
      playSequence();
    }
  }, [tutorialStep, playSequence]);

  const handleChoice = (character: Character) => {
    if (!canReplay) return;

    if (tutorialStep) {
      if (character === Character.LULU) {
        setFeedback('success');
        setTimeout(() => {
          onSubmit(problem.correctAudioPath);
        }, 2000);
      } else {
        setFeedback('retry');
        setTimeout(() => {
          setFeedback(null);
          playSequence();
        }, 2000);
      }
    } else {
      onSubmit(character === Character.LULU ? problem.correctAudioPath : problem.wrongAudioPath);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <div className="z-10 max-w-3xl px-4 mx-auto">
        {tutorialContent || (
          <div className="space-y-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white">Listen! 👂</h1>

            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
              <Image src={problem.imagePath} alt="Problem Image" fill className="object-contain" priority />
            </div>

            {feedback && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-center p-6 rounded-xl ${
                  feedback === 'success' ? 'bg-green-500/30' : 'bg-yellow-500/30'
                }`}>
                {feedback === 'success' ? (
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl text-white font-bold">Wonderful! 🌟</p>
                    <p className="text-2xl md:text-3xl text-white">You got it right! ⭐️</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl text-white font-bold">Let&apos;s Try Again! 🎯</p>
                    <p className="text-2xl md:text-3xl text-white">Listen carefully! 👂</p>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex justify-center gap-20 md:gap-32 mt-8">
              <CharacterChoice
                character={Character.LULU}
                isActive={activeCharacter === Character.LULU}
                canReplay={canReplay}
                feedback={feedback}
                onClick={() => handleChoice(Character.LULU)}
              />
              <CharacterChoice
                character={Character.FRANCINE}
                isActive={activeCharacter === Character.FRANCINE}
                canReplay={canReplay}
                feedback={feedback}
                onClick={() => handleChoice(Character.FRANCINE)}
              />
            </div>

            {canReplay && !feedback && (
              <div className="mt-8">
                <p className="text-2xl md:text-4xl text-white font-bold mb-4">Who said it the right way?</p>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={playSequence}
                  className="bg-white/20 px-6 py-3 text-white font-bold text-xl hover:bg-white/30">
                  Listen Again! 🔄
                </Button>
              </div>
            )}
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
                <ChevronLeft size={48} />
              </Button>
            )}
            {onNext && (
              <Button
                variant="ghost"
                size="lg"
                onClick={onNext}
                className="w-20 h-20 md:w-24 md:h-24 p-0 text-white bg-green-500 hover:bg-green-400 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
                <ChevronRight size={48} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface CharacterChoiceProps {
  // specific to blending pages
  character: Character;
  isActive: boolean;
  canReplay: boolean;
  feedback: 'success' | 'retry' | null;
  onClick: () => void;
}

function CharacterChoice({ character, isActive, canReplay, feedback, onClick }: CharacterChoiceProps) {
  const isLulu = character === Character.LULU;

  return (
    <div
      onClick={() => canReplay && !feedback && onClick()}
      className={!canReplay || feedback ? 'cursor-default' : 'cursor-pointer'}>
      <CharacterAvatar
        emoji={isLulu ? '🐞' : '🐸'}
        name={isLulu ? 'Lulu' : 'Francine'}
        backgroundColor={isLulu ? 'bg-red-400' : 'bg-green-400'}
        isAnimated={isActive}
        className={`
          ${isActive ? 'scale-125 shadow-xl' : 'hover:scale-110'}
          ${feedback === 'success' && isLulu && 'animate-bounce'}
        `}
      />
    </div>
  );
}
