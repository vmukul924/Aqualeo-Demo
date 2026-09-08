import { Link } from "react-router-dom";

const posts = [
  {
    tag: "company formation",
    title: "How to Form a US LLC as a Non-Resident in 2026",
    desc: "A step-by-step guide for international entrepreneurs looking to establish a US LLC without residency requirements.",
    slug: "us-llc-non-resident-2026",
  },
  {
    tag: "trademark ip",
    title: "Madrid Protocol vs National Filing: Which Trademark Strategy is Right?",
    desc: "Compare the cost, timeline, and coverage of WIPO Madrid Protocol filing versus national filings.",
    slug: "madrid-protocol-vs-national-filing",
  },
  {
    tag: "business licensing",
    title: "FDA Registration for Food Exporters: Complete Guide",
    desc: "Everything you need to know about FDA facility registration for food manufacturers and exporters.",
    slug: "fda-registration-food-exporters",
  },
];

export default function Insights() {
  return (
    <section className="section" id="insights">
      <div className="container">
        <div className="section-header-row">
          <h2>Latest Insights</h2>
          <Link to="/insights" className="link-more">
            View all insights →
          </Link>
        </div>
        <div className="grid grid-3">
          {posts.map((p) => (
            <Link className="card card-link" key={p.title} to={`/insights/${p.slug}`}>
              <span className="tag-pill">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
