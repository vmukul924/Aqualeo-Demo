# AquaLeo Demo — MERN Clone (No DB)

Ye ek demo project hai jo [aqualeodigital.com](https://aqualeodigital.com) jaisi business-consultancy website
ka clone hai — **React frontend + Express backend**, lekin **MongoDB/DB connect nahi kiya gaya hai**.
Backend sirf in-memory mock data serve karta hai aur contact form submission ko console mein log karta hai.

## Structure

```
aqualeo-demo/
├── client/          → React (Vite) frontend
└── server/          → Express backend (mock APIs, no DB)
```

## Run karne ka tarika

### 1. Backend start karo
```bash
cd server
npm install
npm start
```
Backend chalega: `http://localhost:5000`

### 2. Frontend start karo (naye terminal mein)
```bash
cd client
npm install
npm run dev
```
Frontend chalega: `http://localhost:5173`

Frontend backend se services list aur contact form submit — dono `http://localhost:5000/api/...` par call karta hai.

## Kya included hai

- Hero section + stats
- Trust/credentials badges
- Services grid (Trademark, Company Formation, Licensing, IT, Digital, E-commerce)
- Client testimonials
- Insights/blog cards
- FAQ accordion
- Contact form → POST `/api/contact` (backend par console log hota hai, koi DB save nahi)
- Services list frontend par GET `/api/services` se aata hai (mock JSON array, backend ke andar)

## Baad mein DB add karna ho to

`server/server.js` mein Mongoose connect karke `server/routes/contact.js` mein
`Contact.create(req.body)` jaisa model call add kar dena — abhi wahan sirf
`console.log` + in-memory array hai.
