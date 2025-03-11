import Image from 'next/image';
import React from 'react';
import { BlendingProblem } from '@/src/types/blending';

interface BlendingPracticeStepProps {
  problem: BlendingProblem;
}

export function BlendingPracticeStep({ problem }: BlendingPracticeStepProps) {
  const correctImageName = problem.correctImagePath.split('/').pop()?.split('.')[0]?.toUpperCase() || 'WORD';
  const wrongImageName = problem.wrongImagePath.split('/').pop()?.split('.')[0]?.toUpperCase() || 'WORD';

  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Let&apos;s Practice! 🎯</h1>
      <div className="bg-white/20 p-8 rounded-xl">
        <p className="text-2xl md:text-4xl text-white font-bold mb-6">Look at these pictures:</p>
        <div className="flex justify-center gap-20">
          <div className="space-y-4">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
              <Image
                src={problem.correctImagePath}
                alt={`Picture of a ${correctImageName}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-2xl text-white font-bold">{correctImageName}</p>
          </div>
          <div className="space-y-4">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
              <Image
                src={problem.wrongImagePath}
                alt={`Picture of a ${wrongImageName}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-2xl text-white font-bold">{wrongImageName}</p>
          </div>
        </div>
        <p className="text-2xl md:text-3xl text-white font-bold mt-8">Listen to Lulu and choose the right picture!</p>
      </div>
    </div>
  );
}
