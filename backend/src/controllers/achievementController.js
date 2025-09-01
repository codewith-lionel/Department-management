const achievementService = require('../services/achievementService');
const { uploadImage } = require('../utils/cloudinary');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

class AchievementController {
  /**
   * Get all achievements
   */
  async getAllAchievements(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await achievementService.getAllAchievements(page, limit);
      
      // For backward compatibility, return the array directly if no pagination requested
      if (!req.query.page && !req.query.limit) {
        return res.json(result.achievements);
      }
      
      return paginatedResponse(res, result.achievements, result.pagination, 'Achievements retrieved successfully');
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error getting achievements');
      next(error);
    }
  }

  /**
   * Create new achievement
   */
  async createAchievement(req, res, next) {
    try {
      let imageUrl = req.body.imageUrl;

      // Handle file upload if provided
      if (req.file) {
        imageUrl = await uploadImage(req.file.buffer, 'achievements');
      }

      const achievementData = {
        ...req.body,
        imageUrl
      };

      const achievement = await achievementService.createAchievement(achievementData);
      return successResponse(res, achievement, 'Achievement created successfully', 201);
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error creating achievement');
      next(error);
    }
  }

  /**
   * Delete achievement by ID
   */
  async deleteAchievement(req, res, next) {
    try {
      await achievementService.deleteAchievement(req.params.id);
      return res.json({ message: 'Achievement deleted' });
    } catch (error) {
      if (error.message === 'Achievement not found') {
        return errorResponse(res, 'Achievement not found', 404);
      }
      logger.error({ error: error.message, requestId: req.id }, 'Error deleting achievement');
      next(error);
    }
  }
}

module.exports = new AchievementController();