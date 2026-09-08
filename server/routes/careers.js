const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Mock/in-memory job listings — replace with a DB query later if needed.
const jobs = [
  {
    id: "company-formation-specialist",
    title: "Company Formation Specialist",
    department: "Company Formation",
    location: "Remote (India)",
    type: "Full-time",
    summary: "Guide international founders through US/UK/EU entity setup, from document prep to bank-ready incorporation.",
  },
  {
    id: "trademark-paralegal",
    title: "Trademark & IP Paralegal",
    department: "Trademark & IP",
    location: "Remote (Global)",
    type: "Full-time",
    summary: "Support Madrid Protocol and national trademark filings, conflict searches, and client status reporting.",
  },
  {
    id: "compliance-associate",
    title: "Business Licensing & Compliance Associate",
    department: "Licensing",
    location: "Sheridan, WY, USA",
    type: "Full-time",
    summary: "Manage FDA, IEC, and ISO licensing applications for exporters and manufacturers across multiple jurisdictions.",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer (React)",
    department: "Digital",
    location: "Remote (Global)",
    type: "Contract",
    summary: "Build and maintain client-facing web platforms and internal tools using React, Vite, and modern CSS.",
  },
  {
    id: "growth-marketer",
    title: "Growth Marketer (SEO/PPC)",
    department: "Digital",
    location: "Remote (Global)",
    type: "Full-time",
    summary: "Own SEO and paid acquisition strategy for AquaLeo and client brands entering new markets.",
  },
  {
    id: "client-success-manager",
    title: "Client Success Manager",
    department: "Operations",
    location: "Remote (India)",
    type: "Full-time",
    summary: "Be the primary point of contact for global clients through onboarding, formation, and licensing milestones.",
  },
];

const DATA_DIR = path.join(__dirname, "..", "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(APPLICATIONS_FILE)) fs.writeFileSync(APPLICATIONS_FILE, "[]", "utf-8");
}

function readApplications() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(APPLICATIONS_FILE, "utf-8") || "[]");
  } catch (err) {
    console.error("Failed to read applications.json, starting fresh:", err.message);
    return [];
  }
}

function writeApplications(list) {
  ensureFile();
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(list, null, 2), "utf-8");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/careers/jobs — all open positions
router.get("/jobs", (req, res) => {
  res.json(jobs);
});

// GET /api/careers/jobs/:id
router.get("/jobs/:id", (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

// POST /api/careers/apply — persisted to server/data/applications.json
router.post("/apply", (req, res) => {
  const { jobId, name, email, linkedinOrPortfolio, coverNote } = req.body || {};

  const job = jobs.find((j) => j.id === jobId);
  if (!job) {
    return res.status(400).json({ error: "Please select a valid open position" });
  }
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Please enter a valid name" });
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    jobId: job.id,
    jobTitle: job.title,
    name: name.trim(),
    email: email.trim(),
    linkedinOrPortfolio: linkedinOrPortfolio ? String(linkedinOrPortfolio).trim() : "",
    coverNote: coverNote ? String(coverNote).trim() : "",
    appliedAt: new Date().toISOString(),
  };

  const applications = readApplications();
  applications.push(entry);
  writeApplications(applications);

  console.log("New job application saved:", entry.id, entry.jobTitle, entry.email);

  res.status(201).json({ success: true, message: `Thanks! Your application for ${job.title} has been received.` });
});

// GET /api/careers/applications — list saved applications (demo/admin use)
router.get("/applications", (req, res) => {
  res.json(readApplications());
});

module.exports = router;
