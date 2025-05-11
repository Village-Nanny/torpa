'use client';

import React from 'react';
import { SegmentingProblem } from '@/src/types/segmenting';
import { SegmentingGameTemplate } from '../templates/segmenting-template';

interface SegmentingPageProps {
  problem: SegmentingProblem;
  onSubmit: (answer: string) => void;
  onError?: (error: string) => void;
}

export default function SegmentingPage({ problem, onSubmit, onError }: SegmentingPageProps) {
  return <SegmentingGameTemplate problem={problem} onSubmit={onSubmit} onError={onError} />;
}
