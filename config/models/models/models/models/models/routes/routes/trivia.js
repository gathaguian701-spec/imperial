// routes/trivia.js
const express = require('express');
const TriviaQuestion = require('../models/TriviaQuestion');
const router = express.Router();

// Get questions by level and category, excluding a list of answered IDs
// Query: /api/trivia?level=1&category=Bible&exclude=comma,separated,questions
router.get('/', async (req, res) => {
  const level = Number(req.query.level) || 1;
  const category = req.query.category || null;
  const exclude = (req.query.exclude || '').split(',').filter(Boolean);
  const q = { level };
  if(category) q.category = category;
  if(exclude.length) q.question = { $nin: exclude };
  const list = await TriviaQuestion.find(q).limit(50);
  res.json(list);
});

// Admin: add question (in production protect this endpoint)
router.post('/', async (req, res) => {
  const { level, category, question, options, answer } = req.body;
  if(!question || !options || !answer) return res.status(400).json({ error: 'missing' });
  const t = new TriviaQuestion({ level, category, question, options, answer });
  await t.save();
  res.status(201).json(t);
});

module.exports = router;
