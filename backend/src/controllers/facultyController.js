const facultyService = require('../services/facultyService');
const { uploadImage } = require('../utils/cloudinary');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

class FacultyController {
  /**
   * Get all faculty
   */
  async getAllFaculty(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await facultyService.getAllFaculty(page, limit);
      
      // For backward compatibility, return the array directly if no pagination requested
      if (!req.query.page && !req.query.limit) {
        return res.json(result.faculty);
      }
      
      return paginatedResponse(res, result.faculty, result.pagination, 'Faculty retrieved successfully');
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error getting faculty');
      next(error);
    }
  }

  /**
   * Create new faculty
   */
  async createFaculty(req, res, next) {
    try {
      let imageUrl = req.body.imageUrl;

      // Handle file upload if provided
      if (req.file) {
        imageUrl = await uploadImage(req.file.buffer, 'faculty');
      }

      const facultyData = {
        ...req.body,
        imageUrl
      };

      const faculty = await facultyService.createFaculty(facultyData);
      return successResponse(res, faculty, 'Faculty created successfully', 201);
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error creating faculty');
      next(error);
    }
  }

  /**
   * Delete faculty by ID
   */
  async deleteFaculty(req, res, next) {
    try {
      await facultyService.deleteFaculty(req.params.id);
      return res.json({ message: 'Faculty deleted' });
    } catch (error) {
      if (error.message === 'Faculty not found') {
        return errorResponse(res, 'Faculty not found', 404);
      }
      logger.error({ error: error.message, requestId: req.id }, 'Error deleting faculty');
      next(error);
    }
  }
}

module.exports = new FacultyController();