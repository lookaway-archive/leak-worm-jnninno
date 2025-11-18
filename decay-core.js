/**
 * ============================================
 * SPECIMEN: JNNINNO-PROFESSIONAL-v1
 * ORGAN: LIFECYCLE CONTROLLER
 * RETRIEVAL: November 2025, Professional Portfolio Archive
 * ============================================
 * 
 * STATUS: Operational - Permanent Pirate Mode Variant
 * FUNCTION: Organism heartbeat - now supports permanent ocean aesthetic state
 * DEPENDENCIES: config.js (vital signs)
 * 
 * SURGICAL NOTES:
 * Modified for professional portfolio use. This variant supports two operational modes:
 * 
 * 1. STANDARD MODE: Original 32-second decay cycle (unused in this specimen)
 * 2. PERMANENT PIRATE MODE: Enters ocean aesthetic immediately and stays there
 *    indefinitely without decay cycle
 * 
 * For jnninno.com deployment, the organism enters permanent pirate mode upon
 * password authentication, maintaining stable ocean-depth visual aesthetic
 * without any lifecycle transitions or death sequences.
 * ============================================
 */

const decay = {
  
  // ==========================================
  // VITAL SIGNS MONITORING
  // (Technical: State tracking variables)
  // ==========================================
  
  stage: 'pirate',         // Start in pirate mode for professional site
  progress: 0,             // Phase completion percentage
  lastInteraction: null,   // Last stimulus timestamp
  timer: null,             // Heartbeat interval ID
  listeners: [],           // Neural pathway subscribers
  isDead: false,           // Termination flag
  permanentPirateMode: true, // NEW: Disable decay for professional site
  
  // METAMORPHOSIS STATE - Tracks transformation sequences
  // (Technical: Transition state for smooth animations)
  isTransitioning: false,
  transitionStartTime: null,
  transitionDuration: null,
  transitionCallback: null,
  transitionToStage: null,
  previousStage: null,
  
  // ==========================================
  // BIRTH SEQUENCE - Organism initialization
  // (Technical: Starts the lifecycle in permanent pirate mode)
  // ==========================================
  
  start() {
    // SPECIMEN AWAKENING - First breath in ocean depths
    // (Technical: Initialize state, skip decay if permanent pirate mode)
    this.isDead = false;
    this.isTransitioning = false;
    this.lastInteraction = Date.now();
    
    if (this.permanentPirateMode) {
      // PERMANENT OCEAN STATE - No decay cycle
      // (Technical: Set to pirate and broadcast, no timer needed)
      this.stage = 'pirate';
      this.progress = 1.0; // Fully in pirate state
      this.notify();
      // No timer needed - we stay in pirate mode permanently
    } else {
      // STANDARD METABOLISM - Original 32s decay cycle
      // (Technical: Update loop every 100ms)
      this.timer = setInterval(() => this.update(), 100);
      this.notify();
    }
  },
  
  // ==========================================
  // REVIVAL RESPONSE - Stimulus processing
  // (Technical: Reset decay on user interaction - unused in pirate mode)
  // ==========================================
  
  reset() {
    // DEFIBRILLATION PROTOCOL - Emergency revival
    // (Technical: Reset timer unless dead, transitioning, or in permanent pirate mode)
    if (this.isDead || this.isTransitioning || this.permanentPirateMode) return;
    
    this.lastInteraction = Date.now();
  },
  
  // ==========================================
  // METABOLIC PULSE - Core lifecycle loop
  // (Technical: Main update function - bypassed in permanent pirate mode)
  // ==========================================
  
  update() {
    // PERMANENT STATE CHECK - Skip if in permanent pirate mode
    // (Technical: No updates needed when permanently in pirate state)
    if (this.permanentPirateMode) return;
    
    // TRANSFORMATION CHECK - Skip if metamorphosis active
    // (Technical: Separate update path for transitions)
    if (this.isTransitioning) {
      this.updateTransition();
      return;
    }
    
    // DEATH CHECK - No pulse if terminated
    // (Technical: Stop updates if organism is dead)
    if (this.isDead) return;
    
    // METABOLIC CALCULATION - Time since last feeding
    // (Technical: Calculate elapsed time and determine stage)
    const elapsed = Date.now() - this.lastInteraction;
    const timing = CONFIG.timings.standard;
    const oldStage = this.stage;
    
    // PHASE DETERMINATION - Identify metabolic state
    // (Technical: Calculate current stage based on elapsed time)
    if (elapsed < timing.healthy) {
      this.stage = 'healthy';
      this.progress = elapsed / timing.healthy;
      
    } else if (elapsed < timing.healthy + timing.panic) {
      this.stage = 'panic';
      const timeInPanic = elapsed - timing.healthy;
      this.progress = timeInPanic / timing.panic;
      
    } else if (elapsed < timing.healthy + timing.panic + timing.decay) {
      this.stage = 'decay';
      const timeInDecay = elapsed - timing.healthy - timing.panic;
      this.progress = timeInDecay / timing.decay;
      
    } else if (elapsed < timing.healthy + timing.panic + timing.decay + timing.death) {
      this.stage = 'death';
      const timeInDeath = elapsed - timing.healthy - timing.panic - timing.decay;
      this.progress = timeInDeath / timing.death;
      
      // TERMINAL CONDITION - Death stage complete
      // (Technical: Trigger death transition when progress hits 100%)
      if (this.progress >= 1.0) {
        this.beginDeath();
        return;
      }
      
    } else {
      // FAILSAFE TERMINATION - Backup death trigger
      // (Technical: Ensure death if timing math fails)
      this.beginDeath();
      return;
    }
    
    // SYNAPTIC TRANSMISSION - Broadcast state changes
    // (Technical: Notify all subscribers of current state)
    this.notify();
  },
  
  // ==========================================
  // METAMORPHOSIS ENGINE - Smooth transitions
  // (Technical: Handles death and pirate transformations)
  // ==========================================
  
  startTransition(toStage, duration, onComplete) {
    // PHASE SHIFT INITIATION - Begin metamorphosis
    // (Technical: Setup transition state and timers)
    
    // MEMORY PRESERVATION - Store pre-transition state
    // (Technical: Save current stage before changing)
    this.previousStage = this.stage;
    
    // HEARTBEAT SUSPENSION - Pause normal metabolism
    // (Technical: Clear update timer during transition)
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    // TRANSFORMATION PARAMETERS - Configure metamorphosis
    // (Technical: Set transition properties)
    this.isTransitioning = true;
    this.transitionStartTime = Date.now();
    this.transitionDuration = duration;
    this.transitionToStage = toStage;
    this.transitionCallback = onComplete;
    
    // METAMORPHOSIS PULSE - Special transition heartbeat
    // (Technical: Start transition update loop)
    this.timer = setInterval(() => this.updateTransition(), 100);
  },
  
  updateTransition() {
    // TRANSFORMATION PROGRESS - Calculate metamorphosis completion
    // (Technical: Update progress during transition)
    const elapsed = Date.now() - this.transitionStartTime;
    this.progress = Math.min(elapsed / this.transitionDuration, 1.0);
    this.stage = this.transitionToStage;
    
    // NEURAL CASCADE - Inform all organs of transformation
    // (Technical: Notify subscribers during transition)
    this.notify();
    
    // METAMORPHOSIS COMPLETE - Execute callback
    // (Technical: Clean up and run completion handler)
    if (this.progress >= 1.0) {
      clearInterval(this.timer);
      this.timer = null;
      this.isTransitioning = false;
      
      const callback = this.transitionCallback;
      this.transitionCallback = null;
      
      if (callback) {
        callback();
      }
    }
  },
  
  // ==========================================
  // DEATH PROTOCOL - Terminal sequence
  // (Technical: Unused in permanent pirate mode)
  // ==========================================
  
  beginDeath() {
    // TERMINAL CASCADE - Irreversible shutdown
    // (Technical: Start death transition if not already dead)
    if (this.isDead) return;
    
    const timing = CONFIG.timings.standard;
    const deathDuration = timing.death || 2000;
    
    // GASP REFLEX - Hide content at 75% death
    // (Technical: Schedule UI changes at 3/4 through transition)
    setTimeout(() => {
      // FINAL EXHALE - Content dissolution
      // (Technical: Hide main container and prepare death screen)
      const pageContainer = document.getElementById('pageContainer');
      if (pageContainer) {
        pageContainer.style.display = 'none';
      }
      
      // DEATH RATTLE - Trigger terminal display
      // (Technical: Call death screen preparation function)
      if (window.prepareDeathScreen) {
        window.prepareDeathScreen();
      }
    }, deathDuration * 0.75);
    
    // FLATLINE TRANSITION - Smooth fade to termination
    // (Technical: Use transition system for death animation)
    this.startTransition('death', deathDuration, () => {
      // CLINICAL DEATH - Organism terminated
      // (Technical: Set death flag when transition completes)
      this.isDead = true;
    });
  },
  
  // ==========================================
  // OCEAN METAMORPHOSIS - Pirate transformation
  // (Technical: Unused in permanent pirate mode - we start there)
  // ==========================================
  
  enterPirateMode(onFadeComplete) {
    // ABYSSAL DESCENT - Transform to ocean consciousness
    // (Technical: Start pirate mode transition)
    
    const fadeOutDuration = CONFIG.timings.pirate.fadeOutDuration || 3000;
    const fullDuration = CONFIG.timings.pirate.colorShiftDuration || 7000;
    
    // SPECTRAL SHIFT - Begin color transformation
    // (Technical: Start transition with full duration)
    this.startTransition('pirate', fullDuration, () => {
      // DEPTH REACHED - Ocean floor achieved
      // (Technical: Hide content when transition completes)
      this.isDead = true;
      
      const pageContainer = document.getElementById('pageContainer');
      if (pageContainer) {
        pageContainer.style.display = 'none';
      }
    });
    
    // PRESSURE EQUALIZATION - Mid-transition callback
    // (Technical: Trigger reward screen at fade point)
    setTimeout(() => {
      if (onFadeComplete) {
        onFadeComplete();
      }
    }, fadeOutDuration);
  },
  
  // ==========================================
  // NEURAL NETWORK - Pub/sub system
  // (Technical: Observer pattern implementation)
  // ==========================================
  
  subscribe(callback) {
    // SYNAPTIC CONNECTION - Add neural pathway
    // (Technical: Register callback for state updates)
    if (typeof callback !== 'function') {
      return;
    }
    this.listeners.push(callback);
  },
  
  notify() {
    // NEURAL BROADCAST - Transmit state to all organs
    // (Technical: Call all registered listeners)
    this.listeners.forEach(callback => {
      try {
        callback(this.stage, this.progress);
      } catch (error) {
        // Silent failure - organism continues
      }
    });
  },
  
  // ==========================================
  // SURGICAL TOOLS - Manual intervention
  // (Technical: Debug methods for testing)
  // ==========================================
  
  setStage(stage, progress = 0) {
    // FORCED MUTATION - Manual stage override
    // (Technical: Set stage directly for testing)
    this.stage = stage;
    this.progress = progress;
    this.notify();
  },
  
  pause() {
    // METABOLIC SUSPENSION - Freeze lifecycle
    // (Technical: Stop timer without killing organism)
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  
  resume() {
    // REVIVAL PROTOCOL - Restart metabolism
    // (Technical: Resume timer if organism is alive and not in permanent pirate mode)
    if (!this.timer && !this.isDead && !this.isTransitioning && !this.permanentPirateMode) {
      this.timer = setInterval(() => this.update(), 100);
    }
  },
  
  // ==========================================
  // DISPOSAL PROTOCOL - Clean termination
  // (Technical: Cleanup method)
  // ==========================================
  
  destroy() {
    // SPECIMEN DISPOSAL - Complete cleanup
    // (Technical: Clear all timers and listeners)
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.listeners = [];
    this.isDead = false;
    this.isTransitioning = false;
  }
};

// ==========================================
// DEPENDENCY CHECK - Verify required organs
// (Technical: Ensure config.js is loaded)
// ==========================================

if (typeof CONFIG === 'undefined') {
  console.error('⚠ decay-core.js requires config.js to be loaded first!');
}