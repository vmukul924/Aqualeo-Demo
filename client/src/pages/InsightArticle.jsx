import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function InsightArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error

  useEffect(() => {
    setStatus("loading");
    fetch(`${API_BASE}/api/insights/${slug}`)
      .then((res) => {
        if (res.status === 404) throw { notFound: true };
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setStatus("ready");
      })
      .catch((err) => setStatus(err && err.notFound ? "notfound" : "error"));
  }, [slug]);

  if (status === "loading") {
    return (
      <section className="section page-section">
        <div className="container">
          <p className="notice">Loading article…</p>
        </div>
      </section>
    );
  }

  if (status === "notfound") {
    return (
      <section className="section page-section">
        <div className="container">
          <h1>Article not found</h1>
          <p>Ye article exist nahi karta ya URL galat hai.</p>
          <Link to="/insights" className="btn btn-primary">
            ← Back to Insights
          </Link>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="section page-section">
        <div className="container">
          <p className="notice">
            Article load nahi ho paya — check karo ki backend chal raha hai (
            <code>cd server &amp;&amp; npm start</code>).
          </p>
          <Link to="/insights" className="btn btn-primary">
            ← Back to Insights
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="container article-container">
        <Link to="/insights" className="link-more back-link">
          ← Back to Insights
        </Link>
        <span className="tag-pill">{post.category}</span>
        <h1 className="article-title">{post.title}</h1>
        <p className="read-time">{post.readTime}</p>

        <div className="article-body">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="article-cta">
          <p>Want help applying this to your own expansion plans?</p>
          <Link to="/#contact" className="btn btn-primary">
            Book a free consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
