'use client';

import React, { useState } from 'react';
import { BlendingProblem } from '@/src/types/blending';
import { BlendingGameTemplate } from '@/src/components/ui/templates/blending-template';
import { WelcomeStep } from '@/src/components/ui/organisms/onboarding/welcome-step';
import { GameExplanationStep } from '@/src/components/ui/organisms/onboarding/game-explanation-step';
import { PracticeStep } from '@/src/components/ui/organisms/onboarding/practice-step';

interface TutorialBlendingPageProps {
  problem: BlendingProblem;
  onSubmit: (answer: string) => void;
}

export default function TutorialBlendingPage({ problem, onSubmit }: TutorialBlendingPageProps) {
  const [step, setStep] = useState(1);

  const renderTutorialContent = () => {
    switch (step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <GameExplanationStep />;
      case 3:
        return <PracticeStep />;
      case 4:
        return null;
      default:
        return null;
    }
  };

  return (
    <BlendingGameTemplate
      problem={problem}
      onSubmit={onSubmit}
      tutorialStep={step}
      tutorialContent={step < 4 ? renderTutorialContent() : undefined}
      showNavigation={step < 4}
      onNext={step < 4 ? () => setStep(step + 1) : undefined}
      onPrev={step > 1 ? () => setStep(step - 1) : undefined}
    />
  );
}
