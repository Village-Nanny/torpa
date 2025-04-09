import { useState, useCallback, useRef, useEffect } from 'react';

export interface AudioSequenceItem {
  path: string;
  preDelay?: number;
  postDelay?: number;
}

interface UseAudioSequenceProps {
  sequence: AudioSequenceItem[];
  onSequenceComplete?: () => void;
  onError?: (error: string, stepIndex: number) => void;
  autoPlay?: boolean;
  initialDelay?: number;
  loop?: boolean;
}

type AudioSequenceStatus = 'idle' | 'delaying' | 'playing' | 'finished' | 'stopped' | 'error';

interface UseAudioSequenceReturn {
  play: () => void;
  stop: () => void;
  reset: () => void;
  currentStepIndex: number;
  isPlaying: boolean;
  status: AudioSequenceStatus;
}

export function useAudioSequence({
  sequence,
  onSequenceComplete,
  onError,
  autoPlay = false,
  initialDelay = 0,
  loop = false,
}: UseAudioSequenceProps): UseAudioSequenceReturn {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<AudioSequenceStatus>('idle');

  const timeoutRef = useRef<NodeJS.Timeout>();
  const audioRef = useRef<HTMLAudioElement | null>();
  const mountedRef = useRef(true);
  const hasAutoPlayedRef = useRef(false);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setStatus('stopped');
  }, []);

  const playStep = useCallback(
    (index: number) => {
      if (!mountedRef.current) return;
      cleanup();

      if (index >= sequence.length) {
        setIsPlaying(false);
        setStatus('finished');
        if (loop) {
          timeoutRef.current = setTimeout(() => playStep(0), initialDelay);
        } else {
          onSequenceComplete?.();
        }
        return;
      }

      const item = sequence[index];
      setCurrentStepIndex(index);

      const playCurrentAudio = () => {
        if (!mountedRef.current) return;

        const audio = new Audio(item.path);
        audioRef.current = audio;

        audio.onloadedmetadata = () => {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              setStatus('playing');
            })
            .catch(error => {
              console.error('Playback error:', error);
              onError?.(error.message, index);
              setStatus('error');
            });
        };

        audio.onended = () => {
          if (!mountedRef.current) return;
          timeoutRef.current = setTimeout(() => playStep(index + 1), item.postDelay || 0);
        };

        audio.onerror = () => {
          const error = `Failed to load: ${item.path}`;
          console.error(error);
          onError?.(error, index);
          setStatus('error');
        };
      };

      if (item.preDelay && item.preDelay > 0) {
        setStatus('delaying');
        timeoutRef.current = setTimeout(playCurrentAudio, item.preDelay);
      } else {
        playCurrentAudio();
      }
    },
    [sequence, loop, initialDelay, onSequenceComplete, onError, cleanup]
  );

  const play = useCallback(() => {
    cleanup();
    setCurrentStepIndex(-1);
    setStatus('delaying');

    if (initialDelay > 0) {
      timeoutRef.current = setTimeout(() => playStep(0), initialDelay);
    } else {
      playStep(0);
    }
  }, [initialDelay, playStep, cleanup]);

  const stop = useCallback(() => {
    cleanup();
    setCurrentStepIndex(-1);
    setStatus('stopped');
  }, [cleanup]);

  const reset = useCallback(() => {
    hasAutoPlayedRef.current = false;
    stop();
  }, [stop]);

  useEffect(() => {
    if (autoPlay && !hasAutoPlayedRef.current && sequence.length > 0) {
      hasAutoPlayedRef.current = true;
      play();
    }
  }, [autoPlay, play, sequence]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  return {
    play,
    stop,
    reset,
    currentStepIndex,
    isPlaying,
    status,
  };
}
