// models/agentModel.js
const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'agent',
  },
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
