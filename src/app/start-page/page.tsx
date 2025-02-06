'use client';

import React from 'react';
import { Header } from '@/src/components/ui/molecules/header';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import { Button } from '@/src/components/ui/atoms/button';
import Link from 'next/link';

export default function StartPage() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <DotPattern className="absolute inset-0 bg-green-600 text-gray-200" />

      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="space-y-8 md:space-y-12 text-center z-10 max-w-2xl px-4 mx-auto">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Hey Parents! 👋</h1>
          <div className="space-y-3 md:space-y-4">
            <p className="text-lg md:text-xl text-gray-100">
              Welcome to our interactive learning adventure! This game will help your child learn about money management
              in a fun way.
            </p>
            <p className="text-base md:text-lg text-gray-100">
              Once you click the button below, please hand the device to your child to begin their journey.
            </p>
          </div>
        </div>

        <Link href="/onboarding">
          <Button
            size="lg"
            className="w-full md:w-auto px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-8 text-base sm:text-lg md:text-xl font-bold text-green-600 hover:text-green-600 bg-white hover:bg-gray-100 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] md:hover:scale-105">
            <span className="block sm:hidden">Let&apos;s Begin!</span>
            <span className="hidden sm:block">Ready to Start? Hand Over to Your Child →</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
