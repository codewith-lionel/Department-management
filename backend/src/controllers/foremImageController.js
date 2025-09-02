const foremImageService = require('../services/foremImageService');
const { uploadImage } = require('../utils/cloudinary');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

class ForemImageController {
  /**
   * Get all forem images
   */
  async getAllForemImages(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await foremImageService.getAllForemImages(page, limit);
      
      // For backward compatibility, return the array directly if no pagination requested
      if (!req.query.page && !req.query.limit) {
        return res.json(result.images);
      }
      
      return paginatedResponse(res, result.images, result.pagination, 'Forem images retrieved successfully');
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error getting forem images');
      next(error);
    }
  }

  /**
   * Create new forem image
   */
  async createForemImage(req, res, next) {
    try {
      let imageUrl = req.body.imageUrl;

      // Handle file upload if provided
      if (req.file) {
        imageUrl = await uploadImage(req.file.buffer, 'forem-images');
      }

      const imageData = {
        ...req.body,
        imageUrl
      };

      const image = await foremImageService.createForemImage(imageData);
      return successResponse(res, image, 'Forem image created successfully', 201);
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error creating forem image');
      next(error);
    }
  }

  /**
   * Delete forem image by ID
   */
  async deleteForemImage(req, res, next) {
    try {
      await foremImageService.deleteForemImage(req.params.id);
      return res.json({ message: 'Image deleted' });
    } catch (error) {
      if (error.message === 'Forem image not found') {
        return errorResponse(res, 'Image not found', 404);
      }
      logger.error({ error: error.message, requestId: req.id }, 'Error deleting forem image');
      next(error);
    }
  }
}

module.exports = new ForemImageController();