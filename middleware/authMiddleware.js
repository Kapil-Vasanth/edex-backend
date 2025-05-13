// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Agent = require('../models/agentModel');
const Student = require('../models/studentModel');

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';

// Universal auth middleware for both students and agents
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, jwtSecret);

    // Normalize the user and attach full object
    if (decoded.role === 'agent' && decoded.agentId) {
      const agent = await Agent.findById(decoded.agentId);
      if (!agent) return res.status(404).json({ message: 'Agent not found' });
      req.agent = agent;
      req.user = { id: agent._id.toString(), role: 'agent' };
    } else if (decoded.role === 'student' && decoded.studentId) {
      const studentId = decoded.studentId;
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      req.student = student;
      req.user = { id: student._id.toString() , role: 'student' };
    } else {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    // Attach for use in update tracking
    if (req.body) {
      req.body.last_updated_by = req.agent?.name || `${req.student?.first_name} ${req.student?.last_name}` || req.user?.id || 'unknown';
      req._updatingUser = req.agent?.name || `${req.student?.first_name} ${req.student?.last_name}` || req.user?.id || 'unknown';
    }

    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};



// Role-based authorization
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

// Allow student to only update their own profile
const allowSelfOrAdmin = () => {
  return (req, res, next) => {
    const isAgent = req.user.role === 'agent';
    const isStudentSelf =
      req.user.role === 'student' &&
      req.params?.id === req.student?.student_id;


    if (isAgent || isStudentSelf) {
      return next();
    }

    return res.status(403).json({ message: 'Access denied: not your resource' });
  };
};

module.exports = { authenticate, authorize, allowSelfOrAdmin };
