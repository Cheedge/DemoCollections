// API Configuration
const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5156',
    environment: import.meta.env.VITE_APP_ENV || 'development',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};

// Validate in development
if (config.isDevelopment && !config.apiUrl) {
    console.warn('VITE_API_URL is not set');
}

console.log('Config loaded:', {
    apiUrl: config.apiUrl,
    environment: config.environment,
});

export default config;
