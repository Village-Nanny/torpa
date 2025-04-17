'use client';

import React, { useState } from 'react';
import { Button } from '@/src/components/ui/atoms/button';
import { HiFriend } from './hi-friend';
import { CharacterIntroduction } from './character-introduction';
import { AnimatePresence, motion } from 'framer-motion';

interface GameIntroScreenProps {
  onContinue: () => void;
}

// Step enum to track the current step
enum IntroStep {
  HI_FRIEND = 0,
  CHARACTER_INTRODUCTION = 1,
}

export function GameIntroScreen({ onContinue }: GameIntroScreenProps) {
  const [currentStep, setCurrentStep] = useState<IntroStep>(IntroStep.HI_FRIEND);
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    console.error('Audio error:', errorMessage);
    setError(errorMessage);
  };

  const handleStepComplete = () => {
    if (currentStep === IntroStep.HI_FRIEND) {
      setCurrentStep(IntroStep.CHARACTER_INTRODUCTION);
    } else if (currentStep === IntroStep.CHARACTER_INTRODUCTION) {
      onContinue();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Oops! Something went wrong</h1>
        <p className="mb-8 text-center">{error}</p>
        <Button
          onClick={() => setError(null)}
          className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-full">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <AnimatePresence mode="wait">
        {currentStep === IntroStep.HI_FRIEND && (
          <motion.div
            key="hi-friend"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full">
            <HiFriend onComplete={handleStepComplete} onError={handleError} />
          </motion.div>
        )}

        {currentStep === IntroStep.CHARACTER_INTRODUCTION && (
          <motion.div
            key="character-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full">
            <CharacterIntroduction onComplete={handleStepComplete} onError={handleError} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
