import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import React from 'react';
export function GameExplanationStep() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">The Game! 🎮</h1>
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
      <div className="space-y-6">
        <p className="text-2xl md:text-4xl text-white font-bold">Lulu and Francine will say a word! 🗣️</p>
        <div className="bg-white/20 p-8 rounded-xl">
          <p className="text-2xl md:text-4xl text-white font-bold">Tap who says it the right way! 👆</p>
        </div>
      </div>
    </div>
  );
}
