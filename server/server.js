const express = require("express");
const cors = require("cors");

const servicesRouter = require("./routes/services");
const contactRouter = require("./routes/contact");
const testimonialsRouter = require("./routes/testimonials");

const app = express();
const PORT = process.env.PORT || 5000;

// Set FRONTEND_URL env var on Render (e.g. https://your-frontend.onrender.com)
// to restrict CORS in production. Falls back to allowing all origins for local dev.
// Supports a comma-separated list too: "https://a.com,https://b.com"
const rawOrigin = process.env.FRONTEND_URL || "*";
const allowedOrigin = rawOrigin === "*" ? "*" : rawOrigin.split(",").map((o) => o.trim());
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "100kb" }));

// trust proxy so req.ip is correct behind Render/other reverse proxies (used for rate limiting)
app.set("trust proxy", true);

// tiny request logger — no extra dependency needed
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// NOTE: No MongoDB is connected here on purpose (demo without external DB).
// Services/testimonials are served from in-memory mock data; contact form
// submissions are persisted to server/data/submissions.json on disk, so
// they survive restarts even without a database.

app.get("/", (req, res) => {
  res.json({ message: "AquaLeo demo API is running", db: "file-based (no external DB)" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.use("/api/services", servicesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/testimonials", testimonialsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
