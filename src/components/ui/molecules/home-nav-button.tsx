import React from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/src/components/ui/atoms/button';

interface HomeNavButtonProps {
  onClick: () => void;
  className?: string;
}

export const HomeNavButton: React.FC<HomeNavButtonProps> = ({ onClick, className = '' }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`absolute top-4 left-4 z-40 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white inline-flex items-center gap-2 transition-all duration-200 ${className}`}>
      <Home className="w-4 h-4" />
      Home
    </Button>
  );
};
