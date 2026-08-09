class SoundEngine {
  constructor() {
    this.ctx = null;
    this.musicInterval = null;
    this.musicMuted = true; // start muted, let user activate it!
    this.musicState = 'menu'; // 'menu', 'question', 'victory'
  }

  init() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn("AudioContext init warning:", e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        const p = this.ctx.resume();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch (e) {}
    }
    if (!this.musicInterval) {
      this.startMusic();
    }
  }

  startMusic() {
    let step = 0;
    const tempo = 400; // slightly faster beat
    const chords = [
      [130.81, 196.00, 261.63, 329.63], // C, G, c, e
      [164.81, 246.94, 329.63, 392.00], // E, B, e, g
      [174.61, 261.63, 349.23, 440.00], // F, c, f, a
      [196.00, 293.66, 392.00, 493.88]  // G, d, g, b
    ];
    
    this.musicInterval = setInterval(() => {
      if (this.musicMuted || !this.ctx || this.ctx.state === 'suspended') return;
      
      const now = this.ctx.currentTime;
      let chordIndex = Math.floor(step / 16) % chords.length;
      let currentChord = chords[chordIndex];
      
      // 1. Deep Bass Drone (on beat 0 of every bar, i.e. step % 8 === 0)
      if (step % 8 === 0) {
        currentChord.forEach((freq, idx) => {
          if (idx > 1) return; // only play the lowest two notes for the bass drone
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'triangle'; // warmer than sine
          osc.frequency.setValueAtTime(freq / 2, now); // deep bass
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.linearRampToValueAtTime(0.02, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
          osc.start(now);
          osc.stop(now + 3.2);
        });
      }
      
      // 2. State-Specific Sounds
      if (this.musicState === 'question') {
        // Tension heartbeat pulse (on beat)
        if (step % 2 === 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(step % 4 === 0 ? 65 : 52, now);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
          osc.start(now);
          osc.stop(now + 0.18);
        }
        
        // High ticking clock sound (every step)
        const tick = this.ctx.createOscillator();
        const tickGain = this.ctx.createGain();
        tick.connect(tickGain);
        tickGain.connect(this.ctx.destination);
        tick.type = 'sine';
        tick.frequency.setValueAtTime(3000, now);
        tickGain.gain.setValueAtTime(0.0015, now);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        tick.start(now);
        tick.stop(now + 0.03);

        // Ambient tension notes (every 4 steps)
        if (step % 4 === 2) {
          const tensionNotes = [220.00, 233.08, 277.18, 311.13];
          const freq = tensionNotes[Math.floor(step / 4) % tensionNotes.length];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.006, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.start(now);
          osc.stop(now + 1.2);
        }
      } else if (this.musicState === 'victory') {
        // Uplifting celebratory arpeggio loop (beat-synced instead of random)
        const victoryMelody = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25, 659.25, 783.99];
        const freq = victoryMelody[step % victoryMelody.length];
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Add a slight vibrato
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 6; // 6 Hz vibrato
        lfoGain.gain.value = 5; // pitch shift deviation
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        
        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 0.35);
        osc.stop(now + 0.35);
        
        // Add a soft kick on beat
        if (step % 4 === 0) {
          const kick = this.ctx.createOscillator();
          const kickGain = this.ctx.createGain();
          kick.connect(kickGain);
          kickGain.connect(this.ctx.destination);
          kick.type = 'sine';
          kick.frequency.setValueAtTime(120, now);
          kick.frequency.exponentialRampToValueAtTime(40, now + 0.15);
          kickGain.gain.setValueAtTime(0.06, now);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
          kick.start(now);
          kick.stop(now + 0.15);
        }
      } else {
        // Menu arpeggio
        if (step % 2 === 0) {
          const notes = currentChord;
          const freq = notes[Math.floor(step / 2) % notes.length] * 1.5;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.006, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.start(now);
          osc.stop(now + 1.2);
        }
        
        // Shaker on weak beats
        if (step % 4 === 2) {
          const hihat = this.ctx.createOscillator();
          const hihatGain = this.ctx.createGain();
          hihat.connect(hihatGain);
          hihatGain.connect(this.ctx.destination);
          hihat.type = 'sine';
          hihat.frequency.setValueAtTime(5000, now);
          hihatGain.gain.setValueAtTime(0.001, now);
          hihatGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
          hihat.start(now);
          hihat.stop(now + 0.05);
        }
      }
      
      step++;
    }, tempo);
  }

  setMusicState(state) {
    this.musicState = state;
  }

  playClick() {
    try {
      this.init();
      if (!this.ctx || typeof this.ctx.createOscillator !== 'function') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx || typeof this.ctx.createOscillator !== 'function') return;
      const now = this.ctx.currentTime;
      const playNote = (freq, delay, dur) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + delay);
          gain.gain.setValueAtTime(0.08, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
          osc.start(now + delay);
          osc.stop(now + delay + dur);
        } catch(e) {}
      };
      playNote(261.63, 0, 0.15); 
      playNote(329.63, 0.08, 0.15); 
      playNote(392.00, 0.16, 0.15); 
      playNote(523.25, 0.24, 0.3); 
    } catch(e) {}
  }

  playError() {
    try {
      this.init();
      if (!this.ctx || typeof this.ctx.createOscillator !== 'function') return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.linearRampToValueAtTime(100, now + 0.4);
      osc2.frequency.setValueAtTime(185, now);
      osc2.frequency.linearRampToValueAtTime(105, now + 0.4);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.start();
      osc2.start();
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch(e) {}
  }

  playJoker() {
    try {
      this.init();
      if (!this.ctx || typeof this.ctx.createOscillator !== 'function') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start();
      osc.stop(now + 0.35);
    } catch(e) {}
  }

  playRescue() {
    try {
      this.init();
      if (!this.ctx || typeof this.ctx.createOscillator !== 'function') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start();
      osc.stop(now + 0.35);
    } catch(e) {}
  }

  playTickTock() {
    try {
      this.init();
      if (!this.ctx || typeof this.ctx.createOscillator !== 'function') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start();
      osc.stop(now + 0.04);
    } catch(e) {}
  }

  playBuzzer() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(120, now);
    osc2.frequency.setValueAtTime(122, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
    osc1.start();
    osc2.start();
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const playChordNote = (freq, start, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0.05, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);
      osc.start(now + start);
      osc.stop(now + start + duration);
    };
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      playChordNote(freq, idx * 0.08, 0.6);
    });
    playChordNote(523.25, 0.6, 1.2); 
    playChordNote(659.25, 0.6, 1.2); 
    playChordNote(783.99, 0.6, 1.2); 
    playChordNote(1046.50, 0.6, 1.2); 
  }

  playTimerTick() {
    this.playTickTock();
  }
}

const sounds = new SoundEngine();
