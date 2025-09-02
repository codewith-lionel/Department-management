const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    requestId: req.id
  }, 'Unhandled error');

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return errorResponse(res, message, 400);
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, `${field} already exists`, 409);
  }

  // Zod validation error
  if (err.name === 'ZodError') {
    const message = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return errorResponse(res, message, 400);
  }

  // Default error
  return errorResponse(res, err.message || 'Internal Server Error', err.statusCode || 500);
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  logger.warn({
    method: req.method,
    url: req.url,
    requestId: req.id
  }, 'Route not found');
  
  return errorResponse(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler
};