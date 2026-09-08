import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    eyebrow: "AQUALEO DIGITAL, LLC",
    title: "We Build the Infrastructure for Your Global Ambitions",
    sub: "From company formation to trademark protection and digital transformation — AquaLeo Digital is the operational partner behind 2,000+ successful global expansions.",
    cta: "Start Your Expansion",
  },
  {
    eyebrow: "AQUALEO DIGITAL, LLC",
    title: "Launch Your US Company in 24-48 Hours",
    sub: "Wyoming or Delaware LLC formation with EIN, registered agent, and banking-ready documentation — open to founders worldwide.",
    cta: "Get Started",
  },
  {
    eyebrow: "AQUALEO DIGITAL, LLC",
    title: "Protect Your Brand in 130+ Countries",
    sub: "WIPO Madrid Protocol filings, conflict searches, and multi-jurisdiction trademark registration handled end to end.",
    cta: "Protect Your Brand",
  },
];

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((cur) => (cur + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  function restartAutoplay(action) {
    clearInterval(timerRef.current);
    action();
    timerRef.current = setInterval(() => {
      setIndex((cur) => (cur + 1) % slides.length);
    }, AUTOPLAY_MS);
  }

  const slide = slides[index];

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true"></div>

      <div className="container hero-inner">
        <p className="eyebrow-plain">{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
        <p className="hero-sub">{slide.sub}</p>
        <a href="#contact" className="btn btn-primary btn-lg">
          {slide.cta}
        </a>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-num">2,000+</div>
            <div className="stat-label">Founders empowered</div>
          </div>
          <div className="stat">
            <div className="stat-num">50+</div>
            <div className="stat-label">Countries served</div>
          </div>
          <div className="stat">
            <div className="stat-num">800+</div>
            <div className="stat-label">IP assets protected</div>
          </div>
          <div className="stat">
            <div className="stat-num">2020</div>
            <div className="stat-label">Established</div>
          </div>
        </div>

        <div className="hero-nav">
          <button
            type="button"
            className="hero-arrow"
            aria-label="Previous slide"
            onClick={() => restartAutoplay(prev)}
          >
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
              <path d="M8 1L2 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="hero-dots">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`hero-dot ${i === index ? "active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => restartAutoplay(() => goTo(i))}
              />
            ))}
          </div>

          <button
            type="button"
            className="hero-arrow"
            aria-label="Next slide"
            onClick={() => restartAutoplay(next)}
          >
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
              <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
