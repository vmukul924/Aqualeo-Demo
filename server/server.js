const express = require("express");
const cors = require("cors");

const servicesRouter = require("./routes/services");
const contactRouter = require("./routes/contact");
const testimonialsRouter = require("./routes/testimonials");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// NOTE: No database is connected here on purpose (demo without DB).
// All data below is served from in-memory / hardcoded sources.

app.get("/", (req, res) => {
  res.json({ message: "AquaLeo demo API is running (no DB connected)" });
});

app.use("/api/services", servicesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/testimonials", testimonialsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
