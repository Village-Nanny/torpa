'use client';

import React, { useEffect, useState } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { useAudio } from '@/src/hooks/use-audio';

export interface IntroLetsStartStepProps {
  character: Character.LULU;
  onAudioComplete?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

const AUDIO_PATH = '/assets/audio/intro/lets-start.wav';

export function IntroLetsStartStep({ character, onAudioComplete, onError, autoPlay = true }: IntroLetsStartStepProps) {
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
    <div className="lets-start-step">
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
        <h2>Let's Start!</h2>
        <p>Ready? I'll show you how to play the game!</p>
        <div className="animation-container">
          {/* You could add some animation or illustration here */}
          <div className="start-animation">
            <span className="pulse-circle"></span>
            <span className="pulse-text">Let's Go!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
