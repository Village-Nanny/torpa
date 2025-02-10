'use client';

import React from 'react';
import { BlendingProblem } from '@/src/types/blending';
import { BlendingGameTemplate } from '@/src/components/ui/templates/blending-template';

interface BlendingPageProps {
  problem: BlendingProblem;
  onSubmit: (answer: string) => void;
}

export default function BlendingPage({ problem, onSubmit }: BlendingPageProps) {
  return <BlendingGameTemplate problem={problem} onSubmit={onSubmit} />;
}
