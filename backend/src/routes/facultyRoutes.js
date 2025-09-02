const express = require('express');
const facultyController = require('../controllers/facultyController');
const { validate, facultyCreateSchema, mongoIdSchema, paginationSchema } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// GET all faculty
router.get('/', 
  validate({ query: paginationSchema }),
  facultyController.getAllFaculty
);

// POST create faculty
router.post('/', 
  uploadSingle,
  handleUploadError,
  validate({ body: facultyCreateSchema }),
  facultyController.createFaculty
);

// DELETE faculty by ID
router.delete('/:id',
  validate({ params: mongoIdSchema }),
  facultyController.deleteFaculty
);

module.exports = router;