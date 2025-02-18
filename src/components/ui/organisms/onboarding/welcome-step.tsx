import React from 'react';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';

export function WelcomeStep() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Hi Friend! 👋</h1>
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
      <p className="text-2xl md:text-4xl text-white font-bold">Meet Lulu and Francine! Wave hello! 👋</p>
    </div>
  );
}
