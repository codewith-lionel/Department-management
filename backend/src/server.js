const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error({ error: err.message, stack: err.stack }, 'Unhandled Promise Rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error({ error: err.message, stack: err.stack }, 'Uncaught Exception');
  process.exit(1);
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 10000, // Timeout connection after 10s
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error({ error: error.message }, 'MongoDB connection failed');
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(config.PORT, () => {
      logger.info({ port: config.PORT }, 'Server started successfully');
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      logger.info({ signal }, 'Received shutdown signal');
      
      server.close(async () => {
        logger.info('HTTP server closed');
        
        try {
          await mongoose.connection.close();
          logger.info('MongoDB connection closed');
          process.exit(0);
        } catch (error) {
          logger.error({ error: error.message }, 'Error during graceful shutdown');
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to start server');
    process.exit(1);
  }
};

// Start the application
startServer();