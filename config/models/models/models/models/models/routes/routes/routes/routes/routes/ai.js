// routes/ai.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Proxy a prompt to OpenAI (server-side) — protects your key
router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  if(!prompt) return res.status(400).json({error:'prompt required'});
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:'OpenAI key not configured'});

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 600
      })
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'AI request failed'});
  }
});

module.exports = router;
