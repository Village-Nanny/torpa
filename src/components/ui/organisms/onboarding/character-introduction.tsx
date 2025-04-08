'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/src/hooks/use-audio';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';

interface CharacterIntroductionProps {
  onComplete: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

// Audio sequence with information about which character to introduce
interface AudioSequenceItem {
  path: string;
  character: Character | null;
  delay?: number; // Delay before playing this audio
  postDelay?: number; // Delay after this audio finishes before playing next
}

const AUDIO_SEQUENCE: AudioSequenceItem[] = [
  {
    path: '/assets/audio/intro/TORPA Intro/meet_lulu.mp3',
    character: Character.LULU,
    postDelay: 900, // shorter delay after Lulu's introduction
  },
  {
    path: '/assets/audio/intro/TORPA Intro/and_francince.mp3',
    character: Character.FRANCINE,
    postDelay: 1000, // slightly longer delay after Francine's introduction
  },
  {
    path: '/assets/audio/intro/TORPA Intro/play_games.mp3',
    character: null,
    postDelay: 1000, // longer pause before the final message
  },
  {
    path: '/assets/audio/intro/TORPA Intro/TORPA Intro - “Wave Hello to Lulu and Francine”.m4a',
    character: null,
    postDelay: 2000, // shorter delay at the end
  },
];

const WavingHand = () => (
  <motion.div
    className={`relative text-4xl -translate-x-1/2 -translate-y-1/2`}
    initial={{ rotate: 0, x: 0 }} // Set explicit initial state
    animate={{
      rotate: [0, 25, -20, 25, -15, 20, 0],
      x: [-5, 5, -5, 5, -4, 4, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 0.2,
      ease: 'easeInOut',
    }}>
    👋
  </motion.div>
);

const CharacterWithHand = ({
  isAnimated,
  emoji,
  name,
  backgroundColor,
}: {
  character: Character;
  isAnimated: boolean;
  emoji: string;
  name: string;
  backgroundColor: string;
}) => (
  <div className="relative">
    <CharacterAvatar
      emoji={emoji}
      name={name}
      backgroundColor={backgroundColor}
      isAnimated={isAnimated}
      className={`transition-transform duration-200 ${isAnimated ? 'scale-125 shadow-xl' : ''}`}
    />
    <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-50">
      <WavingHand />
    </div>
  </div>
);

export function CharacterIntroduction({ onComplete, onError, autoPlay = true }: CharacterIntroductionProps) {
  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>([]);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [canPlayNext, setCanPlayNext] = useState(true);

  const { playAudio } = useAudio();
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const isMountedRef = useRef(true);

  const characterEntrance = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', duration: 0.8 } },
    center: { x: 0, opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    left: { x: -60, opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  };

  const playSequenceAudio = useCallback(() => {
    // Don't start if we can't play next
    if (!canPlayNext) return;

    // Stop any currently playing audio
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }

    // Check if we've reached the end
    if (currentStep >= AUDIO_SEQUENCE.length) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    setCanPlayNext(false);
    const currentAudio = AUDIO_SEQUENCE[currentStep];

    setActiveCharacter(currentAudio.character);
    if (currentAudio.character && !visibleCharacters.includes(currentAudio.character)) {
      setVisibleCharacters(prev => [...prev, currentAudio.character as Character]);
    }

    const playWithDelay = () => {
      activeAudioRef.current = playAudio(
        currentAudio.path,
        () => {
          if (!isMountedRef.current) return;
          setActiveCharacter(null);
          setTimeout(() => {
            if (isMountedRef.current) {
              setCurrentStep(prev => prev + 1);
              setCanPlayNext(true);
            }
          }, currentAudio.postDelay || 900);
        },
        error => {
          if (!isMountedRef.current) return;
          console.error('Audio error:', error);
          if (onError) onError(error);
          setTimeout(() => {
            if (isMountedRef.current) {
              setCurrentStep(prev => prev + 1);
              setCanPlayNext(true);
            }
          }, currentAudio.postDelay || 900);
        }
      );
    };

    // Apply delay if specified
    if (currentAudio.delay) {
      setTimeout(playWithDelay, currentAudio.delay);
    } else {
      playWithDelay();
    }
  }, [currentStep, onComplete, onError, playAudio, visibleCharacters, canPlayNext]);

  // Single effect to manage the sequence
  useEffect(() => {
    if (autoPlay && canPlayNext) {
      const timer = setTimeout(playSequenceAudio, currentStep === 0 ? 1500 : 0);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, canPlayNext, currentStep, playSequenceAudio]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Function to determine if a character should be animated
  const isCharacterAnimated = (character: Character) => {
    return !canPlayNext && activeCharacter === character;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
      <div className="flex justify-center gap-8 md:gap-24 mt-8 h-[250px] items-center relative">
        {/* Lulu Character */}
        {visibleCharacters.includes(Character.LULU) && (
          <motion.div
            variants={characterEntrance}
            initial="hidden"
            animate={visibleCharacters.includes(Character.FRANCINE) ? 'left' : 'center'}>
            <CharacterWithHand
              character={Character.LULU}
              isAnimated={isCharacterAnimated(Character.LULU)}
              emoji="🐞"
              name="Lulu"
              backgroundColor="bg-red-400"
            />
          </motion.div>
        )}

        {/* Francine Character */}
        {visibleCharacters.includes(Character.FRANCINE) && (
          <motion.div variants={characterEntrance} initial="hidden" animate="visible">
            <CharacterWithHand
              character={Character.FRANCINE}
              isAnimated={isCharacterAnimated(Character.FRANCINE)}
              emoji="🐸"
              name="Francine"
              backgroundColor="bg-green-400"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
