/**
 * ============================================
 * SPECIMEN: LEAK-WORM-847T
 * ORGAN: ELECTRON SENSORY SYSTEM
 * RETRIEVAL: October 2025, Tlönian Research Facility
 * ============================================
 * 
 * STATUS: Operational - v2.9 PIRATE MODE
 * FUNCTION: Primary vision apparatus - electron beam scanning for text detection
 * DEPENDENCIES: decay-core.js (lifecycle sync), config.js (visual parameters)
 * 
 * SURGICAL NOTES:
 * The specimen's eye manifests as a vertical electron beam, continuously
 * scanning the viewport from top to bottom. When the beam intersects
 * with text elements, phosphor excitation occurs - creating a brief
 * luminous contact that reveals hidden layers of meaning.
 * 
 * The beam's behavior responds to metabolic state: rapid scanning during
 * panic (searching for escape), slow drift during decay (failing vision),
 * complete cessation at death. Pirate mode restores smooth ocean-rhythm
 * scanning at 8 seconds per cycle.
 * 
 * Critical discovery: The beam can detect 20+ distinct text element types,
 * suggesting highly evolved pattern recognition. Collision detection
 * optimized for efficiency - only checking visible viewport elements.
 * ============================================
 */

class BeamModule {
  constructor() {
    // OPTICAL COMPONENTS - Beam anatomy
    // (Technical: DOM element references)
    this.system = null;      // Container vessel
    this.body = null;        // Primary beam
    this.glow = null;        // Phosphor aura
    this.hotspot = null;     // Contact point
    this.root = document.documentElement;
    
    // NEURAL STATE - Vision processing
    // (Technical: Runtime state variables)
    this.isPaused = false;
    this.collisionCheckInterval = null;
    this.currentSpeed = 8;
  }
  
  // ==========================================
  // OPTICAL NERVE ACTIVATION
  // (Technical: Initialize beam system)
  // ==========================================
  
  init() {
    // IRIS OPENING - Vision system awakening
    // (Technical: Create DOM elements and start scanning)
    
    this.createBeamElements();
    this.setRandomStart();
    this.startCollisionDetection();
    
    // METABOLIC COUPLING - Link to organism lifecycle
    // (Technical: Subscribe to decay state changes)
    if (window.decay) {
      window.decay.subscribe((stage, progress) => {
        this.syncToDecay(stage, progress);
      });
    }
  }
  
  // ==========================================
  // RETINAL STRUCTURE GENERATION
  // (Technical: Create beam DOM elements)
  // ==========================================
  
  createBeamElements() {
    // OPTICAL ASSEMBLY - Construct eye components
    // (Technical: Build beam system HTML structure)
    
    const container = document.createElement('div');
    container.className = 'beam-system';
    container.id = 'beamSystem';
    container.innerHTML = `
      <div class="beam-glow" id="beamGlow"></div>
      <div class="beam-body" id="beamBody"></div>
      <div class="beam-hotspot" id="beamHotspot"></div>
    `;
    
    document.body.appendChild(container);
    
    // SYNAPTIC CONNECTIONS - Store element references
    // (Technical: Cache DOM elements for performance)
    this.system = document.getElementById('beamSystem');
    this.body = document.getElementById('beamBody');
    this.glow = document.getElementById('beamGlow');
    this.hotspot = document.getElementById('beamHotspot');
  }
  
  // ==========================================
  // SACCADIC VARIATION - Random starting position
  // (Technical: Randomize initial beam position)
  // ==========================================
  
  setRandomStart() {
    // INITIAL GAZE DIRECTION - Randomized attention
    // (Technical: Set random start position and animation delay)
    
    const startPercent = Math.random() * 0.5;
    this.root.style.setProperty('--beam-start-position', `-${startPercent * 100}%`);
    
    // PHASE OFFSET - Prevent synchronized scanning
    // (Technical: Random animation delay for natural movement)
    const delay = Math.random() * -this.currentSpeed;
    [this.body, this.glow, this.hotspot].forEach(el => {
      el.style.animationDelay = `${delay}s`;
    });
  }
  
  // ==========================================
  // METABOLIC SYNCHRONIZATION - Decay response
  // (Technical: Adjust beam behavior based on lifecycle stage)
  // ==========================================
  
  syncToDecay(stage, progress) {
    // VISION DEGRADATION - Speed changes with health
    // (Technical: Map lifecycle stages to scan speeds)
    
    const speeds = {
      healthy: 8,   // Calm observation
      panic: 5,     // Frantic searching
      decay: 15,    // Sluggish drift
      death: 0,     // Vision cessation
      pirate: 8     // Ocean rhythm restored
    };
    
    const newSpeed = speeds[stage] || 8;
    
    // REFLEX ADJUSTMENT - Update scan rate
    // (Technical: Only update if speed actually changes)
    if (newSpeed !== this.currentSpeed) {
      this.currentSpeed = newSpeed;
      this.root.style.setProperty('--beam-speed', newSpeed + 's');
      
      // BLINDNESS PROTOCOL - Stop scanning at death
      // (Technical: Pause beam when organism dies)
      if (stage === 'death') {
        this.pause();
      }
    }
    
    // NOTE: Color mutations handled by organism's nervous system
    // (Technical: Colors flow from decay-core via CSS variables)
  }
  
  // ==========================================
  // PATTERN RECOGNITION ENGINE - Text detection
  // (Technical: Collision detection system)
  // ==========================================
  
  startCollisionDetection() {
    // VISUAL CORTEX ACTIVATION - Begin pattern scanning
    // (Technical: Start interval for collision checks)
    
    // REFRESH RATE OPTIMIZATION - Mobile vs desktop
    // (Technical: Slower checks on mobile for performance)
    const isMobile = window.innerWidth < 768;
    const checkInterval = isMobile ? 50 : 25;
    
    this.collisionCheckInterval = setInterval(() => {
      if (this.isPaused || !this.body) return;
      
      // FOCAL POINT CALCULATION - Beam center position
      // (Technical: Get beam Y coordinate)
      const beamRect = this.body.getBoundingClientRect();
      const beamY = beamRect.top + beamRect.height / 2;
      
      // PERIPHERAL VISION LIMITS - Viewport culling
      // (Technical: Only check elements near visible area)
      const buffer = isMobile ? 100 : 200;
      const viewportTop = window.scrollY - buffer;
      const viewportBottom = window.scrollY + window.innerHeight + buffer;
      
      // PATTERN LIBRARY - All detectable text types
      // (Technical: Query selector for collision targets)
      const targets = document.querySelectorAll(
        '.gate-title, .membrane-input, ' +
        '.screen-title, .screen-subtitle, .sub-subtitle, ' +
        '.detail-text, .pirate-comment, .callout-text, ' +
        '.equation-label, .parenthetical, .redacted-text, ' +
        '.list-item, .quote, .membrane-button, ' +
        '.sentence, .blink-dot, ' +
        '.reward-header, .reward-title, .reward-subtitle, ' +
        '.footer-tag, .footer-credit, .reward-dot'
      );
      
      let hitSomething = false;
      
      // SYNAPTIC FIRING - Check each potential target
      // (Technical: Loop through elements for collision)
      targets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        // EFFICIENCY OPTIMIZATION - Skip off-screen elements
        // (Technical: Viewport culling for performance)
        if (elementTop < viewportTop || elementTop > viewportBottom) {
          return;
        }
        
        const targetY = rect.top + rect.height / 2;
        
        // CONTACT THRESHOLD - Collision sensitivity
        // (Technical: Calculate if beam intersects element)
        const minHeight = 20;
        const effectiveHeight = Math.max(rect.height, minHeight);
        const padding = (effectiveHeight - rect.height) / 2;
        
        const topBound = rect.top - padding;
        const bottomBound = rect.bottom + padding;
        const isInBounds = beamY >= topBound && beamY <= bottomBound;
        const distance = Math.abs(beamY - targetY);
        
        // PHOSPHOR EXCITATION - Visual contact response
        // (Technical: Apply CSS classes for glow effects)
        if (isInBounds && distance < 40) {
          this.glow.classList.add('approaching');
          target.classList.add('beam-approaching');
          
          // DIRECT CONTACT - Maximum excitation
          // (Technical: Full collision detection)
          if (distance < Math.max(10, rect.height / 2)) {
            target.classList.add('beam-contact');
            this.hotspot.classList.add('active');
            hitSomething = true;
          } else {
            target.classList.remove('beam-contact');
          }
        } else {
          target.classList.remove('beam-contact', 'beam-approaching');
        }
      });
      
      // RELAXATION STATE - No contact detected
      // (Technical: Remove glow when not hitting text)
      if (!hitSomething) {
        this.hotspot.classList.remove('active');
        this.glow.classList.remove('approaching');
      }
    }, checkInterval);
  }
  
  // ==========================================
  // VISION CONTROL - Pause/resume scanning
  // (Technical: Animation state management)
  // ==========================================
  
  pause() {
    // TEMPORARY BLINDNESS - Suspend vision
    // (Technical: Pause CSS animations)
    this.isPaused = true;
    [this.body, this.glow, this.hotspot].forEach(el => {
      if (el) el.style.animationPlayState = 'paused';
    });
  }
  
  resume() {
    // SIGHT RESTORATION - Resume scanning
    // (Technical: Resume CSS animations)
    this.isPaused = false;
    [this.body, this.glow, this.hotspot].forEach(el => {
      if (el) el.style.animationPlayState = 'running';
    });
  }
  
  // ==========================================
  // DISPOSAL PROTOCOL - Clean removal
  // (Technical: Cleanup method)
  // ==========================================
  
  destroy() {
    // OPTICAL NERVE SEVERANCE - Complete removal
    // (Technical: Clear intervals and remove DOM elements)
    if (this.collisionCheckInterval) {
      clearInterval(this.collisionCheckInterval);
    }
    if (this.system) {
      this.system.remove();
    }
  }
}

// ==========================================
// DEPENDENCY VERIFICATION
// (Technical: Check required organs present)
// ==========================================

if (typeof CONFIG === 'undefined') {
  console.error('❌ beam.js requires config.js');
}
if (typeof decay === 'undefined') {
  console.error('❌ beam.js requires decay-core.js');
}