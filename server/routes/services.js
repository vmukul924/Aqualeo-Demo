const express = require("express");
const router = express.Router();

// Mock/in-memory data — replace with a DB query later if needed.
const services = [
  {
    id: "trademark-management",
    title: "Trademark Management",
    summary: "Global brand protection via WIPO Madrid filings, conflict searches, and multi-jurisdiction registration.",
  },
  {
    id: "company-formation",
    title: "Company Formation",
    summary: "LLC or Corp in USA, UK, EU, India, or Canada — banking-ready in 24–48 hours.",
  },
  {
    id: "business-licensing",
    title: "Business Licensing",
    summary: "FDA, IEC, ISO, and all permits to operate and export in your target markets.",
  },
  {
    id: "it-solutions",
    title: "IT Solutions",
    summary: "Cloud hosting on AWS/Azure/GCP, security auditing, and managed services.",
  },
  {
    id: "digital-solutions",
    title: "Digital Solutions",
    summary: "AI-driven web platforms, growth marketing (SEO/PPC), and brand identity.",
  },
  {
    id: "ecommerce-solutions",
    title: "E-commerce Solutions",
    summary: "Omnichannel stores, multi-currency gateways, and marketplace management.",
  },
];

// GET /api/services
router.get("/", (req, res) => {
  res.json(services);
});

// GET /api/services/:id
router.get("/:id", (req, res) => {
  const service = services.find((s) => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(service);
});

module.exports = router;
