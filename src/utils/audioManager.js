// Audio Manager for Ambient Music & Web Audio API Procedural SFX

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.bgMusicAudio = null;
    this.happyBirthdayLoop = null;
    this.autoplayInteractionHandler = null;
    this.isPlayingMusic = false;
    this.isMuted = false;
    this.volume = 0.5;
  }

  // Initialize Web Audio Context on first user gesture
  initContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  stopBackgroundLoop() {
    if (this.happyBirthdayLoop) {
      clearInterval(this.happyBirthdayLoop);
      this.happyBirthdayLoop = null;
    }
  }

  playTone(frequency, duration = 0.3) {
    if (!this.audioContext || this.isMuted) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.09, this.audioContext.currentTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.log('Tone playback error:', e);
    }
  }

  playHappyBirthdayLoop() {
    this.initContext();
    this.stopBackgroundLoop();

    const melody = [
      329.63, 392.0, 440.0, 493.88,
      440.0, 392.0, 349.23, 392.0,
      440.0, 523.25, 587.33, 523.25,
      493.88, 440.0, 392.0, 349.23,
      392.0, 440.0, 493.88, 587.33,
      523.25, 493.88, 440.0, 392.0,
      349.23, 392.0, 440.0, 493.88,
      523.25, 587.33
    ];
    let step = 0;

    this.happyBirthdayLoop = setInterval(() => {
      if (!this.isMuted) {
        const note = melody[step % melody.length];
        const duration = step % 4 === 0 ? 0.42 : 0.3;
        this.playTone(note, duration);
      }
      step += 1;
    }, 420);

    this.isPlayingMusic = true;
  }

  // Start background music
  startMusic(musicSrc) {
    this.initContext();

    if (musicSrc === 'happy-birthday') {
      this.playHappyBirthdayLoop();
      return;
    }

    this.stopBackgroundLoop();

    if (!this.bgMusicAudio && musicSrc) {
      this.bgMusicAudio = new Audio(musicSrc);
      this.bgMusicAudio.loop = true;
      this.bgMusicAudio.autoplay = true;
      this.bgMusicAudio.preload = 'auto';
      this.bgMusicAudio.volume = this.volume;
      this.bgMusicAudio.muted = this.isMuted;
    }

    if (this.bgMusicAudio && !this.isPlayingMusic) {
      const audio = this.bgMusicAudio;
      const playWithSound = () => {
        if (this.isMuted) return;
        audio.muted = false;
        audio.volume = this.volume;
        audio.play().then(() => {
          this.isPlayingMusic = true;
          if (this.autoplayInteractionHandler) {
            window.removeEventListener('pointerdown', this.autoplayInteractionHandler);
            window.removeEventListener('keydown', this.autoplayInteractionHandler);
            this.autoplayInteractionHandler = null;
          }
        }).catch(() => {
          audio.muted = true;
        });
      };

      const playMutedFallback = () => {
        audio.muted = true;
        audio.play().then(() => {
          this.isPlayingMusic = true;
        }).catch(() => {
          this.isPlayingMusic = false;
        });
      };

      this.autoplayInteractionHandler = playWithSound;
      window.addEventListener('pointerdown', playWithSound, { once: true });
      window.addEventListener('keydown', playWithSound, { once: true });

      const tryPlay = () => {
        audio.muted = this.isMuted;
        audio.play().then(() => {
          this.isPlayingMusic = true;
        }).catch(err => {
          console.log('Audio autoplay prevented by browser. Will play on interaction.', err);
          if (!this.isMuted) {
            playMutedFallback();
          }
        });
      };

      tryPlay();
      setTimeout(() => {
        if (audio.paused && !this.isMuted) {
          tryPlay();
        }
      }, 600);
    }
  }

  toggleMusic() {
    if (this.happyBirthdayLoop) {
      if (this.isPlayingMusic) {
        this.stopBackgroundLoop();
        this.isPlayingMusic = false;
      } else {
        this.playHappyBirthdayLoop();
      }
      return this.isPlayingMusic;
    }

    if (!this.bgMusicAudio) return;
    if (this.isPlayingMusic) {
      this.bgMusicAudio.pause();
      this.isPlayingMusic = false;
    } else {
      this.bgMusicAudio.play();
      this.isPlayingMusic = true;
    }
    return this.isPlayingMusic;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgMusicAudio) {
      this.bgMusicAudio.muted = this.isMuted;
      this.bgMusicAudio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.isMuted && this.happyBirthdayLoop) {
      this.stopBackgroundLoop();
      this.isPlayingMusic = false;
    } else if (!this.isMuted && this.happyBirthdayLoop === null && this.bgMusicAudio) {
      this.startMusic('happy-birthday');
    }
    return this.isMuted;
  }

  // Procedural Sound Effects via Web Audio API

  // 1. Soft Candle Blow Whoosh
  playBlowWhoosh() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;

    try {
      const ctx = this.audioContext;
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Pink noise synthesis for realistic wind/breath
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = b0 + b1 + b2;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.8);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch (e) {
      console.log("Audio SFX play error:", e);
    }
  }

  // 2. Chime / Slice Sound
  playSliceChime() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;

    try {
      const ctx = this.audioContext;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C E G C chord
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
      });
    } catch (e) {
      console.log("Chime SFX error:", e);
    }
  }

  // 3. Cute Heart Pop
  playHeartPop() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;

    try {
      const ctx = this.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.log("Pop SFX error:", e);
    }
  }
}

export const audioManager = new AudioManager();
