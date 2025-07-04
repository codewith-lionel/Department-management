const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const facultyRoutes = require("./routes/facultyRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/achievements", achievementRoutes);

// Serve faculty images
const path = require("path");
app.use(
  "/faculty-image",
  express.static(path.join(__dirname, "../front-end/faculty-image"))
);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, "../front-end")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/pages/index.html"));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
