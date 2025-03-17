import { useCallback, useEffect, useRef } from 'react';

const globalAudioRegistry = new Set<HTMLAudioElement>();

const stopAudio = (audio: HTMLAudioElement): void => {
  try {
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';
    audio.load();
  } catch (e) {
    // Ignore errors
  }
};

export const stopAllAudio = (): void => {
  // 1. Stop all tracked Audio instances
  globalAudioRegistry.forEach(stopAudio);
  globalAudioRegistry.clear();

  // 2. Stop all HTML audio elements in the DOM
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(stopAudio);

  // 3. Handle dynamically created Audio objects
  try {
    // Create and suspend AudioContext
    interface WindowWithWebkit extends Window {
      webkitAudioContext?: typeof AudioContext;
    }
    const AudioContextClass = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;
    if (AudioContextClass) {
      const audioContext = new AudioContextClass();
      audioContext.suspend();
      audioContext.close().catch(() => {});
    }

    const originalAudio = window.Audio;
    window.Audio = (() => ({
      play: () => Promise.resolve(),
      pause: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof HTMLAudioElement;

    setTimeout(() => (window.Audio = originalAudio), 50);
  } catch (error) {
    console.error('Failed audio context handling:', error);
  }
};

export function useAudio() {
  const audioInstances = useRef<Set<HTMLAudioElement>>(new Set());

  const stopAllAudioForComponent = useCallback(() => {
    audioInstances.current.forEach(audio => {
      stopAudio(audio);
      globalAudioRegistry.delete(audio);
    });
    audioInstances.current.clear();
  }, []);

  useEffect(() => {
    return () => stopAllAudioForComponent();
  }, [stopAllAudioForComponent]);

  const playAudio = useCallback((audioPath: string, onEnded?: () => void, onError?: (error: string) => void) => {
    try {
      const audio = new Audio(audioPath);

      audioInstances.current.add(audio);
      globalAudioRegistry.add(audio);

      const handleEnded = () => {
        if (onEnded) onEnded();
        audio.removeEventListener('ended', handleEnded);
        audioInstances.current.delete(audio);
        globalAudioRegistry.delete(audio);
      };
      audio.addEventListener('ended', handleEnded);

      let intentionalPause = false;
      const originalPause = audio.pause;
      audio.pause = function () {
        intentionalPause = true;
        return originalPause.call(this);
      };

      audio.play().catch(error => {
        if (intentionalPause && error.message?.includes('interrupted by a call to pause()')) {
          if (onEnded) onEnded();
        } else if (onError) {
          onError(`Audio error for file "${audioPath}": ${error.message}`);
        }

        audioInstances.current.delete(audio);
        globalAudioRegistry.delete(audio);
      });

      return audio;
    } catch (error) {
      if (onError)
        onError(
          `Audio initialization error for file "${audioPath}": ${error instanceof Error ? error.message : String(error)}`
        );
      return null;
    }
  }, []);

  return { playAudio, stopAllAudioForComponent, stopAllAudio };
}
