import React from 'react';
import { RotateCw } from 'lucide-react';

interface ReplayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  className?: string;
}

export const ReplayButton: React.FC<ReplayButtonProps> = ({ isPlaying, onClick, className = '' }) => {
  return (
    <div
      onClick={!isPlaying ? onClick : undefined}
      className={`inline-flex items-center gap-2 bg-white/30 backdrop-blur-md rounded-full px-6 py-2.5 text-white font-medium shadow-lg cursor-pointer transition-all duration-300 hover:bg-white/40 ${
        isPlaying ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
      } ${className}`}>
      <RotateCw className={`h-5 w-5 ${isPlaying ? 'animate-spin' : ''}`} />
    </div>
  );
};
