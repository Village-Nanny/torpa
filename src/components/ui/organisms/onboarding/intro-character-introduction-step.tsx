'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Character } from '@/src/types/enums/characters.enum';
import { useAudio } from '@/src/hooks/use-audio';

export interface IntroCharacterIntroductionStepProps {
  onAudioComplete?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
}

// Audio sequence with information about which character to highlight
interface AudioSequenceItem {
  path: string;
  highlightCharacter: Character | null;
}

const AUDIO_SEQUENCE: AudioSequenceItem[] = [
  {
    path: '/assets/audio/intro/character-intro-start.wav', // "Let me introduce you to..."
    highlightCharacter: null,
  },
  {
    path: '/assets/audio/intro/character-lulu-intro.wav', // "This is Lulu..."
    highlightCharacter: Character.LULU,
  },
  {
    path: '/assets/audio/intro/character-francine-intro.wav', // "And this is Francine..."
    highlightCharacter: Character.FRANCINE,
  },
  {
    path: '/assets/audio/intro/character-intro-end.wav', // "They will help you learn..."
    highlightCharacter: null,
  },
];

export function IntroCharacterIntroductionStep({
  onAudioComplete,
  onError,
  autoPlay = true,
}: IntroCharacterIntroductionStepProps) {
  const [isNarrating, setIsNarrating] = useState(autoPlay);
  const [highlightedCharacter, setHighlightedCharacter] = useState<Character | null>(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const { playAudio, stopAllAudioForComponent } = useAudio();

  // Play the current audio in the sequence
  const playCurrentAudio = (index: number) => {
    if (index >= AUDIO_SEQUENCE.length) {
      // Sequence complete
      setIsNarrating(false);
      setHighlightedCharacter(null);
      if (onAudioComplete) onAudioComplete();
      return;
    }

    const currentAudio = AUDIO_SEQUENCE[index];
    setHighlightedCharacter(currentAudio.highlightCharacter);

    playAudio(
      currentAudio.path,
      () => {
        // When this audio segment finishes, move to the next one
        playCurrentAudio(index + 1);
      },
      error => {
        if (onError) onError(error);
        // Even if there's an error, try to continue with the next audio
        playCurrentAudio(index + 1);
      }
    );
  };

  // Start the audio sequence
  const startAudioSequence = () => {
    setIsNarrating(true);
    stopAllAudioForComponent();
    setHighlightedCharacter(null);
    playCurrentAudio(0);
  };

  // Play audio when component mounts
  useEffect(() => {
    if (autoPlay) {
      startAudioSequence();
    }

    return () => stopAllAudioForComponent();
  }, [autoPlay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="character-introduction-step">
      <h2 className="step-title">Meet Your Friends!</h2>

      <div className="characters-container">
        <div className={`character-wrapper ${highlightedCharacter === Character.LULU ? 'highlighted' : ''}`}>
          <img
            src={`/assets/images/characters/${Character.LULU}.png`}
            alt="Lulu"
            className={isNarrating && highlightedCharacter === Character.LULU ? 'speaking' : ''}
          />
          <div className="character-name">Lulu</div>
        </div>

        <div className={`character-wrapper ${highlightedCharacter === Character.FRANCINE ? 'highlighted' : ''}`}>
          <img
            src={`/assets/images/characters/${Character.FRANCINE}.png`}
            alt="Francine"
            className={isNarrating && highlightedCharacter === Character.FRANCINE ? 'speaking' : ''}
          />
          <div className="character-name">Francine</div>
        </div>
      </div>

      <div className="content">
        <p>Lulu and Francine will help you learn how to blend sounds into words!</p>
      </div>

      {/* Only show replay button when narration is complete */}
      {!isNarrating && (
        <button className="replay-button" onClick={startAudioSequence}>
          🔄 Replay
        </button>
      )}
    </div>
  );
}
