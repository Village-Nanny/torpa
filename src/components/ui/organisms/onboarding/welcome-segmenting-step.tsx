'use client';

import React from 'react';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { useAudioSequence } from '@/src/hooks/useAudioSequence';

interface WelcomeSegmentingStepProps {
  onNext: () => void;
}

const welcomeAudioSequence = [
  {
    path: '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting Training introLet’s play another game.m4a',
    postDelay: 500,
  },
  {
    path: '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingReadyLet’s try one.m4a',
  },
];

export function WelcomeSegmentingStep({ onNext }: WelcomeSegmentingStepProps) {
  useAudioSequence({
    sequence: welcomeAudioSequence,
    autoPlay: true,
    onSequenceComplete: onNext,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="flex justify-center gap-8 md:gap-16">
          <CharacterAvatar emoji="🐞" name="Lulu" backgroundColor="bg-red-400" className="hover:scale-110" isAnimated />
          <CharacterAvatar
            emoji="🐸"
            name="Francine"
            backgroundColor="bg-green-400"
            className="hover:scale-110"
            isAnimated
          />
        </div>
      </div>
    </div>
  );
}
