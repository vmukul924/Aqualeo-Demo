import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section page-section">
      <div className="container">
        <h1>404 — Page not found</h1>
        <p>Ye page exist nahi karta. Home par wapas chale jao.</p>
        <Link to="/" className="btn btn-primary">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
