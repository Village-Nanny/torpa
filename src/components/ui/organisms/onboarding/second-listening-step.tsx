import Image from 'next/image';
import { Character } from '@/src/types/enums/characters.enum';
import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';
import { Button } from '@/src/components/ui/atoms/button';
interface SecondListeningStepProps {
  activeCharacter: Character | null;
  canReplay: boolean;
  playAudioWithAnimation: (filename: string, character: Character) => void;
}

export function SecondListeningStep({ activeCharacter, canReplay, playAudioWithAnimation }: SecondListeningStepProps) {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Listen! 👂</h1>
      <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
        <Image src="/assets/images/pot.png" alt="Picture of a pot" fill className="object-contain" priority />
      </div>
      {canReplay && (
        <Button
          onClick={() => playAudioWithAnimation('0a gum', Character.FRANCINE)}
          className="bg-white/20 px-6 py-3 rounded-full text-white font-bold text-xl hover:bg-white/30 transition-colors">
          Listen Again! 🔄
        </Button>
      )}
      <div className="flex justify-center gap-20 md:gap-32 mt-8">
        <div onClick={() => playAudioWithAnimation('0b pot', Character.LULU)} className="cursor-pointer">
          <CharacterAvatar
            emoji="🐞"
            name="Lulu"
            backgroundColor="bg-red-400"
            isAnimated={activeCharacter === Character.LULU}
            className={activeCharacter === Character.LULU ? 'scale-125 shadow-xl' : 'hover:scale-110'}
          />
        </div>
        <div onClick={() => playAudioWithAnimation('0a gum', Character.FRANCINE)} className="cursor-pointer">
          <CharacterAvatar
            emoji="🐸"
            name="Francine"
            backgroundColor="bg-green-400"
            isAnimated={activeCharacter === Character.FRANCINE}
            className={activeCharacter === Character.FRANCINE ? 'scale-125 shadow-xl' : 'hover:scale-110'}
          />
        </div>
      </div>
    </div>
  );
}
