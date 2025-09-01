const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true }, // Changed from String to Date
  description: { type: String, required: true },
  image: { type: String } // Cloudinary URL or provided URL
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Add indexes for common queries and sorting
eventSchema.index({ date: -1 });
eventSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Event', eventSchema);