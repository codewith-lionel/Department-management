const Event = require('../models/Event');
const logger = require('../utils/logger');

class EventService {
  /**
   * Get all events with pagination, sorted by date (newest first)
   */
  async getAllEvents(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [events, total] = await Promise.all([
      Event.find().sort({ date: -1 }).skip(skip).limit(limit).lean(),
      Event.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      events,
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
   * Create new event
   */
  async createEvent(eventData) {
    const event = new Event(eventData);
    await event.save();
    logger.info({ eventId: event._id }, 'Event created');
    return event;
  }

  /**
   * Get event by ID
   */
  async getEventById(id) {
    const event = await Event.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  /**
   * Delete event by ID
   */
  async deleteEvent(id) {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      throw new Error('Event not found');
    }
    logger.info({ eventId: id }, 'Event deleted');
    return event;
  }
}

module.exports = new EventService();