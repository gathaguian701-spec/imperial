// models/GalleryItem.js
const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  filename: String,
  url: String, // S3 URL or local /uploads/...
  type: String,
  uploader: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryItem', GallerySchema);
