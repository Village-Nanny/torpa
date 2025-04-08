'use client';

import React, { useEffect, useState } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { useAudio } from '@/src/hooks/use-audio';

export interface IntroExplanationStepProps {
  character: Character.FRANCINE;
  onAudioComplete?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

const AUDIO_PATH = '/assets/audio/intro/TORPA Intro/TORPA Intro- “Hi Friend”.m4a';

export function IntroExplanationStep({
  character,
  onAudioComplete,
  onError,
  autoPlay = true,
}: IntroExplanationStepProps) {
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
    <div className="explanation-step">
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
        <h2>How It Works</h2>
        <p>I'll say a word in parts, and you'll choose the picture that matches what I said!</p>
        <div className="example-container">
          <div className="sound-example">/d/ /oo/ /r/</div>
          <div className="image-examples">
            <img src="/assets/images/pot.png" alt="pot" />
            <img src="/assets/images/door.png" alt="door" className="correct" />
          </div>
        </div>
      </div>
    </div>
  );
}
