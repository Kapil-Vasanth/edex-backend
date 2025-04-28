// routes/authRoutes.js
const express = require('express');
const { agentLogin, createAgent } = require('../controllers/authController');

const router = express.Router();

// Agent login route
router.post('/login', agentLogin);
router.post('/create', createAgent); // Route to create an agent

module.exports = router;
