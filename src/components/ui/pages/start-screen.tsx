'use client';

import React from 'react';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import { Button } from '@/src/components/ui/atoms/button';
import { Header } from '@/src/components/ui/molecules/header';
import { ChevronRight } from 'lucide-react';

interface StartScreenProps {
  onStart: (includeTutorial: boolean) => void;
  showHeader?: boolean;
}

export function StartScreen({ onStart, showHeader = true }: StartScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <DotPattern className="absolute inset-0 bg-green-600 text-gray-200" />

      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
      )}

      <div className="space-y-8 md:space-y-12 text-center z-10 max-w-2xl px-4 mx-auto">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Hey Parents! 👋</h1>
          <div className="space-y-3 md:space-y-4">
            <p className="text-lg md:text-xl text-gray-100">Welcome to our interactive learning adventure!</p>
            <p className="text-base md:text-lg text-gray-100">
              Once you click a button below, please hand the device to your child to begin their journey.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            onClick={() => onStart(true)}
            className="group w-full md:w-auto px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-8 text-base sm:text-lg md:text-xl font-bold text-green-600 bg-white hover:bg-gray-100 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] md:hover:scale-105">
            <span className="flex items-center justify-center gap-2">
              <span className="block sm:hidden">Start with Tutorial!</span>
              <span className="hidden sm:block">Start with Tutorial - Perfect for First Time!</span>
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <Button
            size="lg"
            onClick={() => onStart(false)}
            className="group w-full md:w-auto px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-8 text-base sm:text-lg md:text-xl font-bold text-white bg-white/20 hover:bg-white/30 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] md:hover:scale-105">
            <span className="flex items-center justify-center gap-2">
              <span className="block sm:hidden">Skip Tutorial!</span>
              <span className="hidden sm:block">Skip Tutorial - Jump Right In!</span>
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
