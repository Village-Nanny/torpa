import Image from 'next/image';
import React from 'react';

export function IntroductionStep() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Look at This! 👀</h1>
      <div className="bg-white/20 p-8 rounded-xl">
        <div className="relative w-40 h-40 md:w-60 md:h-60 mx-auto">
          <Image src="/assets/images/pot.png" alt="Picture of a pot" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}
