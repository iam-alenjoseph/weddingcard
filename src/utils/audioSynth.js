// Lush Ambient Wedding Synthesizer (Pachelbel's Canon in D & Romantic Arpeggios)
// Built with Web Audio API using multi-harmonics, warmth filtering & ambient reverb sustain.

class AudioSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filterNode = null;
    this.delayNode = null;
    this.feedbackGain = null;
    this.isPlaying = false;
    this.timer = null;
    this.activeNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    
    if (this.ctx && !this.masterGain) {
      // Master Gain for smooth volume control
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      // Lowpass Filter for warm acoustic piano/harp timbre
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);

      // Ambient Delay/Reverb Tail Node
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      // Connect delay loop
      this.delayNode.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode);

      // Connect Signal Chain: Nodes -> Filter -> Master & Delay -> Output
      this.filterNode.connect(this.masterGain);
      this.filterNode.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // Play a warm composite acoustic note with overtones & envelope
  playTone(freq, gainVal = 0.12, duration = 3.5, octaveSub = false) {
    if (!this.ctx || !this.isPlaying || this.ctx.state !== 'running') return;
    
    try {
      const now = this.ctx.currentTime;

      // Fundamental Oscillator
      const osc1 = this.ctx.createOscillator();
      osc1.type = octaveSub ? 'triangle' : 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Warm Soft OverTone Oscillator
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.002, now); // Slightly detuned overtone

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(gainVal, now + 0.06); // Soft attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Long romantic decay

      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(gainVal * 0.25, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

      osc1.connect(noteGain);
      osc2.connect(overtoneGain);
      overtoneGain.connect(noteGain);

      if (this.filterNode) {
        noteGain.connect(this.filterNode);
      } else if (this.masterGain) {
        noteGain.connect(this.masterGain);
      }

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      this.activeNodes.push(osc1, osc2);
      osc1.onended = () => {
        this.activeNodes = this.activeNodes.filter(n => n !== osc1 && n !== osc2);
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
      this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
    }

    // Pachelbel's Canon in D Chord Sequence (D - A - Bm - F#m - G - D - G - A)
    const canonSequence = [
      // 1. D Major (D3 Bass + D4/F#4/A4/D5 Arpeggio)
      { bass: 146.83, arpeggio: [293.66, 369.99, 440.00, 587.33] },
      // 2. A Major (A2 Bass + C#4/E4/A4/C#5 Arpeggio)
      { bass: 110.00, arpeggio: [277.18, 329.63, 440.00, 554.37] },
      // 3. B Minor (B2 Bass + D4/F#4/B4/D5 Arpeggio)
      { bass: 123.47, arpeggio: [293.66, 369.99, 493.88, 587.33] },
      // 4. F# Minor (F#2 Bass + C#4/F#4/A4/C#5 Arpeggio)
      { bass: 92.50,  arpeggio: [277.18, 369.99, 440.00, 554.37] },
      // 5. G Major (G2 Bass + D4/G4/B4/D5 Arpeggio)
      { bass: 98.00,  arpeggio: [293.66, 392.00, 493.88, 587.33] },
      // 6. D Major (D2 Bass + D4/F#4/A4/F#5 Arpeggio)
      { bass: 73.42,  arpeggio: [293.66, 369.99, 440.00, 739.99] },
      // 7. G Major (G2 Bass + D4/G4/B4/G5 Arpeggio)
      { bass: 98.00,  arpeggio: [293.66, 392.00, 493.88, 783.99] },
      // 8. A Major (A2 Bass + E4/A4/C#5/E5 Arpeggio)
      { bass: 110.00, arpeggio: [329.63, 440.00, 554.37, 659.25] },
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const loop = () => {
      if (!this.isPlaying) return;

      const currentChord = canonSequence[chordIdx];

      // Play bass root on step 0
      if (noteIdx === 0) {
        this.playTone(currentChord.bass, 0.15, 4.5, true);
      }

      // Play arpeggio note
      const arpNote = currentChord.arpeggio[noteIdx];
      this.playTone(arpNote, 0.10, 3.2, false);

      noteIdx++;
      if (noteIdx >= currentChord.arpeggio.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % canonSequence.length;
      }

      // Smooth rhythmic tempo (~420ms per arpeggio note)
      this.timer = setTimeout(loop, 420);
    };

    loop();
  }

  stopMelody() {
    this.isPlaying = false;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

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
