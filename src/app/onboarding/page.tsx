'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import { Button } from '@/src/components/ui/atoms/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Character } from '@/src/types/enums/characters.enum';
import { WelcomeStep } from '@/src/components/ui/organisms/onboarding/welcome-step';
import { GameExplanationStep } from '@/src/components/ui/organisms/onboarding/game-explanation-step';
import { IntroductionStep } from '@/src/components/ui/organisms/onboarding/introduction-step';
import { PracticeStep } from '@/src/components/ui/organisms/onboarding/practice-step';
import { ListeningStep } from '@/src/components/ui/organisms/onboarding/listening-step';
import { SecondListeningStep } from '@/src/components/ui/organisms/onboarding/second-listening-step';
import { FinalStep } from '@/src/components/ui/organisms/onboarding/final-step';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [canReplay, setCanReplay] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'retry' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudioWithAnimation = useCallback((filename: string, character: Character, nextAction?: () => void) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveCharacter(character);
    audioRef.current = new Audio(`/assets/audio/${filename}.wav`);
    audioRef.current.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    audioRef.current.onended = () => {
      setActiveCharacter(null);
      if (nextAction) {
        nextAction();
      } else {
        setCanReplay(true);
      }
    };
  }, []);

  const playSequence = useCallback(() => {
    setCanReplay(false);
    playAudioWithAnimation('pot', Character.LULU, () => {
      setTimeout(() => {
        playAudioWithAnimation('gum', Character.FRANCINE, () => {
          setCanReplay(true);
        });
      }, 1000);
    });
  }, [playAudioWithAnimation]);

  useEffect(() => {
    if (step === 5) {
      playSequence();
    }
  }, [step, playSequence]);

  const handleNextStep = () => {
    if (step < 7) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChoice = (character: Character) => {
    if (!canReplay) return;

    if (character === Character.LULU) {
      setFeedback('success');
    } else {
      setFeedback('retry');
      setTimeout(() => {
        setFeedback(null);
        playSequence();
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <GameExplanationStep />;
      case 3:
        return <IntroductionStep />;
      case 4:
        return <PracticeStep />;
      case 5:
        return (
          <ListeningStep
            activeCharacter={activeCharacter}
            canReplay={canReplay}
            feedback={feedback}
            handleChoice={handleChoice}
            playSequence={playSequence}
          />
        );
      case 6:
        return (
          <SecondListeningStep
            activeCharacter={activeCharacter}
            canReplay={canReplay}
            playAudioWithAnimation={playAudioWithAnimation}
          />
        );
      case 7:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans items-center justify-center overflow-hidden">
      <DotPattern className="absolute inset-0 bg-green-600 text-gray-200" />

      <div className="z-10 max-w-3xl px-4 mx-auto">
        {renderStep()}

        {step < 5 && (
          <div className="mt-12 flex justify-center gap-8">
            {step > 1 && (
              <Button
                variant="ghost"
                size="lg"
                onClick={handlePrevStep}
                className="w-20 h-20 md:w-24 md:h-24 p-0 text-white bg-green-500 hover:bg-green-400 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
                <ChevronLeft className="h-10 w-10 md:h-12 md:w-12" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="lg"
              onClick={handleNextStep}
              className="w-20 h-20 md:w-24 md:h-24 p-0 text-white bg-green-500 hover:bg-green-400 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
              <ChevronRight className="h-10 w-10 md:h-12 md:w-12" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
