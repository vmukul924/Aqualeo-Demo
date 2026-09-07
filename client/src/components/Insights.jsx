const posts = [
  {
    tag: "company formation",
    title: "How to Form a US LLC as a Non-Resident in 2026",
    desc: "A step-by-step guide for international entrepreneurs looking to establish a US LLC without residency requirements.",
  },
  {
    tag: "trademark ip",
    title: "Madrid Protocol vs National Filing: Which Trademark Strategy is Right?",
    desc: "Compare the cost, timeline, and coverage of WIPO Madrid Protocol filing versus national filings.",
  },
  {
    tag: "business licensing",
    title: "FDA Registration for Food Exporters: Complete Guide",
    desc: "Everything you need to know about FDA facility registration for food manufacturers and exporters.",
  },
];

export default function Insights() {
  return (
    <section className="section" id="insights">
      <div className="container">
        <h2>Latest Insights</h2>
        <div className="grid grid-3">
          {posts.map((p) => (
            <div className="card" key={p.title}>
              <span className="tag-pill">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
