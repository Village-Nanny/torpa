'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudioSequence } from '@/src/hooks/useAudioSequence';

interface HiFriendProps {
  onComplete: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

const AUDIO_PATH = '/assets/audio/intro/TORPA Intro/TORPAIntroHiFriend.m4a';

export function HiFriend({ onComplete, onError, autoPlay = true }: HiFriendProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const { isPlaying } = useAudioSequence({
    sequence: [
      {
        path: AUDIO_PATH,
        postDelay: 1000,
      },
    ],
    onSequenceComplete: onComplete,
    onError: error => onError?.(error),
    autoPlay,
  });

  useEffect(() => {
    setIsAnimating(isPlaying);
  }, [isPlaying]);

  // Wave animation variants
  const waveAnimation = {
    animate: {
      rotate: [0, 20, -20, 20, 0],
      transition: {
        duration: 2.5,
        repeat: isAnimating ? Infinity : 0,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
      <motion.div className="text-8xl md:text-9xl" animate="animate" variants={waveAnimation}>
        👋
      </motion.div>
    </div>
  );
}
