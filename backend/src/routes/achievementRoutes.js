const express = require('express');
const achievementController = require('../controllers/achievementController');
const { validate, achievementCreateSchema, mongoIdSchema, paginationSchema } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// GET all achievements
router.get('/', 
  validate({ query: paginationSchema }),
  achievementController.getAllAchievements
);

// POST create achievement
router.post('/', 
  uploadSingle,
  handleUploadError,
  validate({ body: achievementCreateSchema }),
  achievementController.createAchievement
);

// DELETE achievement by ID
router.delete('/:id',
  validate({ params: mongoIdSchema }),
  achievementController.deleteAchievement
);

module.exports = router;