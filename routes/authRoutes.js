// routes/authRoutes.js
const express = require('express');
const { agentLogin, createAgent, loginStudent, forgotPassword, resetPassword, createStudent } = require('../controllers/authController');

const router = express.Router();

// Agent login route
router.post('/login', agentLogin);
router.post('/create', createAgent); // Route to create an agent
router.post('/student-login', loginStudent); // Route to login a student
router.post('/student-signup', createStudent); // Route to signup a student

// 📌 Forgot Password & Reset Password (Student Only)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
