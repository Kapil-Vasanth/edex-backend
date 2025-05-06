// routes/authRoutes.js
const express = require('express');
const { agentLogin, createAgent, loginStudent } = require('../controllers/authController');

const router = express.Router();

// Agent login route
router.post('/login', agentLogin);
router.post('/create', createAgent); // Route to create an agent
router.post('/student-login', loginStudent); // Route to create a student

module.exports = router;
