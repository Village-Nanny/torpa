'use client';

import React from 'react';
import { SegmentingProblem } from '@/src/types/segmenting';
import { SegmentingGameTemplate } from '../templates/segmenting-template';

interface SegmentingPageProps {
  problem: SegmentingProblem;
  onSubmit: (answer: string) => void;
}

export default function SegmentingPage({ problem, onSubmit }: SegmentingPageProps) {
  return <SegmentingGameTemplate problem={problem} onSubmit={onSubmit} />;
}
