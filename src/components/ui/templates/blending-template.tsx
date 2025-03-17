'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlendingProblem } from '@/src/types/blending';
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
  const [canSelect, setCanSelect] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentCharacter] = useState<Character>(Math.random() < 0.5 ? Character.LULU : Character.FRANCINE);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCanSelect(false);
    setActiveCharacter(currentCharacter);
    audioRef.current = new Audio(problem.audioPath);
    audioRef.current.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    audioRef.current.onended = () => {
      setActiveCharacter(null);
      setCanSelect(true);
    };
  }, [problem.audioPath, currentCharacter]);

  useEffect(() => {
    if (!tutorialStep || tutorialStep === 4) {
      const timer = setTimeout(playAudio, 1500);
      return () => clearTimeout(timer);
    }
  }, [tutorialStep, playAudio]);

  function handleChoice(imagePath: string) {
    if (!canSelect) return;

    if (tutorialStep) {
      if (problem.isCorrect(imagePath)) {
        setFeedback('success');
        setTimeout(() => {
          onSubmit(imagePath);
        }, 2000);
      } else {
        setFeedback('retry');
        setTimeout(() => {
          setFeedback(null);
          playAudio();
        }, 2000);
      }
    } else {
      onSubmit(imagePath);
    }
  }

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
        {tutorialContent || (
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
                  onClick={playAudio}
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
