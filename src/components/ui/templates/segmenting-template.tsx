'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SegmentingProblem } from '@/src/types/segmenting';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SegmentingGameTemplateProps {
  problem: SegmentingProblem;
  onSubmit: (answer: string) => void;
}

export function SegmentingGameTemplate({ problem, onSubmit }: SegmentingGameTemplateProps) {
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [canSelect, setCanSelect] = useState(false);
  const [feedback] = useState<'success' | 'retry' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCanSelect(false);
    setActiveCharacter(Character.LULU);
    audioRef.current = new Audio(problem.audioPath);
    audioRef.current.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    audioRef.current.onended = () => {
      setActiveCharacter(null);
      setCanSelect(true);
    };
  }, [problem.audioPath]);

  useEffect(() => {
    const timer = setTimeout(playAudio, 500);
    return () => clearTimeout(timer);
  }, [playAudio]);

  function handleChoice(imagePath: string) {
    if (!canSelect) return;
    onSubmit(imagePath);
  }

  const choices = React.useMemo(() => {
    const options = [
      { type: 'correct', image: problem.correctImagePath },
      { type: 'wrong', image: problem.wrongImagePath },
    ];
    return Math.random() < 0.5 ? options : options.reverse();
  }, [problem]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <div className="z-10 max-w-3xl px-4 mx-auto">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">Choose the Right Picture! 🎯</h1>
          {feedback && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-center p-6 rounded-xl ${feedback === 'success' ? 'bg-green-500/30' : 'bg-yellow-500/30'}`}>
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
                onClick={() => canSelect && handleChoice(option.image)}
                className={!canSelect ? 'cursor-default' : 'cursor-pointer'}>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden hover:scale-110 transition-transform">
                  <Image src={option.image} alt={`${option.type} image`} fill className="object-contain" priority />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-2xl md:text-4xl text-white font-bold mb-4">Which picture matches what you hear?</p>
            <div className="flex flex-col items-center gap-6">
              <Button
                variant="ghost"
                size="lg"
                onClick={playAudio}
                className="bg-white/20 px-6 py-3 text-white font-bold text-xl hover:bg-white/30">
                Listen Again! 🔄
              </Button>
              <CharacterAvatar
                emoji="🐞"
                name="Lulu"
                backgroundColor="bg-red-400"
                isAnimated={activeCharacter === Character.LULU}
                className={`transition-transform duration-200 ${activeCharacter === Character.LULU ? 'scale-125 shadow-xl' : 'hover:scale-110'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
