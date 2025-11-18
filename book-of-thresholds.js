/**
 * ============================================
 * SPECIMEN: JNNINNO-PROFESSIONAL-v1
 * ORGAN: CONTENT PHEROMONES
 * RETRIEVAL: November 2025, Professional Portfolio Archive
 * ============================================
 * 
 * STATUS: Operational - Professional Variant
 * FUNCTION: Archive transport vessel - carries professional bio and credentials
 * DEPENDENCIES: None (pure data structure)
 * 
 * SURGICAL NOTES:
 * This organ contains Juan Sebastián Niño Flórez's professional presentation.
 * The specimen serves as a living transport mechanism for portfolio information,
 * releasing the content in a permanent ocean-depth aesthetic (pirate mode).
 * 
 * The archive structure consists of 2 segments (0-1):
 * - Segment 0: Authentication membrane (security protocol)
 * - Segment 1: Professional bio and credentials
 * 
 * No reward screen. Button is grayed out and non-functional by design.
 * The password {🌊:🌊∈🌊} encodes the vessel's pattern in set notation.
 * ============================================
 */

// ARCHIVAL TRANSPORT VESSEL - Professional bio container
// (Technical: Main data structure containing portfolio information)
const bookContent = {
  
  // ARCHIVE METADATA - Classification markers
  // (Technical: Fragment identification and access protocol)
  metadata: {
    title: "PASSWORD",
    fragment: "Professional-Portfolio",
    classification: "JUAN SEBASTIÁN NIÑO FLÓREZ",
    password: "{🌊:🌊∈🌊}",
    totalScreens: 2,
    deathMessage: 'ACCESS TERMINATED<span class="death-subtitle">passive engagement detected</span>'
  },

  // ARCHIVE SEGMENTS - Content structure
  // (Technical: Array of message segments)
  screens: [
    // ==========================================
    // SECURITY PROTOCOL - Authentication gate
    // (Technical: Password verification before content access)
    // ==========================================
    {
      id: 0,
      type: "password",
      title: "PASSWORD",
      prompt: "Enter authentication sequence:"
    },

    // ==========================================
    // THE PATTERN REVELATION - Minimal/Direct style
    // (Technical: Main content - stripped to essentials)
    // ==========================================
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
        
        <p>Frame 1: Ball at position 0. Static.</p>
        
        <p>Frame 2: Ball at position 10. Static.</p>
        
        <p>Play them back. The ball moves. But that movement isn't in either frame. You create it. The motion exists in the gap.</p>
        
        <p>Then I started seeing this pattern everywhere.</p>
        
        <p><span class="emphasis">Your brain fires a signal.</span> Neuron A is active. Then silence. No signal. Nothing firing. Then neuron B is active. Your thought moves from A to B. But the movement isn't in either firing. It's in the gap.</p>
        
        <p><span class="emphasis">A computer updates a value.</span> Clock cycle 1: the number is 5. Then the chip waits. Billions of transistors settling. No computation happening. Clock cycle 2: the number is 7. The computer changed the value. But the change isn't in either cycle. It's in the gap.</p>
        
        <p><span class="emphasis">You have a thought.</span> "I see blue." Then a moment of nothing. No thought. Just awareness. "I see red." Consciousness shifted. But the shift isn't in either thought. It's in the gap.</p>
        
        <p>Same structure. Different speeds.</p>
        
        <p>Animation: 24 times per second. Neurons: around 100 times per second. Processors: 3 billion times per second. Thoughts: hard to measure precisely.</p>
        
        <p>In every case the states are static. The motion, the change, the shift only appears when an observer connects them across the gap.</p>
        
        <p><span class="emphasis">This space is where I explore these questions.</span></p>
        
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
  
  // ==========================================
  // ARCHIVE RETRIEVAL - Segment access function
  // (Technical: Utility method to retrieve specific segments)
  // ==========================================
  
  getScreen: function(id) {
    // SEGMENT LOOKUP - Find specific archive section
    // (Technical: Return segment object by ID)
    return this.screens.find(screen => screen.id === id);
  },
};