const express = require("express");
const router = express.Router();

const testimonials = [
  {
    id: 1,
    company: "MaxFresh",
    tag: "Stainless Steel Cookware · Mumbai, India",
    quote:
      "We went from a Mumbai-only brand to live on Amazon US within three weeks. The Wyoming LLC, IEC, and Shopify setup were handled end-to-end.",
  },
  {
    id: 2,
    company: "Precision Meds Global",
    tag: "Pharmaceutical Distributor · Ajman, UAE",
    quote:
      "Our Ajman Free Zone licence was secured in under three weeks, structured to meet WHO and UAE Ministry of Health standards.",
  },
  {
    id: 3,
    company: "Pearl Wings L.L.C-FZ",
    tag: "Travel & Visa Services · Dubai, UAE",
    quote:
      "Our Free Zone LLC and trade licence were in place in two weeks. We hit 1,000 clients in our first year.",
  },
];

// GET /api/testimonials
router.get("/", (req, res) => {
  res.json(testimonials);
});

module.exports = router;
