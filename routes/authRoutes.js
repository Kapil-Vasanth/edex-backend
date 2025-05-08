// routes/authRoutes.js
const express = require('express');
const { agentLogin, createAgent, loginStudent, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Agent login route
router.post('/login', agentLogin);
router.post('/create', createAgent); // Route to create an agent
router.post('/student-login', loginStudent); // Route to create a student

// 📌 Forgot Password & Reset Password (Student Only)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
