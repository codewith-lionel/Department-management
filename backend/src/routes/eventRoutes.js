const express = require('express');
const eventController = require('../controllers/eventController');
const { validate, eventCreateSchema, mongoIdSchema, paginationSchema } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// GET all events
router.get('/', 
  validate({ query: paginationSchema }),
  eventController.getAllEvents
);

// POST create event
router.post('/', 
  uploadSingle,
  handleUploadError,
  validate({ body: eventCreateSchema }),
  eventController.createEvent
);

// DELETE event by ID
router.delete('/:id',
  validate({ params: mongoIdSchema }),
  eventController.deleteEvent
);

module.exports = router;