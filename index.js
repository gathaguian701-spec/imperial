// index.js
// Simple Express backend storing data in data.json
// Endpoints:
// GET  /api/prayers         -> list prayers
// POST /api/prayers         -> add prayer { text }
// GET  /api/events          -> list events
// POST /api/events          -> add event { title, description, date }
// GET  /api/announcements   -> list announcements
// POST /api/announcements   -> add announcement { title, body }
// GET  /api/leaders         -> get leaders info
// PUT  /api/leaders         -> replace leaders array { leaders: [...] }
// NOTE: This uses file storage (data.json) — fine for small projects.

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(helmet());
app.use(cors()); // allow all origins (you can restrict in prod)
app.use(express.json({ limit: '10kb' }));
app.use(morgan('tiny'));

// Utility: read/write data.json
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { prayers: [], events: [], announcements: [], leaders: [] };
  }
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Initialize file if not present
if (!fs.existsSync(DATA_FILE)) {
  writeData({ prayers: [], events: [], announcements: [], leaders: [
    { role: "Chairperson", name: "Zachary Gikonyo" },
    { role: "Vice Chairperson", name: "Dalson Maina" },
    { role: "Secretary", name: "Ian Gathagu" },
    { role: "Vice Secretary", name: "Lydia Wamuyu" },
    { role: "Treasurer", name: "Winnie Maundu" }
  ] });
}

// --- Routes ---

app.get('/', (req, res) => res.json({ ok: true, app: "PCEA Center Youth Backend" }));

// PRAYERS
app.get('/api/prayers', (req, res) => {
  const d = readData();
  res.json(d.prayers || []);
});

app.post('/api/prayers', (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text is required' });

  const d = readData();
  const entry = { id: Date.now(), text, date: new Date().toISOString() };
  d.prayers = d.prayers || [];
  d.prayers.push(entry);
  writeData(d);
  res.status(201).json(entry);
});

// EVENTS
app.get('/api/events', (req, res) => {
  const d = readData();
  res.json(d.events || []);
});

app.post('/api/events', (req, res) => {
  const { title, description, date } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'title and description required' });

  const d = readData();
  const entry = { id: Date.now(), title, description, date: date || null };
  d.events = d.events || [];
  d.events.push(entry);
  writeData(d);
  res.status(201).json(entry);
});

// ANNOUNCEMENTS
app.get('/api/announcements', (req, res) => {
  const d = readData();
  res.json(d.announcements || []);
});

app.post('/api/announcements', (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'title and body required' });

  const d = readData();
  const entry = { id: Date.now(), title, body, date: new Date().toISOString() };
  d.announcements = d.announcements || [];
  d.announcements.push(entry);
  writeData(d);
  res.status(201).json(entry);
});

// LEADERS
app.get('/api/leaders', (req, res) => {
  const d = readData();
  res.json(d.leaders || []);
});

app.put('/api/leaders', (req, res) => {
  const leaders = req.body.leaders;
  if (!Array.isArray(leaders)) return res.status(400).json({ error: 'leaders must be an array' });
  const d = readData();
  d.leaders = leaders;
  writeData(d);
  res.json(d.leaders);
});

// Simple health
app.get('/health', (req, res) => res.send('OK'));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PCEA backend listening on port ${PORT}`);
});
