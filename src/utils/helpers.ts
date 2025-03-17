export function stopAllAudio(): void {
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  try {
    interface WindowWithWebkit extends Window {
      webkitAudioContext?: typeof AudioContext;
    }

    const AudioContextClass = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;

    if (AudioContextClass) {
      const audioContext = new AudioContextClass();
      audioContext.suspend();
    }
  } catch (error) {
    console.error('Failed to suspend audio context:', error);
  }
}
