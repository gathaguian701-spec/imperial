// routes/forum.js
const express = require('express');
const ForumPost = require('../models/ForumPost');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await ForumPost.find().sort({ createdAt: -1 }).limit(200);
  res.json(posts);
});

router.post('/', async (req, res) => {
  const { name, title, message } = req.body;
  if(!message) return res.status(400).json({error:'message required'});
  const post = new ForumPost({ name, title, message });
  await post.save();
  res.status(201).json(post);
});

router.post('/:id/reply', async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;
  const post = await ForumPost.findById(id);
  if(!post) return res.status(404).json({error:'not found'});
  post.replies.push({ name, message });
  await post.save();
  res.json(post);
});

module.exports = router;
