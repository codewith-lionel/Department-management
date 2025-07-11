const express = require("express");
const router = express.Router();
const ForemImage = require("../models/ForemImage");

// GET all forem images
router.get("/", async (req, res) => {
  try {
    const images = await ForemImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new forem image
router.post("/", async (req, res) => {
  const { imageUrl, description } = req.body; // Add description here
  try {
    const newImage = new ForemImage({
      imageUrl,
      description: description || "Forem Event", // Add description with default
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a forem image
router.delete("/:id", async (req, res) => {
  try {
    await ForemImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
