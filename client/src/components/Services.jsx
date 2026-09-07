import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Services() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="section" id="services">
      <div className="container">
        <h2>Six Pillars of Global Business</h2>

        {status === "error" && (
          <p className="notice">
            Backend se services load nahi ho payi — check karo ki server chal raha hai
            (<code>cd server &amp;&amp; npm start</code>).
          </p>
        )}

        {status === "loading" && <p className="notice">Loading services…</p>}

        <div className="grid grid-3">
          {services.map((s, i) => (
            <div className="card service-card" key={s.id}>
              <span className="service-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
