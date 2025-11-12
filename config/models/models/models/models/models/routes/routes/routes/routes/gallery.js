// routes/gallery.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const GalleryItem = require('../models/GalleryItem');
const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// upload one file
router.post('/upload', upload.single('file'), async (req, res) => {
  const f = req.file;
  if(!f) return res.status(400).json({error:'no file'});
  const item = new GalleryItem({
    filename: f.filename,
    url: `/uploads/${f.filename}`, // if serving statically
    type: f.mimetype,
    uploader: req.body.uploader || 'Anonymous'
  });
  await item.save();
  res.status(201).json(item);
});

// list
router.get('/', async (req, res) => {
  const items = await GalleryItem.find().sort({ createdAt: -1 }).limit(200);
  res.json(items);
});

module.exports = router;
