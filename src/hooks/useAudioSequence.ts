import { useState, useCallback, useRef, useEffect } from 'react';
import { useAudio } from '@/src/hooks/use-audio';

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
  currentStepIndex: number;
  isPlaying: boolean; // True only during actual audio playback
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
  const { playAudio } = useAudio();
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<AudioSequenceStatus>('idle');

  const timeoutRef = useRef<NodeJS.Timeout>();
  const audioRef = useRef<HTMLAudioElement | null>();
  const mountedRef = useRef(true);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = undefined;
    }
  }, []);

  const playStep = useCallback(
    async (index: number) => {
      if (!mountedRef.current) return;
      cleanup();

      if (index >= sequence.length) {
        setIsPlaying(false);
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

        audioRef.current = playAudio(
          item.path,
          () => {
            if (!mountedRef.current) return;
            timeoutRef.current = setTimeout(() => playStep(index + 1), item.postDelay || 0);
          },
          error => {
            if (!mountedRef.current) return;
            onError?.(error, index);
            setIsPlaying(false);
          }
        );

        if (audioRef.current) {
          setIsPlaying(true);
        } else {
          onError?.(`Failed to play: ${item.path}`, index);
          setIsPlaying(false);
        }
      };

      if (item.preDelay) {
        timeoutRef.current = setTimeout(playCurrentAudio, item.preDelay);
      } else {
        playCurrentAudio();
      }
    },
    [sequence, loop, initialDelay, onSequenceComplete, onError, cleanup, playAudio]
  );

  const play = useCallback(() => {
    if (!isPlaying) {
      cleanup();
      setCurrentStepIndex(-1);
      timeoutRef.current = setTimeout(() => playStep(0), initialDelay);
    }
  }, [isPlaying, initialDelay, playStep, cleanup]);

  const stop = useCallback(() => {
    cleanup();
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  }, [cleanup]);

  useEffect(() => {
    if (autoPlay) {
      play();
    }
  }, [autoPlay, play]);

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
    currentStepIndex,
    isPlaying,
    status,
  };
}
