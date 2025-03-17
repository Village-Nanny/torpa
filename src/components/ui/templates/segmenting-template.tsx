'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SegmentingProblem } from '@/src/types/segmenting';
import { useAudio } from '@/src/hooks/use-audio';

interface SegmentingGameTemplateProps {
  problem: SegmentingProblem;
  onSubmit: (answer: string) => void;
  onError?: (error: string) => void;
  tutorialStep?: number;
  tutorialContent?: React.ReactNode;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

export function SegmentingGameTemplate({
  problem,
  onSubmit,
  onError,
  tutorialStep,
  tutorialContent,
  showNavigation,
  onNext,
  onPrev,
}: SegmentingGameTemplateProps) {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [canReplay, setCanReplay] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const { playAudio } = useAudio();

  const audioSequenceRef = useRef<{ audio: string; character: Character }[] | null>(null);

  useEffect(() => {
    audioSequenceRef.current = null;
  }, [problem]);

  const playAudioWithAnimation = useCallback(
    (audioPath: string, character: Character, nextAction?: () => void) => {
      setActiveCharacter(character);

      playAudio(
        audioPath,
        () => {
          setActiveCharacter(null);
          if (nextAction) {
            nextAction();
          } else {
            setCanReplay(true);
          }
        },
        onError
      );
    },
    [onError, playAudio]
  );

  const playSequence = useCallback(() => {
    setCanReplay(false);

    if (!audioSequenceRef.current) {
      const luluHasCorrectAudio = Math.random() < 0.5;
      audioSequenceRef.current = [
        {
          audio: luluHasCorrectAudio ? problem.correctAudioPath : problem.wrongAudioPath,
          character: Character.LULU,
        },
        {
          audio: luluHasCorrectAudio ? problem.wrongAudioPath : problem.correctAudioPath,
          character: Character.FRANCINE,
        },
      ];
    }

    const sequence = audioSequenceRef.current;
    if (!sequence) return;

    playAudioWithAnimation(sequence[0].audio, sequence[0].character, () => {
      setTimeout(() => {
        playAudioWithAnimation(sequence[1].audio, sequence[1].character, () => {
          setCanReplay(true);
        });
      }, 1000);
    });
  }, [playAudioWithAnimation, problem]);

  useEffect(() => {
    if (!tutorialStep || tutorialStep === 4) {
      const timer = setTimeout(playSequence, 1500);
      return () => clearTimeout(timer);
    }
  }, [tutorialStep, playSequence]);

  const handleChoice = (character: Character) => {
    if (!canReplay) return;

    const sequence = audioSequenceRef.current;
    if (!sequence) return;

    if (tutorialStep) {
      const correctCharacter = sequence[0].audio === problem.correctAudioPath ? Character.LULU : Character.FRANCINE;
      if (character === correctCharacter) {
        setFeedback('success');
        const correctAudio = correctCharacter === Character.LULU ? sequence[0].audio : sequence[1].audio;
        setTimeout(() => {
          onSubmit(correctAudio);
        }, 2000);
      } else {
        setFeedback('retry');
        setTimeout(() => {
          setFeedback(null);
          playSequence();
        }, 2000);
      }
    } else {
      const characterAudio = character === Character.LULU ? sequence[0].audio : sequence[1].audio;
      onSubmit(characterAudio);
    }
  };

  const correctCharacter = audioSequenceRef.current
    ? audioSequenceRef.current[0].audio === problem.correctAudioPath
      ? Character.LULU
      : Character.FRANCINE
    : null;

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
                shouldAnimate={feedback === 'success' && correctCharacter === Character.LULU}
              />
              <CharacterChoice
                character={Character.FRANCINE}
                isActive={activeCharacter === Character.FRANCINE}
                canReplay={canReplay}
                feedback={feedback}
                onClick={() => handleChoice(Character.FRANCINE)}
                shouldAnimate={feedback === 'success' && correctCharacter === Character.FRANCINE}
              />
            </div>

            <motion.div
              className="h-[120px] mt-8"
              animate={{ height: canReplay && !feedback ? 'auto' : '0px' }}
              transition={{ duration: 0.3 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: canReplay && !feedback ? 1 : 0,
                  y: canReplay && !feedback ? 0 : -20,
                }}
                transition={{ duration: 0.3 }}>
                <p className="text-2xl md:text-4xl text-white font-bold mb-4">Who said it the right way?</p>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={playSequence}
                  className="bg-white/20 px-6 py-3 text-white font-bold text-xl hover:bg-white/30">
                  Listen Again! 🔄
                </Button>
              </motion.div>
            </motion.div>
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
}

function CharacterChoice({ character, isActive, canReplay, feedback, onClick, shouldAnimate }: CharacterChoiceProps) {
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
          ${shouldAnimate ? 'animate-bounce' : ''}
        `}
      />
    </div>
  );
}
