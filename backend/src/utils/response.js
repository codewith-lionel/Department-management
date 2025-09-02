/**
 * Success response helper
 * @param {object} res - Express response object
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Error response helper
 * @param {object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {any} error - Error details
 */
const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, error = null) => {
  const response = {
    success: false,
    message
  };

  if (error && process.env.NODE_ENV !== 'production') {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

/**
 * Pagination response helper
 * @param {object} res - Express response object
 * @param {any} data - Response data
 * @param {object} pagination - Pagination info
 * @param {string} message - Success message
 */
const paginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination
  });
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse
};