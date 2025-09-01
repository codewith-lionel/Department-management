const mongoose = require('mongoose');
const { successResponse, errorResponse } = require('../utils/response');

class HealthController {
  /**
   * Liveness probe - always returns healthy if the app is running
   */
  async liveness(req, res) {
    return successResponse(res, { status: 'alive', timestamp: new Date().toISOString() }, 'Service is alive');
  }

  /**
   * Readiness probe - checks database connectivity
   */
  async readiness(req, res) {
    try {
      // Check MongoDB connection
      const dbState = mongoose.connection.readyState;
      const isDbReady = dbState === 1; // 1 = connected

      if (!isDbReady) {
        return errorResponse(res, 'Database not ready', 503, { dbState });
      }

      // Optional: Ping the database
      await mongoose.connection.db.admin().ping();

      return successResponse(res, {
        status: 'ready',
        timestamp: new Date().toISOString(),
        database: 'connected'
      }, 'Service is ready');
    } catch (error) {
      return errorResponse(res, 'Service not ready', 503, { 
        database: 'disconnected',
        error: error.message 
      });
    }
  }
}

module.exports = new HealthController();