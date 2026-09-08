const express = require("express");
const router = express.Router();

// Mock/in-memory articles — replace with a DB/CMS query later if needed.
const posts = [
  {
    slug: "us-llc-non-resident-2026",
    category: "Company Formation",
    title: "How to Form a US LLC as a Non-Resident in 2026",
    excerpt: "A step-by-step guide for international entrepreneurs looking to establish a US LLC without residency requirements.",
    readTime: "6 min read",
    body: [
      "Setting up a US LLC as a non-resident is more accessible than most founders expect. There is no requirement to hold US citizenship, residency, or a visa, and no Social Security Number is needed to get started.",
      "Wyoming and Delaware remain the two most popular states for non-resident founders because of their predictable annual fees, strong privacy protections, and business-friendly courts. Standard formation typically completes within 24 to 48 hours once documents are filed correctly.",
      "After formation, most founders apply for an Employer Identification Number (EIN) from the IRS, which usually takes an additional three to five business days when filed with a responsible party who does not have an SSN or ITIN.",
      "The final step is opening a US business bank account or a fintech alternative, which most providers now support remotely once the LLC and EIN are in place. From there, founders can accept payments, sign contracts, and operate with a fully compliant US business entity.",
    ],
  },
  {
    slug: "madrid-protocol-vs-national-filing",
    category: "Trademark & IP",
    title: "Madrid Protocol vs National Filing: Which Trademark Strategy is Right?",
    excerpt: "Compare the cost, timeline, and coverage of WIPO Madrid Protocol filing versus national filings.",
    readTime: "5 min read",
    body: [
      "The Madrid Protocol lets a brand owner file a single international application through WIPO and designate coverage across 130+ member countries, making it the most efficient route when protection is needed in several markets at once.",
      "National filing, by contrast, means submitting a separate application directly to each country's trademark office. It costs more per market but can offer stronger local enforcement in jurisdictions with unique classification rules or language requirements.",
      "For founders expanding into three or more Madrid member countries, the Protocol usually wins on cost and administrative simplicity. For a single high-priority market, or one outside the Madrid system, a national filing is often the safer choice.",
      "Many growing brands use a hybrid approach: national filing in their home market first, followed by a Madrid Protocol application once the mark is registered domestically and ready for global expansion.",
    ],
  },
  {
    slug: "fda-registration-food-exporters",
    category: "Business Licensing",
    title: "FDA Registration for Food Exporters: Complete Guide",
    excerpt: "Everything you need to know about FDA facility registration for food manufacturers and exporters.",
    readTime: "7 min read",
    body: [
      "Any facility that manufactures, processes, packs, or holds food for consumption in the United States must register with the FDA under the Food Safety Modernization Act, regardless of where the facility is physically located.",
      "Registration must be renewed every two years, and exporters are required to designate a US Agent who can be contacted by the FDA on the facility's behalf if the facility itself is outside the United States.",
      "Beyond registration, Prior Notice must be filed for each shipment before food arrives at a US port, giving the FDA the chance to review the shipment before it lands.",
      "Getting registration details, product categories, and the US Agent designation right the first time avoids shipment holds at the border, which are one of the most common and costly delays for new food exporters.",
    ],
  },
  {
    slug: "uae-free-zone-vs-mainland",
    category: "Company Formation",
    title: "UAE Free Zone vs Mainland Company: Which Should You Choose?",
    excerpt: "A practical breakdown of ownership rules, costs, and market access for Free Zone versus Mainland UAE entities.",
    readTime: "6 min read",
    body: [
      "UAE Free Zone companies offer 100% foreign ownership, streamlined licensing, and often full repatriation of profits, making them a popular choice for founders who don't need to trade directly within the UAE domestic market.",
      "Mainland companies, since reforms in recent years, also allow 100% foreign ownership in most sectors and permit direct trading anywhere in the UAE and with government entities — something most Free Zones restrict.",
      "Costs differ meaningfully: Free Zones typically bundle office space, visas, and licensing into a single package, while Mainland setup often has more flexible but variable costs depending on activity and office requirements.",
      "The right choice usually comes down to one question: does the business need to trade directly with UAE-based customers and government contracts? If yes, Mainland is generally the better fit; if the business is export or services focused, a Free Zone is often simpler and faster.",
    ],
  },
  {
    slug: "choosing-payment-gateway-cross-border",
    category: "Digital",
    title: "Choosing a Payment Gateway for Cross-Border E-commerce",
    excerpt: "How to evaluate multi-currency support, settlement speed, and compliance when picking a global payment stack.",
    readTime: "5 min read",
    body: [
      "Cross-border sellers should evaluate payment gateways on four dimensions: currency coverage, settlement speed, dispute handling, and compliance requirements in each market they plan to sell into.",
      "Multi-currency pricing — showing customers a price in their local currency rather than converting at checkout — consistently improves conversion rates for international storefronts.",
      "Settlement speed varies widely between providers, from same-day payouts to multi-week holds for new merchant accounts, so this should be confirmed before committing to a provider at scale.",
      "Finally, compliance obligations like PCI-DSS, strong customer authentication in the EU, and local tax reporting requirements differ by region, and the right gateway partner should already have these built in rather than leaving the merchant to manage them manually.",
    ],
  },
  {
    slug: "gdpr-basics-for-non-eu-founders",
    category: "Compliance",
    title: "GDPR Basics Every Non-EU Founder Should Know",
    excerpt: "If you have EU customers or website visitors, GDPR likely applies to you — here's what actually matters.",
    readTime: "6 min read",
    body: [
      "GDPR applies based on whose data you process, not where your company is registered — so a US or India-based company with EU customers or EU website visitors can still fall under its scope.",
      "The core obligations that matter most for small and mid-sized companies are: a clear privacy policy, a lawful basis for processing personal data, and a documented process for handling data subject requests like access or deletion.",
      "Cookie consent is one of the most visible requirements — sites must get explicit, opt-in consent before setting non-essential tracking cookies for EU visitors, not just display a passive banner.",
      "For companies handling any EU customer data at meaningful volume, appointing a Data Protection Officer or at least a clearly named privacy contact is strongly recommended, even when not strictly mandatory under the regulation's size thresholds.",
    ],
  },
];

// GET /api/insights
router.get("/", (req, res) => {
  const { category } = req.query;
  if (category && category !== "All") {
    return res.json(posts.filter((p) => p.category.toLowerCase() === String(category).toLowerCase()));
  }
  res.json(posts);
});

// GET /api/insights/:slug
router.get("/:slug", (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Article not found" });
  res.json(post);
});

module.exports = router;
