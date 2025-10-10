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
  
  // Visualization Demos
  'high-traffic': {
    type: 'visualization',
    tabs: ['visualization', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'SCALE2024'
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
    accessCode: 'SECURE2024'
  },
  
  // Simulation Demos
  'pagination': {
    type: 'simulation',
    tabs: ['simulation', 'performance', 'code'],
    access: 'free'
  },
  
  // Messaging Flow Demos
  'kafka': {
    type: 'flow',
    tabs: ['flow', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'KAFKA2024'
  },
  'rabbitmq': {
    type: 'flow',
    tabs: ['flow', 'architecture', 'code'],
    access: 'free'
  },
  
  // Event Sourcing
  'event-sourcing': {
    type: 'event',
    tabs: ['event-stream', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'EVENT2024'
  },
  'cqrs': {
    type: 'pattern',
    tabs: ['pattern-demo', 'architecture', 'code'],
    access: 'premium',
    accessCode: 'CQRS2024'
  },
  
  // Default configuration for unconfigured demos
  'default': {
    type: 'standard',
    tabs: ['architecture', 'code'],
    access: 'free'
  }
};

export default demoConfig;