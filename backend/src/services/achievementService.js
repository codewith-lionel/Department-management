const Achievement = require('../models/Achievement');
const logger = require('../utils/logger');

class AchievementService {
  /**
   * Get all achievements with pagination
   */
  async getAllAchievements(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [achievements, total] = await Promise.all([
      Achievement.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Achievement.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      achievements,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      }
    };
  }

  /**
   * Create new achievement
   */
  async createAchievement(achievementData) {
    const achievement = new Achievement(achievementData);
    await achievement.save();
    logger.info({ achievementId: achievement._id }, 'Achievement created');
    return achievement;
  }

  /**
   * Get achievement by ID
   */
  async getAchievementById(id) {
    const achievement = await Achievement.findById(id);
    if (!achievement) {
      throw new Error('Achievement not found');
    }
    return achievement;
  }

  /**
   * Delete achievement by ID
   */
  async deleteAchievement(id) {
    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
      throw new Error('Achievement not found');
    }
    logger.info({ achievementId: id }, 'Achievement deleted');
    return achievement;
  }
}

module.exports = new AchievementService();