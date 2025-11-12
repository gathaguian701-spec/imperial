// routes/prayers.js
const express = require('express');
const Prayer = require('../models/Prayer');
const router = express.Router();

// list prayers (public)
router.get('/', async (req, res) => {
  const prayers = await Prayer.find().sort({ createdAt: -1 }).limit(200);
  res.json(prayers);
});

// post anonymous prayer
router.post('/', async (req, res) => {
  const { text, anonymous=true, author } = req.body;
  if(!text) return res.status(400).json({ error: 'text required' });
  const p = new Prayer({ text, anonymous, author: anonymous? null : author });
  await p.save();
  res.status(201).json(p);
});

// optionally delete - admin only (left as exercise)
module.exports = router;
