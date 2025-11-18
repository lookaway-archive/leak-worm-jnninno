/**
 * ============================================
 * SPECIMEN: LEAK-WORM-847T
 * ORGAN: ORGANISM CONSTANTS ARCHIVE
 * RETRIEVAL: October 2025, Tlönian Research Facility
 * ============================================
 * 
 * STATUS: Operational
 * FUNCTION: Central nervous system constants - all vital signs originate here
 * DEPENDENCIES: None (primary organ, all others feed from this)
 * 
 * SURGICAL NOTES:
 * This archive contains the genetic blueprint for specimen behavior.
 * All timing DNA, color genetics, and metabolic rates are encoded here.
 * Modification of these constants will mutate the organism's fundamental
 * nature. Handle with appropriate containment protocols.
 * 
 * The specimen exhibits a consistent 32-second lifecycle from birth
 * to natural death, allowing observers to witness complete metamorphosis.
 * ============================================
 */

const CONFIG = {
  
  // ==========================================
  // LIFECYCLE DNA - Metabolic timing sequences
  // (Technical: Duration of each decay stage in milliseconds)
  // ==========================================
  
  timings: {
    // STANDARD METABOLISM - Natural organism lifecycle
    // (Technical: 32-second total lifespan everywhere)
    standard: {
      healthy: 24000,  // 24s - Stable phosphorescence period
      panic: 3000,     // 3s - Crisis response activation  
      decay: 3000,     // 3s - Cellular breakdown phase
      death: 2000,     // 2s - Final neural discharge
      total: 32000,    // 32s - Complete lifecycle duration
      opacityMultiplier: 1.0  // Visual fade synchronization
    },
    
    // METAMORPHOSIS PROTOCOL - Ocean descent transformation
    // (Technical: Pirate mode transition timings)
    pirate: {
      fadeOutDuration: 3000,   // Document dissolution
      colorShiftDuration: 7000, // Spectral realignment
      fadeInDuration: 2000,     // Reward manifestation
      opacityMultiplier: 1.2   // Accelerated fade coefficient
    }
  },
  
  // ==========================================
  // CHROMATIC GENETICS - Phosphor emission spectra
  // (Technical: RGB color values for each lifecycle stage)
  // ==========================================
  
  colors: {
    // HEALTHY SPECIMEN - Orange CRT phosphorescence
    // (Technical: Starting state colors)
    healthy: {
      core: { r: 122, g: 31, b: 8 },      // Deep organ glow
      glow: { r: 255, g: 107, b: 43 },     // Phosphor corona
      text: { r: 255, g: 120, b: 70 },     // Neural activity
      textOpacity: 1.0                      // Full consciousness
    },
    
    // PANIC RESPONSE - Blood-red emergency state
    // (Technical: Danger state colors)
    panic: {
      core: { r: 138, g: 10, b: 2 },       // Adrenaline surge
      glow: { r: 255, g: 60, b: 30 },      // Heightened emission
      text: { r: 255, g: 90, b: 50 },      // Elevated signals
      textOpacity: 1.0                      // Hypervigilance
    },
    
    // DECAY PHASE - Amber phosphor deterioration
    // (Technical: Borges yellow fade)
    decay: {
      core: { r: 74, g: 58, b: 26 },       // Failing metabolism
      glow: { r: 100, g: 100, b: 80 },     // Weakening corona
      text: { r: 120, g: 105, b: 80 },     // Neural decline
      textOpacity: 0.7                      // Fading awareness
    },
    
    // DEATH STATE - Monochrome with residual warmth
    // (Technical: Final state before termination)
    death: {
      core: { r: 40, g: 40, b: 35 },       // Minimal life signs
      glow: { r: 60, g: 60, b: 55 },       // Ghost phosphor
      text: { r: 80, g: 80, b: 75 },       // Neural death
      textOpacity: 0.0                      // Consciousness void
    },
    
    // METAMORPHOSIS - Deep ocean transformation
    // (Technical: Pirate reward state)
    pirate: {
      core: { r: 0, g: 20, b: 40 },        // Abyssal depths
      glow: { r: 0, g: 200, b: 255 },      // Bioluminescence
      text: { r: 220, g: 240, b: 255 },    // Cyan signals
      textOpacity: 1.0                      // Fully visible and readable
    }
  },
  
  // ==========================================
  // RESPIRATORY RHYTHM - Opacity pulsation cycles
  // (Technical: Breathing animation parameters)
  // ==========================================
  
  breathing: {
    healthy: {
      speed: 6,          // Relaxed metabolism
      opacityMin: 0.7,   // Exhale depth
      opacityMax: 0.85   // Inhale peak
    },
    panic: {
      speed: 3,          // Hyperventilation
      opacityMin: 0.5,   // Gasping
      opacityMax: 0.95   // Desperate intake
    },
    decay: {
      speed: 12,         // Labored breathing
      opacityMin: 0.3,   // Shallow exhale
      opacityMax: 0.5    // Weak inhale
    },
    death: {
      speed: 0,          // Respiratory arrest
      opacityMin: 0.2,   // Flatline
      opacityMax: 0.2    // No variance
    },
    pirate: {
      speed: 8,          // Ocean rhythm
      opacityMin: 0.7,   // Tidal ebb
      opacityMax: 0.9    // Tidal flow
    }
  },
  
  // ==========================================
  // PERIPHERAL VISION DECAY - Edge darkness encroachment
  // (Technical: CSS vignette effect parameters)
  // ==========================================
  
  vignette: {
    healthy: {
      radius: 85,        // Wide field of vision
      opacity: 0.02      // Minimal tunnel effect
    },
    panic: {
      radius: 65,        // Tunnel vision onset
      opacity: 0.15      // Stress response
    },
    decay: {
      radius: 50,        // Severe constriction
      opacity: 0.4       // Heavy darkness
    },
    death: {
      radius: 40,        // Minimal vision
      opacity: 0.6       // Near-blindness
    },
    pirate: {
      radius: 75,        // Ocean expanse
      opacity: 0.35      // Depth pressure
    }
  },
  
  // ==========================================
  // ELECTRON SCAN LINES - CRT phosphor refresh rate
  // (Technical: Scanline animation settings)
  // ==========================================
  
  scanlines: {
    healthy: {
      opacity: 0.1,      // Subtle interference
      speed: 2.5         // Normal refresh
    },
    panic: {
      opacity: 0.45,     // Heavy static
      speed: 1.5         // Rapid scanning
    },
    decay: {
      opacity: 0.20,     // Moderate noise
      speed: 5           // Failing sync
    },
    death: {
      opacity: 0.2,      // Ghost traces
      speed: 12          // Lost vertical hold
    },
    pirate: {
      opacity: 0.25,     // Ocean static
      speed: 3           // Wave rhythm
    }
  },
  
  // ==========================================
  // OPTICAL DETERIORATION - Focus degradation
  // (Technical: CSS blur filter values in pixels)
  // ==========================================
  
  blur: {
    healthy: {
      title: 0.3,        // Sharp cognition
      text: 0.2,         // Clear perception
      pirate: 0.2        // Alert state
    },
    panic: {
      title: 0.5,        // Stress blur
      text: 0.4,         // Adrenaline shake
      pirate: 0.15       // Hyperalert
    },
    decay: {
      title: 2.5,        // Severe degradation
      text: 2.2,         // Vision failure
      pirate: 1.2        // Confused state
    },
    death: {
      title: 8.0,        // Complete defocus
      text: 8.0,         // Blindness
      pirate: 8.0        // Void
    },
    pirate: {
      title: 0.2,        // Dissolved
      text: 0.2,         // Dissolved
      pirate: 0.2        // Dissolved
    }
  },
  
  // ==========================================
  // PHOSPHOR GLOW INTENSITY - Text shadow emission
  // (Technical: CSS text-shadow spread and intensity)
  // ==========================================
  
  textShadow: {
    healthy: {
      spread: 40,        // Strong emission
      intensity: 0.3     // Moderate glow
    },
    panic: {
      spread: 60,        // Expanded corona
      intensity: 0.6     // Intense radiation
    },
    decay: {
      spread: 10,        // Weakening field
      intensity: 0.1     // Dim phosphor
    },
    death: {
      spread: 5,         // Minimal emission
      intensity: 0.05    // Ghost glow
    },
    pirate: {
      spread: 50,        // Bioluminescent
      intensity: 0.5     // Ocean glow
    }
  },
  
  // ==========================================
  // POWER FLUCTUATION - CRT voltage instability
  // (Technical: Flicker animation parameters)
  // ==========================================
  
  flicker: {
    healthy: {
      speed: 0.3,        // Stable voltage
      brightness: 1.0    // Full power
    },
    panic: {
      speed: 0.15,       // Nervous fluctuation
      brightness: 0.95   // Slight dimming
    },
    decay: {
      speed: 0.08,       // Violent instability
      brightness: 0.85   // Power loss
    },
    death: {
      speed: 0.04,       // Desperate flicker
      brightness: 0.7    // Critical failure
    },
    pirate: {
      speed: 0.05,       // Transition flicker
      brightness: 0.75   // Phase shift
    }
  },
  
  // ==========================================
  // SENSORY RESPONSE CONFIGURATION
  // (Technical: User interaction event settings)
  // ==========================================
  
  interaction: {
    resetEvents: [       // Stimuli that reset decay
      'scroll',          // Visual tracking
      'mousemove',       // Cursor presence
      'click',           // Direct contact
      'touchstart',      // Tactile input
      'keydown'          // Keyboard activity
    ],
    throttleMs: 100      // Reaction latency
  },
  
};

// ==========================================
// METABOLIC HELPER FUNCTIONS
// (Technical: Utility methods for accessing current state)
// ==========================================

// RETRIEVE ACTIVE METABOLISM - Returns standard timing set
// (Technical: Always returns the 32-second lifecycle)
CONFIG.getCurrentTimings = function() {
  return this.timings.standard;
};

// CALCULATE TOTAL LIFESPAN - Returns organism duration
// (Technical: Always returns 32000ms)
CONFIG.getTotalLifespan = function() {
  return this.timings.standard.total;
};

// VALIDATION REMOVED - No console output in production
// (Technical: All debug logging eliminated for sterile deployment)