const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  imageUrl: { type: String }, // store path or URL of the image
  department: { type: String },
  specialization: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Faculty", facultySchema);
