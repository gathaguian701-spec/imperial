// models/Prayer.js
const mongoose = require('mongoose');

const PrayerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  anonymous: { type: Boolean, default: true },
  author: { type: String, default: null }, // optional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prayer', PrayerSchema);
