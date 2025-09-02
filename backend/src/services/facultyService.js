const Faculty = require('../models/Faculty');
const logger = require('../utils/logger');

class FacultyService {
  /**
   * Get all faculty with pagination
   */
  async getAllFaculty(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [faculty, total] = await Promise.all([
      Faculty.find().skip(skip).limit(limit).lean(),
      Faculty.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      faculty,
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
   * Create new faculty
   */
  async createFaculty(facultyData) {
    const faculty = new Faculty(facultyData);
    await faculty.save();
    logger.info({ facultyId: faculty._id }, 'Faculty created');
    return faculty;
  }

  /**
   * Get faculty by ID
   */
  async getFacultyById(id) {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      throw new Error('Faculty not found');
    }
    return faculty;
  }

  /**
   * Delete faculty by ID
   */
  async deleteFaculty(id) {
    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) {
      throw new Error('Faculty not found');
    }
    logger.info({ facultyId: id }, 'Faculty deleted');
    return faculty;
  }
}

module.exports = new FacultyService();