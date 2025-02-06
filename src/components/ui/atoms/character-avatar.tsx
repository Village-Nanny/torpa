interface CharacterAvatarProps {
  emoji: string;
  name: string;
  backgroundColor: string;
  className?: string;
  isAnimated?: boolean;
}

export function CharacterAvatar({
  emoji,
  name,
  backgroundColor,
  className = '',
  isAnimated = false,
}: CharacterAvatarProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`
          w-28 h-28 md:w-40 md:h-40 
          rounded-full 
          ${backgroundColor}
          flex items-center justify-center 
          transform transition-all duration-500 
          shadow-lg
          ${className}
        `}>
        <span className={`text-6xl md:text-7xl ${isAnimated ? 'animate-bounce' : ''}`}>{emoji}</span>
      </div>
      <p className="text-2xl md:text-3xl text-white font-bold capitalize">{name}</p>
    </div>
  );
}
