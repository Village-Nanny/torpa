'use client';

import React from 'react';
import { BlendingProblem } from '@/src/types/blending';
import { BlendingGameTemplate } from '../templates/blending-template';

interface BlendingPageProps {
  problem: BlendingProblem;
  onSubmit: (answer: string) => void;
  onError?: (error: string) => void;
}

export default function BlendingPage({ problem, onSubmit, onError }: BlendingPageProps) {
  return <BlendingGameTemplate problem={problem} onSubmit={onSubmit} onError={onError} />;
}
