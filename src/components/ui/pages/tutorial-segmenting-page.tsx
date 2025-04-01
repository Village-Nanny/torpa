'use client';

import React, { useState } from 'react';
import { WelcomeStep } from '@/src/components/ui/organisms/onboarding/welcome-step';
import { GameExplanationStep } from '@/src/components/ui/organisms/onboarding/game-explanation-step';
import { PracticeStep } from '@/src/components/ui/organisms/onboarding/practice-step';
import { SegmentingGameTemplate } from '../templates/segmenting-template';
import { SegmentingProblem } from '@/src/types/segmenting';

interface TutorialSegmentingPageProps {
  problem: SegmentingProblem;
  onSubmit: (answer: string) => void;
  onError?: (error: string) => void;
}

export default function TutorialSegmentingPage({ problem, onSubmit, onError }: TutorialSegmentingPageProps) {
  const [step, setStep] = useState(1);

  const renderTutorialContent = () => {
    switch (step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <GameExplanationStep />;
      case 3:
        return <PracticeStep problem={problem} />;
      default:
        return null;
    }
  };

  return (
    <SegmentingGameTemplate
      problem={problem}
      onSubmit={onSubmit}
      onError={onError}
      tutorialStep={step}
      tutorialContent={step < 4 ? renderTutorialContent() : undefined}
      showNavigation={step < 4}
      onNext={step < 4 ? () => setStep(step + 1) : undefined}
      onPrev={step > 1 ? () => setStep(step - 1) : undefined}
    />
  );
}
