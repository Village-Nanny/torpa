import { CharacterAvatar } from '@/src/components/ui/atoms/character-avatar';

export function FinalStep() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Your Turn! 🌟</h1>
      <p className="text-2xl md:text-4xl text-white font-bold">Who said it the right way?</p>
      <div className="flex justify-center gap-8 md:gap-16">
        <div className="flex flex-col items-center space-y-4">
          <CharacterAvatar emoji="🐞" name="Lulu" backgroundColor="bg-red-400" className="hover:scale-110" isAnimated />
          <p className="text-xl md:text-2xl text-white font-bold">Tap Lulu!</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <CharacterAvatar
            emoji="🐸"
            name="Francine"
            backgroundColor="bg-green-400"
            className="hover:scale-110"
            isAnimated
          />
          <p className="text-xl md:text-2xl text-white font-bold">Tap Francine!</p>
        </div>
      </div>
    </div>
  );
}
