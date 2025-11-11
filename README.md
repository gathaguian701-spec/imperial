# PCEA Center Youth - Backend (Simple Express)

## What this is
A tiny Express backend that stores prayers, events, announcements and leaders in a local `data.json` file. Suitable as a lightweight backend for the GitHub Pages portal (portal calls this API).

## Endpoints
- `GET /api/prayers` — list prayers
- `POST /api/prayers` — add prayer `{ "text": "..." }`
- `GET /api/events` — list events
- `POST /api/events` — add event `{ "title": "...", "description": "...", "date": "..." }`
- `GET /api/announcements` — list announcements
- `POST /api/announcements` — add announcement `{ "title": "...", "body": "..." }`
- `GET /api/leaders` — get leaders array
- `PUT /api/leaders` — replace leaders `{ "leaders": [ {role,name}, ... ] }`

## Run locally
```bash
git clone <repo>
cd <repo>
npm install
# create data.json (optional) or use the included one
npm start
# server listens on PORT (default 5000)
