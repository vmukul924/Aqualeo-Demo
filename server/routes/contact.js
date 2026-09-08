const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// File-based persistence — no MongoDB needed, but data survives server restarts.
// Every submission is appended to server/data/submissions.json
const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readSubmissions() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Failed to read submissions.json, starting fresh:", err.message);
    return [];
  }
}

function writeSubmissions(list) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// very small in-memory rate limiter: max 5 submissions per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map(); // ip -> [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

// POST /api/contact
router.post("/", (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many submissions. Please try again in a few minutes." });
  }

  const { name, email, message, phone, company } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }
  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Please enter a valid name" });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    return res.status(400).json({ error: "Message is too short" });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: name.trim(),
    email: email.trim(),
    phone: phone ? String(phone).trim() : "",
    company: company ? String(company).trim() : "",
    message: message.trim(),
    receivedAt: new Date().toISOString(),
    ip,
  };

  const submissions = readSubmissions();
  submissions.push(entry);
  writeSubmissions(submissions);

  console.log("New contact form submission saved:", entry.id, entry.email);

  res.status(201).json({ success: true, message: "Thanks! We'll get back to you soon." });
});

// GET /api/contact — lists all submissions ever received (persisted on disk)
// In production you'd protect this behind auth — kept open here for demo/admin use.
router.get("/", (req, res) => {
  res.json(readSubmissions());
});

module.exports = router;
