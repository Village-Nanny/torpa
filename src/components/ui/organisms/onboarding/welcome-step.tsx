'use client';

import React from 'react';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { useAudioSequence } from '@/src/hooks/useAudioSequence';

interface WelcomeStepProps {
  onNext: () => void;
}

const welcomeAudioSequence = [
  {
    path: '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training Let Play a GameLulu or Francine will say a word.m4a',
    postDelay: 500,
  },
  {
    path: '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingReady Let Try One.m4a',
  },
];

export function WelcomeStep({ onNext }: WelcomeStepProps) {
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
