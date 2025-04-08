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
  FINAL = 2,
}

export function GameIntroScreen({ onContinue }: GameIntroScreenProps) {
  const [currentStep, setCurrentStep] = useState<IntroStep>(IntroStep.HI_FRIEND);
  const [error, setError] = useState<string | null>(null);

  // Handler for audio errors
  const handleError = (errorMessage: string) => {
    console.error('Audio error:', errorMessage);
    setError(errorMessage);
  };

  // Handler for moving to the next step
  const handleStepComplete = () => {
    if (currentStep === IntroStep.HI_FRIEND) {
      setCurrentStep(IntroStep.CHARACTER_INTRODUCTION);
    } else if (currentStep === IntroStep.CHARACTER_INTRODUCTION) {
      setCurrentStep(IntroStep.FINAL);
    }
  };

  // Error UI
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

        {currentStep === IntroStep.FINAL && (
          <motion.div
            key="final-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">Let's Play!</h1>
            <div className="max-w-2xl text-center mb-10">
              <p className="text-xl md:text-2xl mb-6">You're about to start a fun adventure with sounds and words!</p>
              <p className="text-xl md:text-2xl mb-6">
                Listen carefully and use your phonological awareness skills to solve the puzzles.
              </p>
            </div>
            <Button
              onClick={onContinue}
              className="bg-white text-blue-600 hover:bg-blue-100 text-xl px-8 py-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
              Let's Get Started!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
