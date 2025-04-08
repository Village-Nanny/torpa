'use client';

import React, { useEffect, useState } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { useAudio } from '@/src/hooks/use-audio';

export interface IntroWelcomeStepProps {
  character: Character.LULU;
  onAudioComplete?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

const AUDIO_PATH = '/assets/audio/intro/welcome.wav';

export function IntroWelcomeStep({ character, onAudioComplete, onError, autoPlay = true }: IntroWelcomeStepProps) {
  const [isNarrating, setIsNarrating] = useState(autoPlay);
  const { playAudio, stopAllAudioForComponent } = useAudio();

  // Play audio when component mounts or when triggered externally
  useEffect(() => {
    if (autoPlay) {
      handlePlayAudio();
    }

    return () => stopAllAudioForComponent();
  }, [autoPlay]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlayAudio = () => {
    setIsNarrating(true);
    playAudio(
      AUDIO_PATH,
      () => {
        setIsNarrating(false);
        if (onAudioComplete) onAudioComplete();
      },
      onError
    );
  };

  return (
    <div className="welcome-step">
      <div className="character-container">
        {character && (
          <img
            src={`/assets/images/characters/${character}.png`}
            alt={character}
            className={isNarrating ? 'speaking' : ''}
          />
        )}
      </div>
      <div className="content">
        <h2>Welcome!</h2>
        <p>Let's play a game! I'll help you learn how to blend sounds together.</p>
      </div>
    </div>
  );
}
