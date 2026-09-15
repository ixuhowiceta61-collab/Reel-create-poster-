/**
 * Vintage Audio Synthesizer using Web Audio API
 * Generates offline ambient melodies, rain, vinyl crackle, and piano notes
 * with direct AudioNode output and MediaStreamDestination routing for video recording.
 */

export type AudioTrackType = 'rain-piano' | 'vinyl-acoustic' | 'ambient-flute' | 'typewriter' | 'none';

export interface AudioEngine {
  start: () => void;
  stop: () => void;
  getStreamDestination: () => MediaStreamAudioDestinationNode | null;
  getAudioContext: () => AudioContext | null;
}

export function createVintageAudioEngine(track: AudioTrackType): AudioEngine {
  if (track === 'none' || typeof window === 'undefined') {
    return {
      start: () => {},
      stop: () => {},
      getStreamDestination: () => null,
      getAudioContext: () => null,
    };
  }

  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) {
    return {
      start: () => {},
      stop: () => {},
      getStreamDestination: () => null,
      getAudioContext: () => null,
    };
  }

  let ctx: AudioContext | null = null;
  let isPlaying = false;
  let loopInterval: number | null = null;
  let noiseNode: AudioNode | null = null;
  let destinationNode: MediaStreamAudioDestinationNode | null = null;

  const initContext = () => {
    if (!ctx) {
      ctx = new AudioCtx();
      destinationNode = ctx.createMediaStreamDestination();
    }
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  };

  const playChimeNote = (freq: number, delaySec: number, durationSec: number = 2.0) => {
    if (!ctx || !isPlaying) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delaySec);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime + delaySec);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + delaySec + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delaySec + durationSec);

      // Connect to speakers and video stream
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (destinationNode) {
        gain.connect(destinationNode);
      }

      osc.start(ctx.currentTime + delaySec);
      osc.stop(ctx.currentTime + delaySec + durationSec);
    } catch {
      // Audio context might be closing
    }
  };

  const startVinylCrackle = () => {
    if (!ctx) return;
    // Buffer for gentle vinyl crackle / rain noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Pink/Brownish noise filter
      const white = Math.random() * 2 - 1;
      data[i] = (Math.random() > 0.995 ? (Math.random() * 0.4 - 0.2) : 0) + white * 0.015;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = track === 'rain-piano' ? 900 : 1500;
    filter.Q.value = 1.0;

    const gain = ctx.createGain();
    gain.gain.value = 0.08;

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    if (destinationNode) {
      gain.connect(destinationNode);
    }

    noiseSource.start();
    noiseNode = noiseSource;
  };

  const scheduleMelodyLoop = () => {
    if (!ctx || !isPlaying) return;

    // Romantic Bengali pentatonic scale frequencies (F major pentatonic / Bhupali-ish)
    // F4 (349), G4 (392), A4 (440), C5 (523), D5 (587), F5 (698)
    const notes = [349.23, 392.0, 440.0, 523.25, 587.33, 440.0, 392.0];
    const delays = [0, 0.8, 1.6, 2.4, 3.2, 4.2, 5.0];

    notes.forEach((freq, idx) => {
      playChimeNote(freq, delays[idx], 1.8);
    });
  };

  return {
    start: () => {
      try {
        initContext();
        isPlaying = true;
        startVinylCrackle();
        scheduleMelodyLoop();

        // Repeat melody every 6 seconds
        loopInterval = window.setInterval(() => {
          if (isPlaying) {
            scheduleMelodyLoop();
          }
        }, 6200);
      } catch (err) {
        console.warn('Audio start failed', err);
      }
    },
    stop: () => {
      isPlaying = false;
      if (loopInterval) {
        clearInterval(loopInterval);
        loopInterval = null;
      }
      try {
        if (noiseNode) {
          (noiseNode as AudioScheduledSourceNode).stop();
          noiseNode = null;
        }
        if (ctx) {
          ctx.close();
          ctx = null;
        }
      } catch {
        // Ignore close errors
      }
    },
    getStreamDestination: () => destinationNode,
    getAudioContext: () => ctx,
  };
}
