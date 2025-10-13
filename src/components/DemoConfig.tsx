const demoConfig = {
  // Standard API Demos
  'jwt': {
    type: 'api',
    method: 'Post',
    tabs: ['playground', 'architecture', 'code', 'interactive'],
    access: 'free'
  },
  'oauth': {
    type: 'api',
    method: 'Post',
    tabs: ['playground', 'architecture', 'code', 'interactive'],
    access: 'free'
  },
  'restful': {
    type: 'api',
    tabs: ['playground', 'architecture', 'code'],
    access: 'free'
  },
  'integration': {
    type: 'api',
    tabs: ['playground', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'INTEGRATION2025'   
  },
  
  // Visualization Demos
  'high-traffic': {
    type: 'visualization',
    tabs: ['visualization', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'SCALE2025'
  },
  'redis': {
    type: 'visualization',
    tabs: ['visualization', 'performance', 'code'],
    access: 'free'
  },
  
  // Security Demos
  'owasp': {
    type: 'comparison',
    tabs: ['comparison', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'SECURE2025'
  },
  'csrf': {
    type: 'api',
    tabs: ['playground', 'architecture', 'code'],
    access: 'free',
  },
  'compliance':{
    type: 'comparison',
    tabs: ['comparison', 'architecture', 'code'],
    access: 'free',
  },
  
  // Simulation Demos
  'pagination': {
    type: 'simulation',
    tabs: ['simulation', 'performance', 'code'],
    access: 'free'
  },
  
  // Messaging Flow Demos
  'kafka': {
    type: 'message',
    tabs: ['flow', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'KAFKA2025'
  },
  'rabbitmq': {
    type: 'flow',
    tabs: ['flow', 'architecture', 'code'],
    access: 'free',
    // accessCode: 'RABB2025'
  },
  'message-compare':{
    type: 'message',
    tabs: ['message'],
    access: 'premium',
    accessCode: 'MSG2025'
  },
  
  // Event Sourcing
  'event-sourcing': {
    type: 'event',
    tabs: ['architecture', 'code', 'interactive'],
    access: 'premium',
    accessCode: 'EVENT2025'
  },
  'cqrs': {
    type: 'pattern',
    tabs: ['architecture', 'code', 'pattern-demo'],
    access: 'free',
    // accessCode: 'CQRS2025'
  },

  // Advanced
  'expression-tree':{
    type: 'pattern',
    tabs: ['pattern', 'architecture', 'code'],
    access: 'free'
  },

  // AI
  'openai':{
    type: 'event',
    tabs: ['architecture', 'code', 'interactive'],
    access: 'premium',
    accessCode: 'OPENAIAPI2025'    
  },
  
  // Default configuration for unconfigured demos
  'default': {
    type: 'standard',
    tabs: ['architecture', 'code'],
    access: 'free'
  }
};

export default demoConfig;