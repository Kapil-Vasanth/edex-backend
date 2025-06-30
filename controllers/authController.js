// controllers/authController.js
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Agent = require('../models/agentModel'); // Use the agent model
const Student = require('../models/studentModel'); // Use the agent model
const { sendPasswordResetEmail } = require('../utils/emailUtils'); // Import the email utility

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
      expiresIn: '1h', // Token expiration time
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

// Function to student login
const loginStudent = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';
  const { email, password } = req.body;

  try {
    // Find the student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for student
    const token = jwt.sign({ studentId: student._id,name:student?.first_name +" "+ student?.last_name, role: 'student' }, jwtSecret, {
      expiresIn: '1h', // Token expiration time
    });

    // Send the response with the token
    res.json({ message: 'Login successful', token, student : student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const generateStudentId = (firstname, citizenship, index) => {
    const firstInitial = firstname.slice(0,2).toUpperCase();
    const citizenshipCode = citizenship.slice(0, 2).toUpperCase();
    const paddedIndex = String(index + 1).padStart(2, '0');

    return `${firstInitial}${citizenshipCode}${paddedIndex}`;
};

const createStudent = async (req, res) => {
  const { firstname, lastname, email, citizenship, password } = req.body;
  console.log('Creating student with data:', req.body);
  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({
      $or: [
        { email },
      ]
    });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const student_id = generateStudentId(firstname, citizenship, Math.floor(Math.random() * 100));

    // Create new student
    const newStudent = new Student({
      first_name: firstname,
      last_name: lastname,
      email,
      citizenship,
      password,
      student_id
    });

    await newStudent.save();

    return res.status(201).json({
      student: newStudent,
      message: 'Student created successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create student' });
  }
};


// Forgot Password (for Student)
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Find the student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: 'No Such Email Found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

    // Store the token and expiration date in the student's document
    student.resetToken = resetToken;
    student.resetTokenExpiration = resetTokenExpiration;
    await student.save();

    // Send email with the reset link
    await sendPasswordResetEmail(student.email, resetToken, student.first_name); // Pass the first name to the email utility

    res.status(200).json({ message: 'Password reset link sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find student by reset token and check if it's not expired
    const student = await Student.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // not expired
    });
    if (!student) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }


    // Update student password and clear reset token fields
    student.password = newPassword;
    student.resetToken = undefined;
    student.resetTokenExpiration = undefined;

    await student.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  agentLogin,
  createAgent,
  createStudent,
  loginStudent,
  forgotPassword,
  resetPassword,
};
