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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mountedRef = useRef(true);
  const hasAutoPlayedRef = useRef(false);

  // Debug logging helper
  const debugLog = useCallback((message: string, ...args: any[]) => {
    console.log(`[useAudioSequence DEBUG] ${message}`, ...args);
  }, []);

  const cleanup = useCallback(() => {
    debugLog('Cleaning up: Clearing timeout and audio references.');
    if (timeoutRef.current) {
      debugLog('Clearing timeout:', timeoutRef.current);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    if (audioRef.current) {
      debugLog('Stopping audio:', audioRef.current.src);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setStatus('stopped');
  }, [debugLog]);

  const playStep = useCallback(
    (index: number) => {
      debugLog('Entering playStep with index:', index);
      if (!mountedRef.current) {
        debugLog('Component is unmounted; aborting playStep.');
        return;
      }
      cleanup();

      if (index >= sequence.length) {
        debugLog('Reached end of sequence at index:', index);
        setIsPlaying(false);
        setStatus('finished');
        if (loop) {
          debugLog('Loop enabled; scheduling restart after initialDelay:', initialDelay);
          timeoutRef.current = setTimeout(() => {
            debugLog('Restarting sequence from step 0.');
            playStep(0);
          }, initialDelay);
        } else {
          debugLog('Sequence complete; calling onSequenceComplete callback.');
          onSequenceComplete?.();
        }
        return;
      }

      const item = sequence[index];
      debugLog(`Playing step ${index} for audio path: ${item.path}`);
      setCurrentStepIndex(index);

      const playCurrentAudio = () => {
        if (!mountedRef.current) {
          debugLog('Component is unmounted during playCurrentAudio; aborting.');
          return;
        }

        debugLog('Creating new Audio object for:', item.path);
        const audio = new Audio(item.path);
        audioRef.current = audio;

        audio.onloadedmetadata = () => {
          debugLog('onloadedmetadata fired for:', item.path);
          audio
            .play()
            .then(() => {
              debugLog('Playback started successfully for:', item.path);
              setIsPlaying(true);
              setStatus('playing');
            })
            .catch(error => {
              debugLog('Playback error for:', item.path, error);
              console.error('Playback error:', error);
              onError?.(error.message, index);
              setStatus('error');
            });
        };

        audio.onended = () => {
          debugLog('Audio ended for:', item.path);
          if (!mountedRef.current) {
            debugLog('Component unmounted on audio end; skipping next step.');
            return;
          }
          timeoutRef.current = setTimeout(() => {
            debugLog('Advancing to next step after postDelay:', item.postDelay || 0);
            playStep(index + 1);
          }, item.postDelay || 0);
        };

        audio.onerror = () => {
          const errorMsg = `Failed to load audio: ${item.path}`;
          debugLog('Audio error event for:', item.path, errorMsg);
          console.error(errorMsg);
          onError?.(errorMsg, index);
          setStatus('error');
        };
      };

      if (item.preDelay && item.preDelay > 0) {
        debugLog('Pre-delay detected for step', index, 'with delay:', item.preDelay);
        setStatus('delaying');
        timeoutRef.current = setTimeout(playCurrentAudio, item.preDelay);
      } else {
        playCurrentAudio();
      }
    },
    [sequence, loop, initialDelay, onSequenceComplete, onError, cleanup, debugLog]
  );

  const play = useCallback(() => {
    debugLog('Starting playback sequence.');
    cleanup();
    setCurrentStepIndex(-1);
    setStatus('delaying');

    if (initialDelay > 0) {
      debugLog('Initial delay of', initialDelay, 'ms detected. Scheduling playStep(0).');
      timeoutRef.current = setTimeout(() => {
        debugLog('Initial delay complete; starting sequence at step 0.');
        playStep(0);
      }, initialDelay);
    } else {
      playStep(0);
    }
  }, [initialDelay, playStep, cleanup, debugLog]);

  const stop = useCallback(() => {
    debugLog('Stop called; stopping sequence playback.');
    cleanup();
    setCurrentStepIndex(-1);
    setStatus('stopped');
  }, [cleanup, debugLog]);

  const reset = useCallback(() => {
    debugLog('Reset called; resetting autoPlay flag and stopping playback.');
    hasAutoPlayedRef.current = false;
    stop();
  }, [stop, debugLog]);

  useEffect(() => {
    debugLog(
      'useEffect: Checking autoPlay condition - autoPlay:',
      autoPlay,
      'hasAutoPlayed:',
      hasAutoPlayedRef.current,
      'sequence length:',
      sequence.length
    );
    if (autoPlay && !hasAutoPlayedRef.current && sequence.length > 0) {
      hasAutoPlayedRef.current = true;
      debugLog('AutoPlay is enabled and sequence exists; initiating play().');
      play();
    }
  }, [autoPlay, play, sequence, debugLog]);

  useEffect(() => {
    debugLog('Component mounted.');
    mountedRef.current = true;
    return () => {
      debugLog('Component unmounted; performing cleanup.');
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup, debugLog]);

  debugLog('Returning from useAudioSequence', { currentStepIndex, isPlaying, status });

  return {
    play,
    stop,
    reset,
    currentStepIndex,
    isPlaying,
    status,
  };
}
