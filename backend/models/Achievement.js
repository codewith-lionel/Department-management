const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  imageUrl: String, // Base64 or URL
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);