# AquaLeo Demo — MERN Clone (No external DB)

Ye ek demo project hai jo [aqualeodigital.com](https://aqualeodigital.com) jaisi business-consultancy website
ka clone hai — **React frontend + Express backend**. Koi MongoDB/cloud DB connect nahi hai, lekin backend
**fully functional hai**: contact form submissions `server/data/submissions.json` file mein persist hote hain
(server restart hone par bhi data safe rehta hai), proper validation, rate-limiting, aur error handling ke saath.
Frontend fully responsive hai — mobile par hamburger menu, fluid typography, aur touch-friendly layout.

## Structure

```
aqualeo-demo/
├── client/          → React (Vite) frontend
└── server/          → Express backend (mock APIs, no DB)
```

## Run karne ka tarika

### Option A (Windows) — Double-click se dono terminal apne aap khul jaayein
Pehli baar dependencies install karo (ek hi baar karna hai):
```bash
npm install
npm run install:all
```
Uske baad `start.bat` file par **double-click** karo — 2 alag CMD windows apne aap khul jaayengi,
ek SERVER (port 5000) chalayegi, dusri CLIENT (port 5173).

### Option B — Ek hi terminal se dono (concurrently)
Root folder (`aqualeo-demo/`) ke andar:
```bash
npm install
npm run install:all
npm run dev
```
Ye `concurrently` use karke backend (port 5000) aur frontend (port 5173) dono ek saath, ek hi terminal mein chala dega — colored logs ke saath (SERVER = blue, CLIENT = green).

### Option C — Do alag terminal manually
**Terminal 1 (backend):**
```bash
cd server
npm install
npm start
```
Backend chalega: `http://localhost:5000`

**Terminal 2 (frontend):**
```bash
cd client
npm install
npm run dev
```
Frontend chalega: `http://localhost:5173`

Frontend backend se services list aur contact form submit — dono `http://localhost:5000/api/...` par call karta hai.

## Kya included hai

- Fully responsive layout — mobile hamburger menu (slide-in drawer), fluid font sizes, stacking grids/forms on
  small screens, touch-friendly buttons (breakpoints at 1024px / 860px / 640px / 480px)
- Hero section + stats
- Trust/credentials badges
- Services grid (Trademark, Company Formation, Licensing, IT, Digital, E-commerce)
- Client testimonials
- Insights/blog cards
- FAQ accordion
- Contact form (Name, Email, Phone*, Company*, Message) → POST `/api/contact`
  - Server-side validation (name length, email format, message length)
  - Rate limiting: max 5 submissions per IP every 10 minutes
  - **Persisted to disk** at `server/data/submissions.json` — survives server restarts
  - GET `/api/contact` lists all saved submissions (demo/admin view)
- Services list frontend par GET `/api/services` se aata hai (mock JSON array, backend ke andar)
- `GET /api/health` — uptime/health check endpoint
- Centralized 404 + error handling middleware, request logging

## Backend "properly" kaise kaam karta hai (bina external DB ke)

- Contact form data **file-based storage** use karta hai (`server/data/submissions.json`), isliye:
  - Server restart/crash hone par bhi purana data khoya nahi jaata
  - `GET /api/contact` se koi bhi time saare submissions dekh sakte ho
- Input validation aur rate-limiting galat/spam submissions ko rokte hain
- CORS `FRONTEND_URL` env var se restrict hota hai production mein (comma-separated multiple origins bhi support karta hai)

## Baad mein real DB (MongoDB) add karna ho to

`server/server.js` mein Mongoose connect karke `server/routes/contact.js` mein
`readSubmissions()`/`writeSubmissions()` calls ki jagah `Contact.create(req.body)` /
`Contact.find()` jaisa Mongoose model call use kar dena — baaki validation/rate-limit
logic waisa hi reuse ho sakta hai.
