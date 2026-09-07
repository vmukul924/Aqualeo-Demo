import { useState } from "react";

const faqs = [
  {
    q: "What is AquaLeo Digital?",
    a: "A global business consultancy helping entrepreneurs register companies, protect intellectual property, obtain licenses, and build digital presence across 50+ countries.",
  },
  {
    q: "Where are you based?",
    a: "Headquarters at 30 N Gould St Ste N, Sheridan, Wyoming 82801, USA, with a distributed team across multiple continents.",
  },
  {
    q: "Do you serve businesses outside the US?",
    a: "Yes — the majority of clients are international founders and businesses from 50+ countries.",
  },
  {
    q: "How long does it take to form a US LLC?",
    a: "Wyoming and Delaware standard processing takes 24–48 hours, with EIN typically taking an additional 3–5 business days.",
  },
  {
    q: "Can a non-US resident form a US company?",
    a: "Yes — there is no citizenship, residency, or visa requirement, and no SSN is needed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section faq">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={`faq-item ${open ? "open" : ""}`} key={item.q}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  {item.q}
                  <span className="faq-icon">{open ? "−" : "+"}</span>
                </button>
                {open && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
