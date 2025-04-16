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

    // Automatically advance after a problem is completed
    setTimeout(handleNext, 1000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={handleNext} />;
      case 2:
        return (
          <BlendingGameTemplate
            problem={tutorial.problem1}
            onSubmit={handleProblemSubmit}
            onError={onError}
            showNavigation={false}
            onNext={handleNext}
            onPrev={handlePrev}
            isTutorial={true}
          />
        );
      case 3:
        return (
          <BlendingGameTemplate
            problem={tutorial.problem2}
            onSubmit={handleProblemSubmit}
            onError={onError}
            showNavigation={false}
            onNext={handleNext}
            onPrev={handlePrev}
            isTutorial={true}
          />
        );
      default:
        return null;
    }
  };

  return renderStep();
}
