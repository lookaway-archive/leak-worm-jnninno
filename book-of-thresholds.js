/**
 * ============================================
 * SPECIMEN: JNNINNO-PROFESSIONAL-v1
 * ORGAN: CONTENT PHEROMONES
 * RETRIEVAL: November 2025, Professional Portfolio Archive
 * ============================================
 * 
 * STATUS: Operational - Three-Act Emotional Arc
 * FUNCTION: Archive transport vessel - carries professional bio
 * DEPENDENCIES: None (pure data structure)
 * 
 * SURGICAL NOTES:
 * EMOTIONAL ARC: minimal/direct → casual/conversational → poetic/flowing
 * 
 * ACT 1: Sharp, clear facts (frames are static)
 * ACT 2: Friendly pattern recognition (seeing it everywhere)
 * ACT 3: Contemplative depth (what it means)
 * ============================================
 */

const bookContent = {
  
  metadata: {
    title: "PASSWORD",
    fragment: "Professional-Portfolio",
    classification: "JUAN SEBASTIÁN NIÑO FLÓREZ",
    password: "{🌊:🌊∈🌊}",
    totalScreens: 2,
    deathMessage: 'ACCESS TERMINATED<span class="death-subtitle">passive engagement detected</span>'
  },

  screens: [
    {
      id: 0,
      type: "password",
      title: "PASSWORD",
      prompt: "Enter authentication sequence:"
    },

    {
      id: 1,
      type: "content",
      title: "WHAT IS MOTION?",
      subtitle: "",
      content: `
        <p>Hello. My name is Juan Sebastián Niño Flórez.</p>
        
        <p>I've been studying motion for a long time. As an engineer calculating derivatives. As an animator manipulating graph editors. As a lead coordinating teams.</p>
        
        <p>Here's what I discovered:</p>
        
        <p><span class="emphasis">Motion doesn't exist in frames.</span></p>
        
        <p>Frame 1: Object at position 0. Static.</p>
        
        <p>Frame 2: Object at position 10. Static.</p>
        
        <p>Play them back. The object moves.</p>
        
        <p><span class="emphasis">But where is that motion?</span></p>
        
        <p>Not in Frame 1. Not in Frame 2. It's in the gap between them. In the empty space where there are no frames to see.</p>
        
        <p>Then I started seeing the same structure everywhere:</p>
        
        <p><span class="emphasis">Neural signals.</span> Neuron A fires. Silence. Neuron B fires. The signal moves — but not in either firing.</p>
        
        <p><span class="emphasis">Clock cycles.</span> Value is 5. Nothing. Value is 7. The computation happens — but not in either cycle.</p>
        
        <p><span class="emphasis">Conscious states.</span> Experience blue. Emptiness. Experience red. Awareness shifts — but not in either state.</p>
        
        <p><span class="emphasis">Where does change actually happen?</span></p>
        
        <p>In the gap. In the silence. In the emptiness between measurable states.</p>
        
        <p>Same structure. Different speeds. 24 frames per second. 100 neural firings per second. 3 billion clock cycles per second.</p>
        
        <p>Every time — discrete states can be measured. <span class="emphasis">But motion, change, experience? They exist in what can't be captured.</span></p>
        
        <p><span class="emphasis">What is this emptiness where experience lives?</span></p>
        
        <p>The investigation started with 24 frames per second. It expanded into neural patterns, computational cycles, quantum measurements.</p>
        
        <p>This space is where I explore these questions.</p>
        
        <p class="no-break">Juan Sebastián Niño Flórez</p>
        <p class="no-break">626-540-6520</p>
        <p class="no-break">jnninno@gmail.com</p>
        <p class="no-break">{🌊:🌊∈🌊}</p>
        
        <div class="end-dot"><span class="blink-dot"></span></div>
      `,
      effects: {
        pirateComments: false,
        corruption: false,
        emphasis: []
      }
    }
  ],
  
  getScreen: function(id) {
    return this.screens.find(screen => screen.id === id);
  },
};
