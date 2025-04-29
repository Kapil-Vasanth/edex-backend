// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Agent = require('../models/agentModel'); // Assuming the agent model is in the models folder

// Middleware to check if the agent is authenticated
const authenticateAgent = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'yourSecretKey' with your actual secret key

    // Find the agent based on the decoded ID
    const agent = await Agent.findById(decoded.agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Attach the agent to the request object for future use
    req.agent = agent;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { authenticateAgent };
