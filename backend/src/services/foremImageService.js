const ForemImage = require('../models/ForemImage');
const logger = require('../utils/logger');

class ForemImageService {
  /**
   * Get all forem images with pagination
   */
  async getAllForemImages(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [images, total] = await Promise.all([
      ForemImage.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ForemImage.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      images,
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
   * Create new forem image
   */
  async createForemImage(imageData) {
    const image = new ForemImage(imageData);
    await image.save();
    logger.info({ imageId: image._id }, 'Forem image created');
    return image;
  }

  /**
   * Get forem image by ID
   */
  async getForemImageById(id) {
    const image = await ForemImage.findById(id);
    if (!image) {
      throw new Error('Forem image not found');
    }
    return image;
  }

  /**
   * Delete forem image by ID
   */
  async deleteForemImage(id) {
    const image = await ForemImage.findByIdAndDelete(id);
    if (!image) {
      throw new Error('Forem image not found');
    }
    logger.info({ imageId: id }, 'Forem image deleted');
    return image;
  }
}

module.exports = new ForemImageService();