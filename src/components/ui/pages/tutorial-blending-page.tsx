'use client';

import React, { useState } from 'react';
import { WelcomeStep } from '@/src/components/ui/organisms/onboarding/welcome-step';
import { BlendingExplanationStep } from '@/src/components/ui/organisms/onboarding/blending-explanation-step';
import { BlendingPracticeStep } from '@/src/components/ui/organisms/onboarding/blending-practice-step';
import { BlendingGameTemplate } from '../templates/blending-template';
import { BlendingProblem } from '@/src/types/blending';

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
        return <BlendingExplanationStep />;
      case 3:
        return <BlendingPracticeStep problem={problem} />;
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
