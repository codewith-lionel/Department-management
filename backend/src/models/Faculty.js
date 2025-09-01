const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  imageUrl: { type: String }, // Cloudinary URL or provided URL
  department: { type: String },
  specialization: { type: String }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Add indexes for common queries
facultySchema.index({ name: 1 });
facultySchema.index({ department: 1 });

module.exports = mongoose.model('Faculty', facultySchema);