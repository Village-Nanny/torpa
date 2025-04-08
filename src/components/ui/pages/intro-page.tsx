'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { IntroWelcomeStep } from '../organisms/onboarding/intro-welcome-step';
import { IntroExplanationStep } from '../organisms/onboarding/intro-explanation-step';
import { IntroLetsStartStep } from '../organisms/onboarding/intro-lets-start-step';

// Simple enum to track which step we're on
enum IntroStepType {
  WELCOME = 0,
  EXPLANATION = 1,
  LETS_START = 2,
}

// Configuration for delay after each step
const STEP_DELAYS = {
  [IntroStepType.WELCOME]: 1000,
  [IntroStepType.CHARACTER_INTRO]: 1000,
  [IntroStepType.EXPLANATION]: 1000,
  [IntroStepType.LETS_START]: 1500,
};

interface IntroPageProps {
  onComplete: () => void;
  onError?: (error: string) => void;
}

export default function IntroPage({ onComplete, onError }: IntroPageProps) {
  const [currentStep, setCurrentStep] = useState<IntroStepType>(IntroStepType.WELCOME);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any pending timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Function to advance to next step or complete
  const advanceToNextStep = useCallback(() => {
    const nextStep = currentStep + 1;
    if (nextStep < Object.keys(IntroStepType).length / 2) {
      // Divide by 2 because enum has both string and number keys
      setCurrentStep(nextStep);
    } else {
      onComplete();
    }
  }, [currentStep, onComplete]);

  // Handle audio completion with delay before advancing
  const handleAudioComplete = useCallback(() => {
    // Set timeout to advance to next step after delay
    const delay = STEP_DELAYS[currentStep];
    clearTimeouts(); // Clear any existing timeout first

    timeoutRef.current = setTimeout(() => {
      advanceToNextStep();
    }, delay);
  }, [currentStep, advanceToNextStep, clearTimeouts]);

  // Handle skip action
  const handleSkip = useCallback(() => {
    clearTimeouts();
    advanceToNextStep();
  }, [clearTimeouts, advanceToNextStep]);

  // Render the appropriate step component based on current step
  const renderStepContent = () => {
    // Only render the current step component
    switch (currentStep) {
      case IntroStepType.WELCOME:
        return <IntroWelcomeStep character={Character.LULU} onAudioComplete={handleAudioComplete} onError={onError} />;
      case IntroStepType.EXPLANATION:
        return (
          <IntroExplanationStep
            character={Character.FRANCINE}
            onAudioComplete={handleAudioComplete}
            onError={onError}
          />
        );
      case IntroStepType.LETS_START:
        return (
          <IntroLetsStartStep character={Character.LULU} onAudioComplete={handleAudioComplete} onError={onError} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="intro-page">
      <div className="intro-content">
        {/* Step-specific content rendered from organism components */}
        {renderStepContent()}

        {/* Controls - simplified to just skip */}
        <div className="controls">
          <button onClick={handleSkip} className="icon-button">
            ⏩ Skip
          </button>
        </div>
      </div>
    </div>
  );
}
