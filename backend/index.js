const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const facultyRoutes = require("./routes/facultyRoutes");
const achievementRoutes = require('./routes/achievementRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.error("MongoDB connection error:", err));

// Faculty API routes
app.use("/api/faculty", facultyRoutes);
app.use('/api/achievements', achievementRoutes);

// (Optional) Serve faculty images if you store them locally
const path = require("path");
app.use("/faculty-image", express.static(path.join(__dirname, "../front-end/faculty-image")));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));