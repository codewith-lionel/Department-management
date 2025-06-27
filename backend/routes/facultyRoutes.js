const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// GET all faculty
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new faculty
router.post("/", async (req, res) => {
  const { name, title, imageUrl, department, specialization } = req.body;
  try {
    const newFaculty = new Faculty({
      name,
      title,
      imageUrl,
      department,
      specialization,
    });
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a faculty
router.delete("/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
