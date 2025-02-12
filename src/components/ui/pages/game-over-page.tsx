import Link from 'next/link';
import { Trophy, Home } from 'lucide-react';
import { Button } from '../atoms/button';

export function GameOverPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 text-center space-y-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Trophy className="w-12 h-12 text-white" />
          <h1 className="text-6xl font-bold text-white">Game Complete!</h1>
        </div>
        <div className="mt-8 flex flex-col gap-4 items-center">
          <Button
            onClick={() => window.location.reload()}
            className="bg-white/20 hover:bg-white/30 text-white text-xl font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Play Again
          </Button>
          <Link href="/dashboard">
            <Button className="bg-white/20 hover:bg-white/30 text-white text-xl font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2">
              <Home className="w-6 h-6" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
