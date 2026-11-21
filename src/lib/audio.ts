// Gentle acoustic chime synthesis using the Web Audio API
// Emulates the 528 Hz solfeggio harmonic chime used as the canine "hunt" cue

export function playChimeCue() {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Frequencies: 528 Hz (fundamental) + 1056 Hz (gentle harmonic octave) + 1584 Hz (sparkle harmonic)
    const tones = [
      { freq: 528, gain: 0.18, duration: 1.8 },
      { freq: 1056, gain: 0.08, duration: 1.4 },
      { freq: 1584, gain: 0.03, duration: 0.9 },
    ];

    tones.forEach(({ freq, gain, duration }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gain, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });
  } catch (e) {
    console.debug('Web audio not allowed or failed:', e);
  }
}
