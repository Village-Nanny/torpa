import { motion } from 'framer-motion';
import Image from 'next/image';
import { Character } from '@/src/types/enums/characters.enum';
import { Button } from '@/src/components/ui/atoms/button';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import Link from 'next/link';
import React from 'react';

interface ListeningStepProps {
  activeCharacter: Character | null;
  canReplay: boolean;
  feedback: 'success' | 'retry' | null;
  handleChoice: (character: Character) => void;
  playSequence: () => void;
}

export function ListeningStep({
  activeCharacter,
  canReplay,
  feedback,
  handleChoice,
  playSequence,
}: ListeningStepProps) {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Listen! 👂</h1>
      <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
        <Image src="/assets/images/pot.png" alt="Picture of a pot" fill className="object-contain" priority />
      </div>
      {feedback && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-center p-6 rounded-xl ${feedback === 'success' ? 'bg-green-500/30' : 'bg-yellow-500/30'}`}>
          {feedback === 'success' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-3xl md:text-4xl text-white font-bold">Wonderful! 🌟</p>
                <p className="text-2xl md:text-3xl text-white">You got it right! ⭐️</p>
              </div>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="mt-4 bg-white/20 px-8 py-4 text-white font-bold text-xl hover:bg-white/30 transform hover:scale-105">
                <Link href="/">Go to home page</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl text-white font-bold">Let&apos;s Try Again! 🎯</p>
              <p className="text-2xl md:text-3xl text-white">Listen carefully! 👂</p>
            </div>
          )}
        </motion.div>
      )}
      <div className="flex justify-center gap-20 md:gap-32 mt-8">
        <div
          onClick={() => canReplay && !feedback && handleChoice(Character.LULU)}
          className={!canReplay || feedback ? 'cursor-default' : 'cursor-pointer'}>
          <CharacterAvatar
            emoji="🐞"
            name="Lulu"
            backgroundColor="bg-red-400"
            isAnimated={activeCharacter === Character.LULU}
            className={`
              ${activeCharacter === Character.LULU ? 'scale-125 shadow-xl' : 'hover:scale-110'}
              ${feedback === 'success' && 'animate-bounce'}
            `}
          />
        </div>
        <div
          onClick={() => canReplay && !feedback && handleChoice(Character.FRANCINE)}
          className={!canReplay || feedback ? 'cursor-default' : 'cursor-pointer'}>
          <CharacterAvatar
            emoji="🐸"
            name="Francine"
            backgroundColor="bg-green-400"
            isAnimated={activeCharacter === Character.FRANCINE}
            className={activeCharacter === Character.FRANCINE ? 'scale-125 shadow-xl' : 'hover:scale-110'}
          />
        </div>
      </div>
      {canReplay && !feedback && (
        <div className="mt-8">
          <p className="text-2xl md:text-4xl text-white font-bold mb-4">Who said it the right way?</p>
          <Button
            variant="ghost"
            size="lg"
            onClick={playSequence}
            className="bg-white/20 px-6 py-3 text-white font-bold text-xl hover:bg-white/30">
            Listen Again! 🔄
          </Button>
        </div>
      )}
    </div>
  );
}
