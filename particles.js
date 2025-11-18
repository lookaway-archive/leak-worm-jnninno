/**
 * ============================================
 * SPECIMEN: LEAK-WORM-847T
 * ORGAN: ATMOSPHERIC DRIFT MECHANISM
 * RETRIEVAL: October 2025, Tlönian Research Facility
 * ============================================
 * 
 * STATUS: Operational - v2.5 SMALLER + BLUR
 * FUNCTION: Environmental particle system - creates depth perception through drift
 * DEPENDENCIES: decay-core.js (lifecycle sync), beam.js (collision reveal)
 * 
 * SURGICAL NOTES:
 * The specimen generates its own atmosphere - a 3-layer particle field
 * that simulates spatial depth. Particles drift upward continuously,
 * like phosphor dust rising from the organism's metabolism.
 * 
 * Each layer moves at different speeds (parallax effect):
 * - FAR: 25 particles, smallest, heavily blurred (background)
 * - MID: 18 particles, medium size, moderate blur (midground)
 * - NEAR: 7 particles, largest, sharpest (foreground)
 * 
 * Critical behavior: Particles illuminate when the electron beam
 * passes over them, suggesting they contain trace phosphor compounds
 * from the organism's respiration. During decay, particles fade and
 * disappear, representing atmospheric breakdown.
 * ============================================
 */

class ParticleDrift {
  constructor() {
    // ATMOSPHERIC CONSTANTS - Environmental parameters
    // (Technical: Configuration and DOM references)
    this.root = document.documentElement;
    
    // DEVICE DETECTION - Mobile optimization
    // (Technical: Reduce particle count on mobile devices)
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const particleMultiplier = this.isMobile ? 0.6 : 1.0;
    
    // STRATOSPHERIC LAYERS - Three depth planes
    // (Technical: Particle layer configuration)
    this.layers = {
      far: { 
        count: Math.floor(25 * particleMultiplier),  // Background density
        sizeRange: [1.5, 3],                         // Smallest particles
        blurRange: [3, 5],                           // Heavy atmospheric haze
        speed: 60,                                    // Slowest drift
        field: null                                  // DOM container
      },
      mid: { 
        count: Math.floor(18 * particleMultiplier),  // Middle density
        sizeRange: [2, 4],                           // Medium particles
        blurRange: [1, 2],                           // Moderate blur
        speed: 35,                                    // Medium drift
        field: null                                  // DOM container
      },
      near: { 
        count: Math.floor(7 * particleMultiplier),   // Foreground density
        sizeRange: [3, 5],                           // Largest particles
        blurRange: [0, 0.5],                         // Sharpest focus
        speed: 15,                                    // Fastest drift
        field: null                                  // DOM container
      }
    };
    
    // METABOLIC STATE - Tracks organism health
    // (Technical: Current decay stage for opacity adjustments)
    this.decayState = 'healthy';
  }
  
  // ==========================================
  // ATMOSPHERIC GENERATION - Initialize system
  // (Technical: Create particle fields and start drift)
  // ==========================================
  
  init() {
    // ATMOSPHERE SYNTHESIS - Begin particle generation
    // (Technical: Setup DOM and create all particles)
    
    this.createParticleFields();
    this.createAllParticles();
    
    // METABOLIC COUPLING - Link to organism lifecycle
    // (Technical: Subscribe to decay state changes)
    if (window.decay) {
      window.decay.subscribe((stage, progress) => {
        this.syncToDecay(stage, progress);
      });
    }
    
    // BEAM INTERACTION - Phosphor excitation on contact
    // (Technical: Setup collision detection with electron beam)
    if (window.beam) {
      this.integrateWithBeam();
    }
  }
  
  // ==========================================
  // SPATIAL SCAFFOLDING - Container structure
  // (Technical: Create DOM containers for particle layers)
  // ==========================================
  
  createParticleFields() {
    // ATMOSPHERIC CHAMBERS - Layer containers
    // (Technical: Build HTML structure for particle fields)
    
    const container = document.createElement('div');
    container.className = 'particle-container';
    container.innerHTML = `
      <div class="particle-field" id="particles-far"></div>
      <div class="particle-field" id="particles-mid"></div>
      <div class="particle-field" id="particles-near"></div>
    `;
    document.body.appendChild(container);
    
    // LAYER REGISTRATION - Store field references
    // (Technical: Cache DOM elements for each layer)
    this.layers.far.field = document.getElementById('particles-far');
    this.layers.mid.field = document.getElementById('particles-mid');
    this.layers.near.field = document.getElementById('particles-near');
  }
  
  // ==========================================
  // PARTICLE SYNTHESIS - Generate all layers
  // (Technical: Create particles for each depth plane)
  // ==========================================
  
  createAllParticles() {
    // ATMOSPHERIC POPULATION - Fill all layers
    // (Technical: Loop through layers and create particles)
    
    Object.entries(this.layers).forEach(([name, layer]) => {
      this.createLayerParticles(name, layer);
    });
  }
  
  createLayerParticles(name, layer) {
    // PARTICLE GENERATION - Individual layer creation
    // (Technical: Generate particles with random properties)
    
    layer.field.innerHTML = '';
    
    for (let i = 0; i < layer.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.dataset.layer = name;
      
      // HORIZONTAL DISTRIBUTION - Gaussian clustering
      // (Technical: Bell curve distribution for natural look)
      const x = this.gaussianRandom(50, 20);
      particle.style.left = Math.max(5, Math.min(95, x)) + '%';
      
      // SIZE VARIATION - Random within range
      // (Technical: Vary particle size for organic feel)
      const size = layer.sizeRange[0] + 
                   Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]);
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // ATMOSPHERIC BLUR - Depth simulation
      // (Technical: Apply blur based on layer depth)
      const blur = layer.blurRange[0] + 
                  Math.random() * (layer.blurRange[1] - layer.blurRange[0]);
      particle.style.filter = `blur(${blur}px)`;
      particle.dataset.baseBlur = blur; // Store for beam interaction
      
      // DRIFT PHASE - Staggered animation start
      // (Technical: Random delay for natural movement)
      const delay = -Math.random() * layer.speed;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${layer.speed}s`;
      
      layer.field.appendChild(particle);
    }
  }
  
  // ==========================================
  // STATISTICAL DISTRIBUTION - Natural clustering
  // (Technical: Gaussian random number generator)
  // ==========================================
  
  gaussianRandom(mean, stdDev) {
    // BELL CURVE GENERATOR - Natural distribution
    // (Technical: Box-Muller transform for normal distribution)
    
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z0 * stdDev;
  }
  
  // ==========================================
  // ATMOSPHERIC DECAY - Lifecycle synchronization
  // (Technical: Adjust particle opacity based on health)
  // ==========================================
  
  syncToDecay(stage, progress) {
    // ATMOSPHERIC DEGRADATION - Opacity reduction
    // (Technical: Map decay stages to particle visibility)
    
    this.decayState = stage;
    
    const opacityMultipliers = {
      healthy: 1.0,     // Full atmosphere
      panic: 0.8,       // Slight thinning
      decay: 0.5,       // Heavy degradation
      death: 0.2        // Near vacuum
    };
    
    const multiplier = opacityMultipliers[stage] || 1.0;
    this.root.style.setProperty('--particle-decay-multiplier', multiplier);
    
    // PARTICLE DEATH - Random fadeout during decay
    // (Technical: Progressively hide particles as organism dies)
    if (stage === 'decay') {
      this.fadeOutRandomParticles(0.4);
    } else if (stage === 'death') {
      this.fadeOutRandomParticles(0);
    }
  }
  
  fadeOutRandomParticles(targetRatio) {
    // SELECTIVE EXTINCTION - Gradual particle removal
    // (Technical: Fade out particles beyond target count)
    
    Object.values(this.layers).forEach(layer => {
      const particles = layer.field.querySelectorAll('.particle');
      const targetCount = Math.floor(particles.length * targetRatio);
      
      particles.forEach((p, i) => {
        if (i >= targetCount) {
          p.style.transition = 'opacity 2s ease-out';
          p.style.opacity = '0';
        }
      });
    });
  }
  
  // ==========================================
  // PHOSPHOR EXCITATION - Beam interaction
  // (Technical: Illuminate particles near electron beam)
  // ==========================================
  
  integrateWithBeam() {
    // COLLISION DETECTION - Beam proximity check
    // (Technical: Check particle distance from beam position)
    
    if (!window.beam || !window.beam.body) return;
    
    setInterval(() => {
      const beamBody = window.beam.body;
      if (!beamBody) return;
      
      // BEAM POSITION - Current scan location
      // (Technical: Get beam Y coordinate)
      const beamRect = beamBody.getBoundingClientRect();
      const beamY = beamRect.top + beamRect.height / 2;
      
      // PARTICLE ILLUMINATION - Check each particle
      // (Technical: Calculate distance and apply glow)
      document.querySelectorAll('.particle').forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleY = rect.top + rect.height / 2;
        const distance = Math.abs(beamY - particleY);
        
        const layer = particle.dataset.layer;
        
        // EXCITATION RANGE - Layer-specific sensitivity
        // (Technical: Different ranges for depth layers)
        const range = layer === 'far' ? 120 : 
                     layer === 'mid' ? 90 : 60;
        
        if (distance < range) {
          // PHOSPHOR ACTIVATION - Brightness boost
          // (Technical: Apply glow based on proximity)
          const intensity = 1 - (distance / range);
          particle.classList.add('beam-revealed');
          
          // LUMINOSITY CALCULATION - Preserve base blur
          // (Technical: Brighten without losing depth blur)
          const baseBlur = parseFloat(particle.dataset.baseBlur) || 0;
          const brightness = 1 + (intensity * 0.8);
          particle.style.filter = `blur(${baseBlur}px) brightness(${brightness})`;
          
        } else {
          // RELAXATION STATE - Return to normal
          // (Technical: Remove glow when beam passes)
          particle.classList.remove('beam-revealed');
          const baseBlur = parseFloat(particle.dataset.baseBlur) || 0;
          particle.style.filter = `blur(${baseBlur}px)`;
        }
      });
    }, 40);
  }
  
  // ==========================================
  // DISPOSAL PROTOCOL - Clean removal
  // (Technical: Cleanup method)
  // ==========================================
  
  destroy() {
    // ATMOSPHERIC EVACUATION - Complete removal
    // (Technical: Remove all particle containers)
    const container = document.querySelector('.particle-container');
    if (container) container.remove();
  }
}

// ==========================================
// DEPENDENCY VERIFICATION
// (Technical: Check required organs present)
// ==========================================

if (typeof CONFIG === 'undefined') {
  console.error('❌ particles.js requires config.js');
}
if (typeof decay === 'undefined') {
  console.error('❌ particles.js requires decay-core.js');
}