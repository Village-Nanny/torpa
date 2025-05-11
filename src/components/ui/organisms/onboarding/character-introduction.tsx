'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { useAudioSequence } from '@/src/hooks/useAudioSequence';

interface CharacterIntroductionProps {
  onComplete: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

// Audio sequence with information about which character to introduce
interface CharacterAudioItem {
  path: string;
  character: Character | null;
  preDelay?: number;
  postDelay?: number;
}

const AUDIO_SEQUENCE: CharacterAudioItem[] = [
  {
    path: '/assets/audio/intro/TORPA Intro/meet_lulu.mp3',
    character: Character.LULU,
    postDelay: 100,
  },
  {
    path: '/assets/audio/intro/TORPA Intro/and_francince.mp3',
    character: Character.FRANCINE,
    postDelay: 100,
  },
  {
    path: '/assets/audio/intro/TORPA Intro/play_games.mp3',
    character: null,
    postDelay: 100,
  },

  {
    path: '/assets/audio/intro/TORPA Intro/TORPA Intro Wave Hello to Lulu and Francine.m4a',
    character: null,
    postDelay: 200,
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

  const { currentStepIndex, isPlaying } = useAudioSequence({
    sequence: AUDIO_SEQUENCE,
    onSequenceComplete: onComplete,
    onError: error => onError?.(error),
    autoPlay,
    initialDelay: 0, // Removed initial delay
  });

  // Update active character based on current step
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < AUDIO_SEQUENCE.length) {
      const currentAudio = AUDIO_SEQUENCE[currentStepIndex];

      // Set active character
      setActiveCharacter(isPlaying ? currentAudio.character : null);

      // Add to visible characters if not already there
      if (currentAudio.character && !visibleCharacters.includes(currentAudio.character)) {
        setVisibleCharacters(prev => [...prev, currentAudio.character as Character]);
      }
    }
  }, [currentStepIndex, isPlaying, visibleCharacters]);

  // Function to determine if a character should be animated
  const isCharacterAnimated = (character: Character) => {
    return isPlaying && activeCharacter === character;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
      <div className="flex justify-center gap-8 md:gap-24 mt-8 h-[250px] items-center relative">
        {/* Lulu Character */}
        {visibleCharacters.includes(Character.LULU) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', duration: 0.8 },
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', duration: 0.8 },
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}>
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
