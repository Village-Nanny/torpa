// Create a global registry to track all audio instances
// This will allow us to access them from anywhere
const globalAudioRegistry = new Set<HTMLAudioElement>();

// Add a function to register audio instances
export function registerAudio(audio: HTMLAudioElement): void {
  globalAudioRegistry.add(audio);
}

// Add a function to unregister audio instances
export function unregisterAudio(audio: HTMLAudioElement): void {
  globalAudioRegistry.delete(audio);
}
