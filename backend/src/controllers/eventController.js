const eventService = require('../services/eventService');
const { uploadImage } = require('../utils/cloudinary');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const logger = require('../utils/logger');

class EventController {
  /**
   * Get all events
   */
  async getAllEvents(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await eventService.getAllEvents(page, limit);
      
      // For backward compatibility, return the array directly if no pagination requested
      if (!req.query.page && !req.query.limit) {
        return res.json(result.events);
      }
      
      return paginatedResponse(res, result.events, result.pagination, 'Events retrieved successfully');
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error getting events');
      next(error);
    }
  }

  /**
   * Create new event
   */
  async createEvent(req, res, next) {
    try {
      let image = req.body.image;

      // Handle file upload if provided
      if (req.file) {
        image = await uploadImage(req.file.buffer, 'events');
      }

      const eventData = {
        ...req.body,
        image
      };

      const event = await eventService.createEvent(eventData);
      return successResponse(res, event, 'Event created successfully', 201);
    } catch (error) {
      logger.error({ error: error.message, requestId: req.id }, 'Error creating event');
      next(error);
    }
  }

  /**
   * Delete event by ID
   */
  async deleteEvent(req, res, next) {
    try {
      await eventService.deleteEvent(req.params.id);
      return res.json({ message: 'Event deleted' });
    } catch (error) {
      if (error.message === 'Event not found') {
        return errorResponse(res, 'Event not found', 404);
      }
      logger.error({ error: error.message, requestId: req.id }, 'Error deleting event');
      next(error);
    }
  }
}

module.exports = new EventController();