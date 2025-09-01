const mongoose = require('mongoose');

const foremImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // Cloudinary URL or provided URL
  description: { type: String, default: 'Forem Event' }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Add indexes for common queries
foremImageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ForemImage', foremImageSchema);