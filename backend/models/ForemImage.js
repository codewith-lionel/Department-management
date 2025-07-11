const mongoose = require("mongoose");

const foremImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  description: { type: String, default: "Forem Event" }, // Add description field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ForemImage", foremImageSchema);
