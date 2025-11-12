// models/TriviaQuestion.js
const mongoose = require('mongoose');

const TriviaSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  category: { type: String, default: 'General' },
  question: { type: String, required: true, unique: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TriviaQuestion', TriviaSchema);
