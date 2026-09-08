import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialForm = { name: "", email: "", phone: "", company: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact-inner">
        <h2>Get in touch</h2>
        <p>Ready to start your global expansion? Connect with our team for a free consultation.</p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone <span className="optional">(optional)</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </label>
            <label>
              Company <span className="optional">(optional)</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                autoComplete="organization"
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Book a consultation"}
          </button>

          {status === "sent" && <p className="form-success">Thanks! We'll get back to you soon.</p>}
          {status === "error" && (
            <p className="form-error">
              {errorMsg || "Couldn't reach the server."}  (
              <code>cd server &amp;&amp; npm start</code>).
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
