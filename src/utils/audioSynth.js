// Ambient Wedding Piano Synthesizer using Web Audio API
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.timer = null;
    this.activeNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    
    // Always recreate masterGain when starting
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  playNote(freq, duration = 3.0, type = 'sine') {
    if (!this.ctx || !this.isPlaying || this.ctx.state !== 'running') return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      if (this.masterGain) {
        gain.connect(this.masterGain);
      }

      osc.start(now);
      osc.stop(now + duration);

      // Track active node for immediate cancellation
      this.activeNodes.push(osc);
      osc.onended = () => {
        this.activeNodes = this.activeNodes.filter(n => n !== osc);
      };
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  async startMelody() {
    this.init();
    
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    
    this.isPlaying = true;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    }

    const melody = [
      { main: 523.25, sub: 261.63 }, // C5 + C4
      { main: 659.25, sub: 329.63 }, // E5 + E4
      { main: 783.99, sub: 392.00 }, // G5 + G4
      { main: 1046.50, sub: 523.25 }, // C6 + C5
      { main: 880.00, sub: 440.00 }, // A5 + A4
      { main: 659.25, sub: 329.63 }, // E5 + E4
      { main: 698.46, sub: 349.23 }, // F5 + F4
      { main: 880.00, sub: 440.00 }, // A5 + A4
      { main: 587.33, sub: 293.66 }, // D5 + D4
      { main: 783.99, sub: 392.00 }, // G5 + G4
      { main: 987.77, sub: 493.88 }, // B5 + B4
      { main: 659.25, sub: 329.63 }, // E5 + E4
    ];

    let index = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      
      const note = melody[index];
      this.playNote(note.main, 3.2, 'sine');
      this.playNote(note.sub, 4.0, 'triangle');

      index = (index + 1) % melody.length;
      this.timer = setTimeout(loop, 800);
    };

    loop();
  }

  stopMelody() {
    this.isPlaying = false;

    // 1. Clear timeout loop immediately
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // 2. Stop and disconnect all active playing oscillator nodes
    if (this.activeNodes && this.activeNodes.length > 0) {
      this.activeNodes.forEach(node => {
        try {
          node.stop(0);
          node.disconnect();
        } catch (err) {
          void err;
        }
      });
      this.activeNodes = [];
    }

    // 3. Mute & suspend audio context immediately
    if (this.ctx) {
      try {
        if (this.masterGain) {
          this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
          this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        }
        this.ctx.suspend();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async toggle() {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      await this.startMelody();
      return true;
    }
  }
}

export const weddingAudio = new AudioSynth();
