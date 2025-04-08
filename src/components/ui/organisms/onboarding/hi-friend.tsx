'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/src/hooks/use-audio';

interface HiFriendProps {
  onComplete: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

const AUDIO_PATH = '/assets/audio/intro/TORPA Intro/TORPA Intro- “Hi Friend”.m4a';

export function HiFriend({ onComplete, onError, autoPlay = true }: HiFriendProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { playAudio } = useAudio();
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  const playHiFriendAudio = useCallback(() => {
    // Stop any currently playing audio
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }

    setIsPlaying(true);

    activeAudioRef.current = playAudio(
      AUDIO_PATH,
      // On ended callback
      () => {
        setIsPlaying(false);
        activeAudioRef.current = null;

        // Wait 1 second before transitioning
        setTimeout(() => {
          onComplete();
        }, 1000);
      },
      // On error callback
      onError
    );
  }, [onComplete, onError, playAudio]);

  // Play audio when component mounts with a slight delay
  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(playHiFriendAudio, 200);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, playHiFriendAudio]);

  // Wave animation variants
  const waveAnimation = {
    animate: {
      rotate: [0, 20, -20, 20, 0],
      transition: {
        duration: 2.5,
        repeat: isPlaying ? Infinity : 0,
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
