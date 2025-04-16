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
    console.log(`TutorialBlendingPage - handleNext called (current step: ${currentStep})`);
    if (currentStep < 3) {
      console.log(`TutorialBlendingPage - Advancing to step ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
    } else {
      console.log('TutorialBlendingPage - All steps complete, calling onTutorialComplete');
      onTutorialComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={handleNext} />;
      case 2:
        return (
          <BlendingGameTemplate
            key="tutorial-problem-1"
            problem={tutorial.problem1}
            onSubmit={() => {
              console.log("Tutorial problem1 - onSubmit called (shouldn't happen)");
            }}
            onInternalTutorialComplete={() => {
              console.log('Tutorial problem1 completed, advancing to next step');
              handleNext();
            }}
            onError={onError}
            showNavigation={false}
            onPrev={handlePrev}
            isTutorial={true}
          />
        );
      case 3:
        return (
          <BlendingGameTemplate
            key="tutorial-problem-2"
            problem={tutorial.problem2}
            onSubmit={() => {
              console.log("Tutorial problem2 - onSubmit called (shouldn't happen)");
            }}
            onInternalTutorialComplete={() => {
              console.log('Tutorial problem2 completed, calling onTutorialComplete');
              handleNext();
            }}
            onError={onError}
            showNavigation={false}
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
