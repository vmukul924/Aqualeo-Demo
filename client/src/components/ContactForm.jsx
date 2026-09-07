import { useState } from "react";

const API_BASE = "http://localhost:5000";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
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

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
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
              required
            />
          </label>
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
              {errorMsg || "Couldn't reach the server."} Check ki backend chal raha hai (
              <code>cd server &amp;&amp; npm start</code>).
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
