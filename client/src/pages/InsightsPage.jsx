import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function InsightsPage() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/api/insights`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...unique];
  }, [posts]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-header">
          <p className="eyebrow-plain eyebrow-dark">Insights</p>
          <h1>Guides for founders expanding globally</h1>
          <p className="page-lead">
            Practical, no-fluff guides on company formation, trademarks, licensing, and digital growth —
            written from what we see across 2,000+ client engagements.
          </p>
        </div>

        {status === "loading" && <p className="notice">Loading insights…</p>}
        {status === "error" && (
          <p className="notice">
            Insights load nahi ho paye — check karo ki backend chal raha hai (
            <code>cd server &amp;&amp; npm start</code>).
          </p>
        )}

        {status === "ready" && (
          <>
            <div className="filter-row" role="tablist" aria-label="Filter insights by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-3">
              {filtered.map((p) => (
                <Link className="card card-link" key={p.slug} to={`/insights/${p.slug}`}>
                  <span className="tag-pill">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="read-time">{p.readTime}</span>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && <p className="notice">Is category mein abhi koi article nahi hai.</p>}
          </>
        )}
      </div>
    </section>
  );
}
