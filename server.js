// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');

// Routes
const prayersRouter = require('./routes/prayers');
const triviaRouter = require('./routes/trivia');
const forumRouter = require('./routes/forum');
const galleryRouter = require('./routes/gallery');
const paymentsRouter = require('./routes/payments');
const aiRouter = require('./routes/ai');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '5mb'})); // allow large payloads (images encoded) — recommend using multipart for production
app.use(express.urlencoded({ extended: true }));

// Static files (optional) - serve uploaded media if using local storage
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API
app.use('/api/prayers', prayersRouter);
app.use('/api/trivia', triviaRouter);
app.use('/api/forum', forumRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/leaderboard', leaderboardRouter);

// health
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
