// Real-world configuration structure
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true
    }
  },

  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    }
  },

  // Authentication
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '7d',
    bcryptRounds: 12
  },

  // External APIs
  apis: {
    payment: {
      url: process.env.PAYMENT_API_URL,
      key: process.env.PAYMENT_API_KEY
    },
    email: {
      service: process.env.EMAIL_SERVICE,
      apiKey: process.env.EMAIL_API_KEY
    }
  },

  // Feature flags
  features: {
    newDashboard: process.env.FEATURE_NEW_DASHBOARD === 'true',
    darkMode: process.env.FEATURE_DARK_MODE === 'true',
    experimental: process.env.FEATURE_EXPERIMENTAL === 'true'
  }
};

module.exports = config;