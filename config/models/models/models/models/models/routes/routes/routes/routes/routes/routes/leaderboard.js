// routes/leaderboard.js
const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router();

router.get('/', async (req, res) => {
  const top = await Leaderboard.find().sort({ score: -1, achievedAt: 1 }).limit(50);
  res.json(top);
});

router.post('/', async (req, res) => {
  const { name, score, level } = req.body;
  if(!name || score === undefined) return res.status(400).json({ error:'name & score required' });
  const entry = new Leaderboard({ name, score, level: level || 1 });
  await entry.save();
  res.status(201).json(entry);
});

module.exports = router;
