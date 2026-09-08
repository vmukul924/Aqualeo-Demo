import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const perks = [
  { title: "Remote-first", detail: "Work from anywhere — most of our team is fully distributed across time zones." },
  { title: "Global clients", detail: "Work with founders from 50+ countries, not a single local market." },
  { title: "Real ownership", detail: "Small teams, direct client contact, and visible impact from week one." },
  { title: "Growth budget", detail: "Annual learning stipend for courses, certifications, and conferences." },
];

const initialForm = { name: "", email: "", linkedinOrPortfolio: "", coverNote: "" };

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [activeDept, setActiveDept] = useState("All");
  const [applyJob, setApplyJob] = useState(null); // job object or null
  const [form, setForm] = useState(initialForm);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | sending | sent | error
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/careers/jobs`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const departments = useMemo(() => {
    const unique = Array.from(new Set(jobs.map((j) => j.department)));
    return ["All", ...unique];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (activeDept === "All") return jobs;
    return jobs.filter((j) => j.department === activeDept);
  }, [jobs, activeDept]);

  function openApply(job) {
    setApplyJob(job);
    setForm(initialForm);
    setSubmitStatus("idle");
    setSubmitError("");
    document.body.style.overflow = "hidden";
  }

  function closeApply() {
    setApplyJob(null);
    document.body.style.overflow = "";
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!applyJob) return;
    setSubmitStatus("sending");
    setSubmitError("");

    try {
      const res = await fetch(`${API_BASE}/api/careers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: applyJob.id, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmitStatus("sent");
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err.message);
    }
  }

  return (
    <>
      <section className="section page-section">
        <div className="container">
          <div className="page-header">
            <p className="eyebrow-plain eyebrow-dark">Careers</p>
            <h1>Help founders build across borders</h1>
            <p className="page-lead">
              We're a small, remote-first team helping entrepreneurs form companies, protect IP, and get
              licensed in 50+ countries. Here's where we're hiring right now.
            </p>
          </div>

          <div className="grid grid-4 perks-grid">
            {perks.map((p) => (
              <div className="card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section jobs-section">
        <div className="container">
          <h2>Open positions</h2>

          {status === "loading" && <p className="notice">Loading open positions…</p>}
          {status === "error" && (
            <p className="notice">
              Positions load nahi ho payi — check karo ki backend chal raha hai (
              <code>cd server &amp;&amp; npm start</code>).
            </p>
          )}

          {status === "ready" && (
            <>
              <div className="filter-row" role="tablist" aria-label="Filter jobs by department">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    className={`filter-chip ${activeDept === dept ? "active" : ""}`}
                    onClick={() => setActiveDept(dept)}
                    role="tab"
                    aria-selected={activeDept === dept}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              <div className="job-list">
                {filteredJobs.map((job) => (
                  <div className="job-row" key={job.id}>
                    <div>
                      <h3>{job.title}</h3>
                      <p className="job-meta">
                        {job.department} · {job.location} · {job.type}
                      </p>
                      <p className="job-summary">{job.summary}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => openApply(job)}>
                      Apply
                    </button>
                  </div>
                ))}
              </div>

              {filteredJobs.length === 0 && <p className="notice">Is department mein abhi koi opening nahi hai.</p>}
            </>
          )}
        </div>
      </section>

      {applyJob && (
        <div className="modal-backdrop" onClick={closeApply}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeApply} aria-label="Close">
              ×
            </button>

            {submitStatus === "sent" ? (
              <div className="modal-success">
                <h3>Application sent!</h3>
                <p>Thanks for applying to {applyJob.title}. We'll be in touch if it's a match.</p>
                <button className="btn btn-primary" onClick={closeApply}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3>Apply — {applyJob.title}</h3>
                <p className="job-meta">
                  {applyJob.department} · {applyJob.location} · {applyJob.type}
                </p>

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <label>
                    Name
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                  </label>
                  <label>
                    LinkedIn / portfolio link <span className="optional">(optional)</span>
                    <input
                      type="text"
                      name="linkedinOrPortfolio"
                      value={form.linkedinOrPortfolio}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Why this role? <span className="optional">(optional)</span>
                    <textarea name="coverNote" rows="4" value={form.coverNote} onChange={handleChange} />
                  </label>

                  <button type="submit" className="btn btn-primary" disabled={submitStatus === "sending"}>
                    {submitStatus === "sending" ? "Submitting…" : "Submit application"}
                  </button>

                  {submitStatus === "error" && (
                    <p className="form-error">{submitError || "Couldn't reach the server."}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
