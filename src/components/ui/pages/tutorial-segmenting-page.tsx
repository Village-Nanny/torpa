'use client';

import React, { useState } from 'react';
import { WelcomeSegmentingStep } from '@/src/components/ui/organisms/onboarding/welcome-segmenting-step';
import { SegmentingGameTemplate } from '../templates/segmenting-template';
import { SegmentingTutorial } from '@/src/types/segmenting-tutorial';

interface TutorialSegmentingPageProps {
  tutorial: SegmentingTutorial;
  onTutorialComplete: () => void;
  onError?: (error: string) => void;
}

export default function TutorialSegmentingPage({ tutorial, onTutorialComplete, onError }: TutorialSegmentingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    console.log(`TutorialSegmentingPage - handleNext called (current step: ${currentStep})`);
    if (currentStep < 3) {
      console.log(`TutorialSegmentingPage - Advancing to step ${currentStep + 1}`);
      setCurrentStep(currentStep + 1);
    } else {
      console.log('TutorialSegmentingPage - All steps complete, calling onTutorialComplete');
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
        return <WelcomeSegmentingStep onNext={handleNext} />;
      case 2:
        return (
          <SegmentingGameTemplate
            key="tutorial-problem-1"
            problem={tutorial.problem1}
            onSubmit={() => {
              handleNext();
            }}
            onError={onError}
            isTutorial={true}
            showNavigation={false}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <SegmentingGameTemplate
            key="tutorial-problem-2"
            problem={tutorial.problem2}
            onSubmit={() => {
              console.log('Tutorial problem2 completed, calling onTutorialComplete');
              handleNext();
            }}
            onError={onError}
            isTutorial={true}
            showNavigation={false}
            onPrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };

  return renderStep();
}
