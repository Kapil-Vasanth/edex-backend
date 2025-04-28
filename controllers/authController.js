// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agent = require('../models/agentModel'); // Use the agent model

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Agent Login
const agentLogin = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for agent
    const token = jwt.sign({ agentId: agent._id, role: 'agent' }, jwtSecret, {
      expiresIn: '1d', // Token expiration time
    });

    // Send token back to client
    res.status(200).json({ token, agent: agent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createAgent = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body

  try {
    // Check if the agent already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent already exists' }); // Return a message if the agent already exists
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new agent
    const newAgent = new Agent({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new agent to the database
    await newAgent.save();

    // Log the new agent (for debugging)
    console.log(newAgent);

    // Send a success response with the agent data and token
    return res.status(201).json({
      agent: newAgent,
      message: 'Agent created successfully',
      token: generateToken(newAgent._id), // Generate and send the token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create agent' }); // Handle any errors
  }
};



module.exports = {
  agentLogin,
  createAgent,
};
