const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const StudentRoute = require('./routes/studentRoutes');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));


// Database connection
connectDB()
  .then(() => {
    // Only start the server if the DB is connected successfully
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process with failure
  });

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Backend is running smoothly!' });
});
app.use('/api/students', StudentRoute);

