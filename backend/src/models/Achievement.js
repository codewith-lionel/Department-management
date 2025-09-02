const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  type: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String } // Cloudinary URL or provided URL
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Add indexes for common queries
achievementSchema.index({ createdAt: -1 });
achievementSchema.index({ type: 1 });

module.exports = mongoose.model('Achievement', achievementSchema);