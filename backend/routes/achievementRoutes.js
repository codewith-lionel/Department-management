const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new achievement
router.post('/', async (req, res) => {
  console.log(req.body); // <-- Add this line
  try {
    const { type, title, description, imageUrl } = req.body;
    const achievement = new Achievement({ type, title, description, imageUrl });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an achievement
router.delete('/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;