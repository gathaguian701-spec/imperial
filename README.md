# PCEA CENTER YOUTHHUB — Backend (Template)

This repository contains a **Node.js / Express** backend template for PCEA CENTER YOUTHHUB (portal v1.1.6). It provides REST endpoints for:

- Prayers (anonymous/public)
- Trivia questions (levels & categories)
- Youth forum (posts & replies)
- Gallery uploads (local storage or S3)
- Payments (M-Pesa placeholders & webhook)
- AI proxy (OpenAI server-side proxy for Ethan)

> This template is meant as a starting point. Do **not** expose the `OPENAI_API_KEY` or M-Pesa secrets in client-side code.

## Quick start (local / dev)

Requirements:
- Node 18+
- Docker (optional, recommended)
- MongoDB (local or via Docker)

1. Copy `.env.example` -> `.env` and fill values (especially `OPENAI_API_KEY` if you want Ethan AI).
2. Install dependencies:
```bash
npm install
