// models/ForumPost.js
const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  message: { type: String, required: true },
  replies: [{ name: String, message: String, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForumPost', ForumSchema);
