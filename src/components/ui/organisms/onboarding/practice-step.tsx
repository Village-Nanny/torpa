import Image from 'next/image';
import React from 'react';

export function PracticeStep() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">Let&apos;s Practice! 🎯</h1>
      <div className="bg-white/20 p-8 rounded-xl">
        <p className="text-2xl md:text-4xl text-white font-bold mb-6">This is a POT</p>
        <div className="relative w-40 h-40 md:w-60 md:h-60 mx-auto">
          <Image src="/assets/images/pot.png" alt="Picture of a pot" fill className="object-contain" priority />
        </div>
        <p className="text-3xl md:text-5xl text-white font-extrabold mt-6">POT</p>
      </div>
    </div>
  );
}
