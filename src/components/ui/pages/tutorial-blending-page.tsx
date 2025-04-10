'use client';

import React, { useState } from 'react';
import { WelcomeStep } from '@/src/components/ui/organisms/onboarding/welcome-step';
import { BlendingGameTemplate } from '../templates/blending-template';
import { BlendingTutorial } from '@/src/types/blending-tutorial';

interface TutorialBlendingPageProps {
  tutorial: BlendingTutorial;
  onTutorialComplete: () => void;
  onError?: (error: string) => void;
}

export default function TutorialBlendingPage({ tutorial, onTutorialComplete, onError }: TutorialBlendingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const currentProblem =
    currentStep === 2 ? tutorial.problem1 : currentStep === 3 ? tutorial.problem2 : tutorial.problem1;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onTutorialComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProblemSubmit = (answer: string) => {
    console.log(`Tutorial step ${currentStep} problem submitted with:`, answer);
  };

  return currentStep === 1 ? (
    <WelcomeStep onNext={handleNext} />
  ) : (
    <BlendingGameTemplate
      problem={currentProblem}
      onSubmit={handleProblemSubmit}
      onError={onError}
      showNavigation={true}
      onNext={handleNext}
      onPrev={currentStep > 1 ? handlePrev : undefined}
      isTutorial={true}
    />
  );
}
