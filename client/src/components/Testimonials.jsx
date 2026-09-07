import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function Testimonials() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="section testimonials">
      <div className="container">
        <h2>What Our Partners Say</h2>
        <div className="grid grid-3">
          {items.map((t) => (
            <div className="card quote-card" key={t.id}>
              <p className="quote">"{t.quote}"</p>
              <div className="quote-meta">
                <strong>{t.company}</strong>
                <span>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
