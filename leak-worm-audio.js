/**
 * ============================================
 * LEAK-WORM-847T AUDIO MODULE v1.1
 * Adapted from: phosphoros-terminalis DNA
 * Integration: decay-core.js lifecycle
 * ============================================
 * 
 * v1.1 FIXES:
 * - Fixed volume stacking bug (absolute gain values)
 * - Added beam fizz on text contact (3 intensity levels)
 * - Fixed volume cycle: 0→1→2→3→0 (not 0→3→0)
 * - Fixed CSS bar progression (proper reset)
 * - DEFAULT VOLUME: Level 1 (low, audible)
 * 
 * SOUND MAP:
 * - 60Hz CRT hum (healthy/panic/decay)
 * - 62.64Hz Schumann resonance (pirate meditation)
 * - Water drop (leak button)
 * - Beam sweep + UI contact + fizz
 * - Phosphor tick (pirate typewriter)
 * - Thinking pulse (pirate blue dot)
 * - Password unlock
 * - Smooth death fadeout
 */

class LeakWormAudio {
    constructor() {
        this.volumeLevel = 1; // 0=off, 1=low, 2=med, 3=high - DEFAULT LOW
        this.context = null;
        this.nodes = {};
        this.ready = false;
        this.baseVolume = 0.04;
        this.currentStage = 'healthy';
        this.isDeathSequence = false;
        this.isPirateMode = false;
        this.baseBeamGain = 0.015; // Store base gain to prevent stacking
    }
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    async init() {
        if (this.context) {
            if (this.context.state === 'suspended') {
                await this.context.resume();
            }
            return true;
        }
        
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            
            this.nodes.masterGain = this.context.createGain();
            this.nodes.masterGain.connect(this.context.destination);
            
            this.ready = true;
            console.log('🔊 Leak-worm audio initialized');
            return true;
        } catch (error) {
            console.error('Audio initialization failed:', error);
            return false;
        }
    }
    
    // ==========================================
    // 60HZ CRT HUM (healthy/panic/decay)
    // ==========================================
    
    setupCRTHum() {
        this.cleanupCRTHum();
        
        if (this.isDeathSequence || this.isPirateMode) return;
        
        console.log('🔆 Setting up CRT hum');
        
        // Primary 60Hz hum
        this.nodes.hum = this.context.createOscillator();
        this.nodes.humGain = this.context.createGain();
        this.nodes.hum.type = 'sine';
        this.nodes.hum.frequency.value = 60;
        
        // Second harmonic (120Hz)
        this.nodes.harmonic2 = this.context.createOscillator();
        this.nodes.harmonic2Gain = this.context.createGain();
        this.nodes.harmonic2.type = 'sine';
        this.nodes.harmonic2.frequency.value = 120;
        
        // Third harmonic (180Hz)
        this.nodes.harmonic3 = this.context.createOscillator();
        this.nodes.harmonic3Gain = this.context.createGain();
        this.nodes.harmonic3.type = 'sine';
        this.nodes.harmonic3.frequency.value = 180;
        
        // Set volumes
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const baseLevel = this.baseVolume * volumeMultipliers[this.volumeLevel];
        
        this.nodes.humGain.gain.value = baseLevel;
        this.nodes.harmonic2Gain.gain.value = baseLevel * 0.3;
        this.nodes.harmonic3Gain.gain.value = baseLevel * 0.15;
        
        // Connect
        this.nodes.hum.connect(this.nodes.humGain);
        this.nodes.humGain.connect(this.nodes.masterGain);
        this.nodes.harmonic2.connect(this.nodes.harmonic2Gain);
        this.nodes.harmonic2Gain.connect(this.nodes.masterGain);
        this.nodes.harmonic3.connect(this.nodes.harmonic3Gain);
        this.nodes.harmonic3Gain.connect(this.nodes.masterGain);
        
        // Start
        this.nodes.hum.start();
        this.nodes.harmonic2.start();
        this.nodes.harmonic3.start();
    }
    
    cleanupCRTHum() {
        ['hum', 'harmonic2', 'harmonic3'].forEach(name => {
            if (this.nodes[name]) {
                try {
                    this.nodes[name].stop();
                    this.nodes[name].disconnect();
                } catch (e) {}
                this.nodes[name] = null;
            }
        });
        
        ['humGain', 'harmonic2Gain', 'harmonic3Gain'].forEach(name => {
            if (this.nodes[name]) {
                try {
                    this.nodes[name].disconnect();
                } catch (e) {}
                this.nodes[name] = null;
            }
        });
    }
    
    // ==========================================
    // SCHUMANN RESONANCE (pirate meditation)
    // ==========================================
    
    setupSchumannHum() {
        this.cleanupSchumannHum();
        
        console.log('🌊 Setting up Schumann resonance (Earth frequency)');
        
        // 62.64Hz carrier (8x Schumann fundamental)
        this.nodes.schumannCarrier = this.context.createOscillator();
        this.nodes.schumannGain = this.context.createGain();
        
        this.nodes.schumannCarrier.type = 'sine';
        this.nodes.schumannCarrier.frequency.value = 62.64;
        
        // 7.83Hz LFO for pulsing (Earth's heartbeat)
        this.nodes.schumannLFO = this.context.createOscillator();
        this.nodes.schumannLFOGain = this.context.createGain();
        
        this.nodes.schumannLFO.type = 'sine';
        this.nodes.schumannLFO.frequency.value = 7.83;
        this.nodes.schumannLFOGain.gain.value = 3; // Modulation depth
        
        // Connect LFO to carrier frequency (creates pulsing)
        this.nodes.schumannLFO.connect(this.nodes.schumannLFOGain);
        this.nodes.schumannLFOGain.connect(this.nodes.schumannCarrier.frequency);
        
        // Set volume (louder for meditation presence)
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const baseLevel = this.baseVolume * volumeMultipliers[this.volumeLevel];
        this.nodes.schumannGain.gain.value = baseLevel * 1.8;
        
        // Add gentle harmonic for warmth
        this.nodes.schumannHarmonic = this.context.createOscillator();
        this.nodes.schumannHarmonicGain = this.context.createGain();
        this.nodes.schumannHarmonic.type = 'sine';
        this.nodes.schumannHarmonic.frequency.value = 125.28; // 2x harmonic
        this.nodes.schumannHarmonicGain.gain.value = baseLevel * 0.6;
        
        // Connect to output
        this.nodes.schumannCarrier.connect(this.nodes.schumannGain);
        this.nodes.schumannGain.connect(this.nodes.masterGain);
        
        this.nodes.schumannHarmonic.connect(this.nodes.schumannHarmonicGain);
        this.nodes.schumannHarmonicGain.connect(this.nodes.masterGain);
        
        // Start
        this.nodes.schumannLFO.start();
        this.nodes.schumannCarrier.start();
        this.nodes.schumannHarmonic.start();
        
        console.log('🌊 Schumann active: 62.64Hz ± 7.83Hz');
    }
    
    cleanupSchumannHum() {
        ['schumannCarrier', 'schumannLFO', 'schumannHarmonic'].forEach(name => {
            if (this.nodes[name]) {
                try {
                    this.nodes[name].stop();
                    this.nodes[name].disconnect();
                } catch (e) {}
                this.nodes[name] = null;
            }
        });
        
        ['schumannGain', 'schumannLFOGain', 'schumannHarmonicGain'].forEach(name => {
            if (this.nodes[name]) {
                try {
                    this.nodes[name].disconnect();
                } catch (e) {}
                this.nodes[name] = null;
            }
        });
    }
    
    // ==========================================
    // VOLUME CONTROL
    // ==========================================
    
    setVolumeLevel(level) {
        this.volumeLevel = level;
        
        if (this.volumeLevel === 0) {
            this.cleanupCRTHum();
            this.cleanupSchumannHum();
            this.cleanupBeam();
        } else {
            // Setup appropriate hum based on mode
            if (this.isPirateMode && !this.nodes.schumannCarrier) {
                this.setupSchumannHum();
            } else if (!this.isPirateMode && !this.isDeathSequence && !this.nodes.hum) {
                this.setupCRTHum();
            } else {
                // Update existing volumes smoothly
                this.updateHumVolumes();
            }
        }
    }
    
    updateHumVolumes() {
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const targetVolume = this.baseVolume * volumeMultipliers[this.volumeLevel];
        
        // Update CRT hum
        if (this.nodes.humGain) {
            this.nodes.humGain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, targetVolume),
                this.context.currentTime + 0.1
            );
        }
        if (this.nodes.harmonic2Gain) {
            this.nodes.harmonic2Gain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, targetVolume * 0.3),
                this.context.currentTime + 0.1
            );
        }
        if (this.nodes.harmonic3Gain) {
            this.nodes.harmonic3Gain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, targetVolume * 0.15),
                this.context.currentTime + 0.1
            );
        }
        
        // Update Schumann hum
        if (this.nodes.schumannGain) {
            this.nodes.schumannGain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, targetVolume * 1.8),
                this.context.currentTime + 0.1
            );
        }
        if (this.nodes.schumannHarmonicGain) {
            this.nodes.schumannHarmonicGain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, targetVolume * 0.6),
                this.context.currentTime + 0.1
            );
        }
    }
    
    // ==========================================
    // DECAY STAGE SYNC
    // ==========================================
    
    syncToDecayStage(stage, progress) {
        this.currentStage = stage;
        
        if (stage === 'death' && !this.isDeathSequence) {
            this.beginDeath();
            return;
        }
        
        if (stage === 'pirate' && !this.isPirateMode) {
            // Pirate transition handled separately
            return;
        }
        
        if (!this.ready || this.volumeLevel === 0 || this.isDeathSequence || this.isPirateMode) return;
        
        // Map stage to frequency/volume changes
        const stageMap = {
            healthy: { freq: 60, volume: 1.0 },
            panic: { freq: 57, volume: 0.85 },
            decay: { freq: 52, volume: 0.6 }
        };
        
        const config = stageMap[stage] || stageMap.healthy;
        
        // Update CRT hum frequencies
        if (this.nodes.hum) {
            this.nodes.hum.frequency.exponentialRampToValueAtTime(
                config.freq,
                this.context.currentTime + 0.5
            );
        }
        if (this.nodes.harmonic2) {
            this.nodes.harmonic2.frequency.exponentialRampToValueAtTime(
                config.freq * 2,
                this.context.currentTime + 0.5
            );
        }
        if (this.nodes.harmonic3) {
            this.nodes.harmonic3.frequency.exponentialRampToValueAtTime(
                config.freq * 3,
                this.context.currentTime + 0.5
            );
        }
        
        // Update volumes
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const baseLevel = this.baseVolume * volumeMultipliers[this.volumeLevel];
        const modulated = baseLevel * config.volume;
        
        if (this.nodes.humGain) {
            this.nodes.humGain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, modulated),
                this.context.currentTime + 0.5
            );
        }
        if (this.nodes.harmonic2Gain) {
            this.nodes.harmonic2Gain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, modulated * 0.3),
                this.context.currentTime + 0.5
            );
        }
        if (this.nodes.harmonic3Gain) {
            this.nodes.harmonic3Gain.gain.exponentialRampToValueAtTime(
                Math.max(0.001, modulated * 0.15),
                this.context.currentTime + 0.5
            );
        }
    }
    
    // ==========================================
    // VISUAL SYNC (volume icon decay matching)
    // ==========================================
    
    syncDecayVisuals(stage, progress) {
        const audioBtn = document.getElementById('audio-toggle');
        if (!audioBtn) return;
        
        if (stage === 'healthy') {
            audioBtn.style.filter = 'blur(0.03px)';
            audioBtn.style.opacity = '0.7';
        } else if (stage === 'panic') {
            audioBtn.style.filter = 'brightness(0.95) blur(0.05px)';
            audioBtn.style.opacity = '0.65';
        } else if (stage === 'decay') {
            audioBtn.style.filter = 'hue-rotate(15deg) brightness(0.75) blur(0.6px)';
            audioBtn.style.opacity = '0.55';
        } else if (stage === 'death') {
            audioBtn.style.filter = 'brightness(0) blur(10px)';
            audioBtn.style.opacity = '0';
        } else if (stage === 'pirate') {
            // Shift to cyan/blue ocean theme
            audioBtn.style.filter = 'hue-rotate(180deg) brightness(1.1) saturate(1.3) blur(0px)';
            audioBtn.style.opacity = '0.8';
        }
    }
    
    // ==========================================
    // DEATH SEQUENCE
    // ==========================================
    
    beginDeath() {
        if (!this.ready || this.volumeLevel === 0 || this.isDeathSequence) return;
        
        console.log('💀 Beginning death sequence - smooth fadeout');
        this.isDeathSequence = true;
        
        // Smooth 2-second fadeout
        if (this.nodes.humGain) {
            const currentGain = this.nodes.humGain.gain.value;
            this.nodes.humGain.gain.setValueAtTime(currentGain, this.context.currentTime);
            this.nodes.humGain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 2);
        }
        if (this.nodes.harmonic2Gain) {
            const currentGain = this.nodes.harmonic2Gain.gain.value;
            this.nodes.harmonic2Gain.gain.setValueAtTime(currentGain, this.context.currentTime);
            this.nodes.harmonic2Gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 2);
        }
        if (this.nodes.harmonic3Gain) {
            const currentGain = this.nodes.harmonic3Gain.gain.value;
            this.nodes.harmonic3Gain.gain.setValueAtTime(currentGain, this.context.currentTime);
            this.nodes.harmonic3Gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 2);
        }
        if (this.nodes.beamGain) {
            const currentGain = this.nodes.beamGain.gain.value;
            this.nodes.beamGain.gain.setValueAtTime(currentGain, this.context.currentTime);
            this.nodes.beamGain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1.5);
        }
        
        // Cleanup after fade
        setTimeout(() => {
            this.cleanupCRTHum();
            this.cleanupBeam();
        }, 2500);
    }
    
    // ==========================================
    // PIRATE MODE TRANSITION (7 seconds)
    // ==========================================
    
    beginPirateTransition(duration = 7000, onComplete) {
        if (!this.ready || this.volumeLevel === 0) {
            if (onComplete) onComplete();
            return;
        }
        
        console.log('🏴‍☠️ Beginning pirate transition - descending to ocean depth');
        
        this.isPirateMode = true;
        
        const transitionSec = duration / 1000;
        
        // Fade out CRT hum while transitioning
        if (this.nodes.humGain) {
            this.nodes.humGain.gain.exponentialRampToValueAtTime(
                0.001,
                this.context.currentTime + transitionSec
            );
        }
        if (this.nodes.harmonic2Gain) {
            this.nodes.harmonic2Gain.gain.exponentialRampToValueAtTime(
                0.001,
                this.context.currentTime + transitionSec
            );
        }
        if (this.nodes.harmonic3Gain) {
            this.nodes.harmonic3Gain.gain.exponentialRampToValueAtTime(
                0.001,
                this.context.currentTime + transitionSec
            );
        }
        
        // Create transition sweep (60Hz → 62.64Hz)
        const transitionOsc = this.context.createOscillator();
        const transitionGain = this.context.createGain();
        
        transitionOsc.type = 'sine';
        transitionOsc.frequency.setValueAtTime(60, this.context.currentTime);
        transitionOsc.frequency.exponentialRampToValueAtTime(62.64, this.context.currentTime + transitionSec);
        
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const baseLevel = this.baseVolume * volumeMultipliers[this.volumeLevel];
        
        // Volume swell: quiet → loud → settle
        transitionGain.gain.setValueAtTime(baseLevel * 0.5, this.context.currentTime);
        transitionGain.gain.linearRampToValueAtTime(baseLevel * 2.0, this.context.currentTime + transitionSec * 0.5);
        transitionGain.gain.exponentialRampToValueAtTime(baseLevel * 1.8, this.context.currentTime + transitionSec);
        
        transitionOsc.connect(transitionGain);
        transitionGain.connect(this.nodes.masterGain);
        
        transitionOsc.start();
        transitionOsc.stop(this.context.currentTime + transitionSec);
        
        // Cleanup CRT and setup Schumann after transition
        setTimeout(() => {
            this.cleanupCRTHum();
            if (this.volumeLevel > 0) {
                this.setupSchumannHum();
            }
            if (onComplete) onComplete();
        }, duration);
    }
    
    // ==========================================
    // SOUND EFFECTS
    // ==========================================
    
    // Password unlock (gate opens)
    triggerPasswordUnlock() {
        if (!this.ready || this.volumeLevel === 0) return;
        
        console.log('🔓 Password unlock');
        
        // Satisfying major chord: C-E-G
        const frequencies = [261.63, 329.63, 392.00];
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const volume = 0.08 * volumeMultipliers[this.volumeLevel];
        
        frequencies.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, this.context.currentTime);
            gain.gain.linearRampToValueAtTime(volume * (1 - i * 0.2), this.context.currentTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.3);
            
            osc.connect(gain);
            gain.connect(this.nodes.masterGain);
            
            osc.start();
            osc.stop(this.context.currentTime + 0.35);
        });
    }
    
    // Data release (leak button) - downward version of unlock
    triggerWaterDrop() {
        if (!this.ready || this.volumeLevel === 0) return;
        
        console.log('💧 Data release - downward');
        
        // Same chord as unlock but DESCENDING: C-E-G → lower octave
        const frequencies = [
            [523.25, 261.63],  // C5 → C4
            [659.25, 329.63],  // E5 → E4
            [783.99, 392.00]   // G5 → G4
        ];
        
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const volume = 0.08 * volumeMultipliers[this.volumeLevel];
        
        frequencies.forEach((freqPair, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            
            osc.type = 'sine';
            
            // Start high, sweep down
            osc.frequency.setValueAtTime(freqPair[0], this.context.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freqPair[1], this.context.currentTime + 0.3);
            
            gain.gain.setValueAtTime(0, this.context.currentTime);
            gain.gain.linearRampToValueAtTime(volume * (1 - i * 0.2), this.context.currentTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.35);
            
            osc.connect(gain);
            gain.connect(this.nodes.masterGain);
            
            osc.start();
            osc.stop(this.context.currentTime + 0.4);
        });
    }
    
    // Phosphor tick (pirate typewriter)
    triggerPhosphorTick() {
        if (!this.ready || this.volumeLevel === 0 || !this.isPirateMode) return;
        
        // Soft click
        const clickOsc = this.context.createOscillator();
        const clickGain = this.context.createGain();
        
        clickOsc.type = 'sine';
        clickOsc.frequency.value = 400 + (Math.random() * 100);
        
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const clickVolume = 0.006 * volumeMultipliers[this.volumeLevel];
        
        clickGain.gain.setValueAtTime(clickVolume, this.context.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.002);
        
        clickOsc.connect(clickGain);
        clickGain.connect(this.nodes.masterGain);
        
        clickOsc.start();
        clickOsc.stop(this.context.currentTime + 0.003);
        
        // Fizz
        const bufferSize = this.context.sampleRate * 0.003;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() - 0.5) * 0.15;
        }
        
        const source = this.context.createBufferSource();
        const filter = this.context.createBiquadFilter();
        const gain = this.context.createGain();
        
        source.buffer = buffer;
        
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 1;
        
        const fizzVolume = 0.012 * volumeMultipliers[this.volumeLevel];
        
        gain.gain.setValueAtTime(fizzVolume, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.008);
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.nodes.masterGain);
        
        source.start();
    }
    
    // Thinking pulse (pirate blue dot)
    triggerThinkingPulse() {
        if (!this.ready || this.volumeLevel === 0 || !this.isPirateMode) return;
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = 72;
        
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const volume = 0.12 * volumeMultipliers[this.volumeLevel];
        
        // Double-pulse
        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(volume, this.context.currentTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(volume * 0.2, this.context.currentTime + 0.12);
        gain.gain.linearRampToValueAtTime(volume * 0.7, this.context.currentTime + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.35);
        
        osc.connect(gain);
        gain.connect(this.nodes.masterGain);
        
        osc.start();
        osc.stop(this.context.currentTime + 0.4);
    }
    
    // Beam fizz on text contact
    triggerBeamFizz() {
        if (!this.ready || this.volumeLevel === 0) return;
        
        // Fizz at 50% of impact sound volume
        const baseIntensity = 0.01;
        
        // Create white noise burst
        const bufferSize = this.context.sampleRate * 0.004;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() - 0.5) * 0.2;
        }
        
        const source = this.context.createBufferSource();
        const filter = this.context.createBiquadFilter();
        const gain = this.context.createGain();
        
        source.buffer = buffer;
        
        filter.type = 'highpass';
        filter.frequency.value = 3000;
        filter.Q.value = 0.7;
        
        const volumeMultipliers = [0, 0.3, 0.6, 1.0];
        const volume = baseIntensity * volumeMultipliers[this.volumeLevel];
        
        gain.gain.setValueAtTime(volume, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.01);
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.nodes.masterGain);
        
        source.start();
    }
    
    // Beam sweep (Schumann beat with 60Hz)
    triggerBeamSweep(beamY) {
        if (!this.ready || this.volumeLevel === 0 || this.isDeathSequence) return;
        
        const baseFreq = this.isPirateMode ? 69.64 : 67.83;
        const variation = (beamY / window.innerHeight - 0.5) * 4;
        const frequency = baseFreq + variation;
        
        if (!this.nodes.beamOsc) {
            this.nodes.beamOsc = this.context.createOscillator();
            this.nodes.beamGain = this.context.createGain();
            
            this.nodes.beamOsc.type = 'sine';
            this.nodes.beamOsc.frequency.value = frequency;
            this.nodes.beamGain.gain.value = this.baseBeamGain;
            
            this.nodes.beamOsc.connect(this.nodes.beamGain);
            this.nodes.beamGain.connect(this.nodes.masterGain);
            this.nodes.beamOsc.start();
        } else {
            this.nodes.beamOsc.frequency.exponentialRampToValueAtTime(
                frequency,
                this.context.currentTime + 0.1
            );
        }
    }
    
    // UI contact (extreme frequency bend)
    triggerUIContact() {
        if (!this.ready || this.volumeLevel === 0 || !this.nodes.beamOsc) return;
        
        const currentFreq = this.nodes.beamOsc.frequency.value;
        
        // Massive frequency drop
        this.nodes.beamOsc.frequency.setValueAtTime(currentFreq, this.context.currentTime);
        this.nodes.beamOsc.frequency.exponentialRampToValueAtTime(
            currentFreq * 0.2,
            this.context.currentTime + 0.1
        );
        this.nodes.beamOsc.frequency.exponentialRampToValueAtTime(
            currentFreq,
            this.context.currentTime + 0.4
        );
        
        // Volume boost uses ABSOLUTE gain
        this.nodes.beamGain.gain.setValueAtTime(this.baseBeamGain, this.context.currentTime);
        this.nodes.beamGain.gain.linearRampToValueAtTime(
            this.baseBeamGain * 3,
            this.context.currentTime + 0.1
        );
        this.nodes.beamGain.gain.exponentialRampToValueAtTime(
            Math.max(0.001, this.baseBeamGain),
            this.context.currentTime + 0.4
        );
    }
    
    cleanupBeam() {
        if (this.nodes.beamOsc) {
            try {
                this.nodes.beamOsc.stop();
                this.nodes.beamOsc.disconnect();
            } catch (e) {}
            this.nodes.beamOsc = null;
        }
        if (this.nodes.beamGain) {
            try {
                this.nodes.beamGain.disconnect();
            } catch (e) {}
            this.nodes.beamGain = null;
        }
    }
}

// ==========================================
// INTEGRATION
// ==========================================

function integrateLeakWormAudio() {
    const audio = new LeakWormAudio();
    
    // Create volume control
    const volumeBtn = document.createElement('button');
    volumeBtn.id = 'audio-toggle';
    volumeBtn.innerHTML = `
        <span class="volume-bars">
            <span class="bar bar-1"></span>
            <span class="bar bar-2"></span>
            <span class="bar bar-3"></span>
        </span>
    `;
    volumeBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 32px;
        height: 20px;
        padding: 3px 6px;
        background: rgba(229, 62, 44, 0.056);
        border: 1px solid rgba(229, 62, 44, 0.245);
        border-radius: 2px;
        z-index: 500;
        transition: all 0.3s;
        cursor: crosshair;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        filter: blur(0.03px);
    `;
    
    // Volume bar styles with proper reset
    const style = document.createElement('style');
    style.textContent = `
        .volume-bars {
            display: flex;
            gap: 2px;
            align-items: flex-end;
            height: 10px;
        }
        .bar {
            width: 2px;
            background: rgb(229, 62, 44);
            transition: all 0.3s;
            opacity: 0.125; /* Default: all dim */
        }
        .bar-1 { height: 3px; }
        .bar-2 { height: 6px; }
        .bar-3 { height: 10px; }
        
        /* Level 0: All dim (default) */
        .volume-0 .bar { 
            opacity: 0.125; 
        }
        
        /* Level 1: Small bar only */
        .volume-1 .bar { 
            opacity: 0.125; /* Reset all */
        }
        .volume-1 .bar-1 { 
            opacity: 0.6; /* Small bright */
        }
        
        /* Level 2: Small + mid bars */
        .volume-2 .bar { 
            opacity: 0.125; /* Reset all */
        }
        .volume-2 .bar-1,
        .volume-2 .bar-2 { 
            opacity: 0.7; /* Small + mid bright */
        }
        
        /* Level 3: All bars */
        .volume-3 .bar { 
            opacity: 0.85; /* All bright */
        }
        
        #audio-toggle:hover {
            background: rgba(229, 62, 44, 0.096);
            border-color: rgba(229, 62, 44, 0.32);
            opacity: 0.8;
        }
        
        #audio-toggle.beam-contact {
            opacity: 0.9 !important;
            filter: brightness(1.3) blur(0px) !important;
            border-color: rgba(var(--glow-r), var(--glow-g), var(--glow-b), 0.6) !important;
        }
        
        #audio-toggle.beam-contact .bar {
            background: rgb(var(--glow-r), var(--glow-g), var(--glow-b)) !important;
            box-shadow: 0 0 8px rgba(var(--glow-r), var(--glow-g), var(--glow-b), 0.8) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Start at volume 1 (LOW - lowest audible volume)
    volumeBtn.className = 'volume-1';
    
    // Volume button click handler - clean version
    volumeBtn.onclick = async function() {
        if (!audio.ready) {
            const initialized = await audio.init();
            if (!initialized) {
                console.error('Audio failed to initialize');
                return;
            }
            
            // Start at level 1 on first click
            audio.setVolumeLevel(1);
            volumeBtn.className = 'volume-1';
            
            // Confirmation beep
            const osc = audio.context.createOscillator();
            const gain = audio.context.createGain();
            osc.frequency.value = 1000;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, audio.context.currentTime);
            gain.gain.linearRampToValueAtTime(0.08, audio.context.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(audio.nodes.masterGain);
            osc.start();
            osc.stop(audio.context.currentTime + 0.1);
            
            return;
        }
        
        // Cycle: 0→1→2→3→0
        const nextLevel = (audio.volumeLevel + 1) % 4;
        audio.setVolumeLevel(nextLevel);
        volumeBtn.className = `volume-${nextLevel}`;
        
        if (nextLevel > 0) {
            const osc = audio.context.createOscillator();
            const gain = audio.context.createGain();
            osc.frequency.value = 800 + (nextLevel * 200);
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, audio.context.currentTime);
            gain.gain.linearRampToValueAtTime(0.1 * (nextLevel / 3), audio.context.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(audio.nodes.masterGain);
            osc.start();
            osc.stop(audio.context.currentTime + 0.1);
        }
    };
    
    document.body.appendChild(volumeBtn);
    
    // Global click to initialize audio (browser autoplay policy workaround)
    const initAudioOnAnyClick = async function(e) {
        if (!audio.ready) {
            const initialized = await audio.init();
            if (initialized) {
                console.log('🎵 Audio initialized on first click');
                audio.setVolumeLevel(1);
                volumeBtn.className = 'volume-1';
                
                // Soft confirmation beep
                const osc = audio.context.createOscillator();
                const gain = audio.context.createGain();
                osc.frequency.value = 800;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0, audio.context.currentTime);
                gain.gain.linearRampToValueAtTime(0.04, audio.context.currentTime + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.08);
                osc.connect(gain);
                gain.connect(audio.nodes.masterGain);
                osc.start();
                osc.stop(audio.context.currentTime + 0.1);
            }
        }
        
        // Remove listener after first initialization
        if (audio.ready) {
            document.removeEventListener('click', initAudioOnAnyClick);
        }
    };
    
    document.addEventListener('click', initAudioOnAnyClick);
    
    // Hook into decay lifecycle
    if (typeof decay !== 'undefined') {
        window.leakAudio = audio;
        
        decay.subscribe((stage, progress) => {
            audio.syncToDecayStage(stage, progress);
            audio.syncDecayVisuals(stage, progress);
        });
        
        console.log('✔ Audio hooked to decay lifecycle');
    }
    
    // Hook password unlock
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const originalClick = submitBtn.onclick;
        submitBtn.onclick = function() {
            const input = document.getElementById('passwordInput');
            if (input && input.value.trim() === bookContent.metadata.password) {
                setTimeout(() => audio.triggerPasswordUnlock(), 100);
            }
            if (originalClick) return originalClick.apply(this, arguments);
        };
    }
    
    // Hook leak button
    window.leakDocument = (function(originalFn) {
        return function(event) {
            audio.triggerWaterDrop();
            if (originalFn) return originalFn.call(this, event);
        };
    })(window.leakDocument);
    
    // Hook pirate mode transition
    window.startPirateMode = (function(originalFn) {
        return function() {
            const transitionDuration = CONFIG.timings.pirate?.transitionDuration || 7000;
            
            audio.beginPirateTransition(transitionDuration, () => {
                console.log('🌊 Pirate mode audio complete');
            });
            
            if (originalFn) return originalFn.call(this);
        };
    })(window.startPirateMode);
    
    // Hook pirate typewriter
    window.typewriterEffect = (function(originalFn) {
        return function(element, text, speed, callback) {
            element.style.opacity = '1';
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    if (text.substr(i, 4) === '<br>') {
                        element.innerHTML += '<br>';
                        i += 4;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                        
                        if (audio.isPirateMode) {
                            audio.triggerPhosphorTick();
                        }
                    }
                } else {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, speed);
        };
    })(window.typewriterEffect);
    
    // Hook pirate blue dot
    window.showRewardScreen = (function(originalFn) {
        return function() {
            if (originalFn) originalFn.call(this);
            
            setTimeout(() => {
                const dot = document.getElementById('rewardDot');
                if (dot) {
                    const observer = new MutationObserver(() => {
                        if (dot.style.opacity === '1') {
                            audio.triggerThinkingPulse();
                        }
                    });
                    observer.observe(dot, { attributes: true, attributeFilter: ['style'] });
                }
            }, 100);
        };
    })(window.showRewardScreen);
    
    // Beam interaction: Impact sound + Fizz sound
    let lastUIContact = null;
    const lastTextContact = new Map();

    setInterval(() => {
        const beam = document.getElementById('beamBody');
        const audioToggle = document.getElementById('audio-toggle');
        
        if (beam) {
            const beamRect = beam.getBoundingClientRect();
            const beamY = beamRect.top + beamRect.height / 2;
            
            audio.triggerBeamSweep(beamY);
            
            // Check audio toggle contact
            if (audioToggle) {
                const toggleRect = audioToggle.getBoundingClientRect();
                if (beamY >= toggleRect.top && beamY <= toggleRect.bottom) {
                    audioToggle.classList.add('beam-contact');
                    if (lastUIContact !== 'audio-toggle') {
                        audio.triggerUIContact();
                        lastUIContact = 'audio-toggle';
                    }
                } else {
                    audioToggle.classList.remove('beam-contact');
                    if (lastUIContact === 'audio-toggle') {
                        lastUIContact = null;
                    }
                }
            }
            
            // IMPACT SOUND: Titles + Pirate comments
            const impactElements = document.querySelectorAll(
                '.screen-title, .reward-title, .gate-title, .pirate-comment'
            );
            
            impactElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (beamY >= rect.top && beamY <= rect.bottom) {
                    const elementId = el.textContent.substring(0, 20);
                    const now = Date.now();
                    const lastTime = lastTextContact.get(elementId) || 0;
                    
                    if (now - lastTime > 1000) {
                        audio.triggerUIContact();
                        lastTextContact.set(elementId, now);
                    }
                }
            });
            
            // FIZZ SOUND: Blinking dots + Subtitles + Main text
            const fizzElements = document.querySelectorAll(
                '.blink-dot, .reward-dot, ' +
                '.screen-subtitle, .reward-subtitle, .reward-header, .sub-subtitle, ' +
                '.sentence, .list-item, .detail-text'
            );
            
            fizzElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (beamY >= rect.top && beamY <= rect.bottom) {
                    const elementId = el.textContent.substring(0, 20) || 'dot';
                    const now = Date.now();
                    const lastTime = lastTextContact.get(elementId) || 0;
                    
                    if (now - lastTime > 1000) {
                        audio.triggerBeamFizz();
                        lastTextContact.set(elementId, now);
                    }
                }
            });
        }
    }, 25);
    
    return audio;
}

// Auto-integrate
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', integrateLeakWormAudio);
} else {
    integrateLeakWormAudio();
}

console.log('✔ leak-worm-audio.js loaded (v1.1 - Volume level 1 default)');