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

## Ab ye ek asli multi-page site hai (single static page nahi)

`react-router-dom` add kiya gaya hai. Ye alag routes hain:

- `/` — Home (Hero, Trust/About, Services, Testimonials, Insights teaser, FAQ, Contact)
- `/insights` — Poori Insights listing, category filter ke saath (Company Formation, Trademark & IP, Licensing, Digital, Compliance)
- `/insights/:slug` — Har article ka apna detail page, backend se `GET /api/insights/:slug` se aata hai
- `/careers` — Open positions list (department filter ke saath) + "Apply" button jo modal form kholta hai
- `/careers` apply modal → `POST /api/careers/apply` par submit hota hai
- `*` (koi bhi galat URL) — 404 page

Navbar aur Footer ke "Insights" aur "Careers" links pehle sirf same-page anchors the (Careers ka to
section hi nahi tha), isiliye wo "open" nahi ho rahe the. Ab dono proper routed pages hain.

## Kya included hai

- Fully responsive layout — mobile hamburger menu (slide-in drawer), fluid font sizes, stacking grids/forms on
  small screens, touch-friendly buttons (breakpoints at 1024px / 860px / 640px / 480px)
- Hero section + stats
- Trust/credentials badges (id="about" — navbar ka "About us" link ab yahi scroll karta hai)
- Services grid (Trademark, Company Formation, Licensing, IT, Digital, E-commerce)
- Client testimonials
- Insights: home page par teaser + poora `/insights` listing page + per-article `/insights/:slug` page
- Careers: `/careers` page — perks, department-filtered job list, aur apply modal jo backend ko submit karta hai
- FAQ accordion
- Contact form (Name, Email, Phone*, Company*, Message) → POST `/api/contact`
  - Server-side validation (name length, email format, message length)
  - Rate limiting: max 5 submissions per IP every 10 minutes
  - **Persisted to disk** at `server/data/submissions.json` — survives server restarts
  - GET `/api/contact` lists all saved submissions (demo/admin view)
- Services list frontend par GET `/api/services` se aata hai (mock JSON array, backend ke andar)
- Insights list/detail `GET /api/insights` aur `GET /api/insights/:slug` se aata hai
- Careers list `GET /api/careers/jobs`, applications `POST /api/careers/apply` se **persist** hoti hain
  `server/data/applications.json` mein (GET `/api/careers/applications` se dekh sakte ho)
- `GET /api/health` — uptime/health check endpoint
- Centralized 404 + error handling middleware, request logging

## Production deploy karte waqt (SPA routing)

Kyunki ab client-side routing hai, agar `client` ko static hosting (Render Static Site, Netlify, Vercel, etc.)
par deploy karo to un sab platforms mein ek **SPA fallback / rewrite rule** set karna padega:
saari unmatched routes (`/insights`, `/careers`, etc.) ko `index.html` par serve karo, warna direct URL
open karne ya refresh karne par 404 aayega. `npm run dev` aur `vite preview` mein ye already automatically
handle hota hai.

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
