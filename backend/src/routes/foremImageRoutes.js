const express = require('express');
const foremImageController = require('../controllers/foremImageController');
const { validate, foremImageCreateSchema, mongoIdSchema, paginationSchema } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// GET all forem images
router.get('/', 
  validate({ query: paginationSchema }),
  foremImageController.getAllForemImages
);

// POST create forem image
router.post('/', 
  uploadSingle,
  handleUploadError,
  validate({ body: foremImageCreateSchema }),
  foremImageController.createForemImage
);

// DELETE forem image by ID
router.delete('/:id',
  validate({ params: mongoIdSchema }),
  foremImageController.deleteForemImage
);

module.exports = router;