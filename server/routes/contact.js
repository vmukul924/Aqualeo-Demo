const express = require("express");
const router = express.Router();

// In-memory store, only for this server's lifetime — no DB.
const submissions = [];

// POST /api/contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }

  const entry = { name, email, message, receivedAt: new Date().toISOString() };
  submissions.push(entry);

  console.log("New contact form submission (not saved to any DB):", entry);

  res.status(201).json({ success: true, message: "Thanks! We'll get back to you soon." });
});

// GET /api/contact — lists submissions received since server start (demo only)
router.get("/", (req, res) => {
  res.json(submissions);
});

module.exports = router;
