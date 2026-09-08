import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const dropdowns = {
  Services: [
    { to: "/#services", label: "Trademark Management", desc: "Global brand protection via WIPO Madrid filings." },
    { to: "/#services", label: "Company Formation", desc: "LLC or Corp, banking-ready in 24–48 hours." },
    { to: "/#services", label: "Business Licensing", desc: "FDA, IEC, ISO, and cross-border permits." },
    { to: "/#services", label: "IT Solutions", desc: "Cloud hosting, security auditing, managed services." },
    { to: "/#services", label: "Digital Solutions", desc: "AI-driven platforms and growth marketing." },
    { to: "/#services", label: "E-commerce Solutions", desc: "Omnichannel stores and marketplace management." },
  ],
  Industries: [
    { to: "/#services", label: "Startups & Founders", desc: "First-time entity formation and IP protection." },
    { to: "/#services", label: "E-commerce & Retail", desc: "Marketplace-ready storefronts and payments." },
    { to: "/#services", label: "SaaS & Technology", desc: "Cloud infrastructure and compliance for tech teams." },
    { to: "/#services", label: "Import / Export & Manufacturing", desc: "Licensing and customs-ready documentation." },
    { to: "/#services", label: "Professional Services", desc: "Multi-jurisdiction licensing and trademarks." },
  ],
  "About us": [
    { to: "/#about", label: "Our Story", desc: "Recognized and certified since 2020." },
    { to: "/insights", label: "Insights", desc: "Guides and updates on global expansion." },
    { to: "/careers", label: "Careers", desc: "Open roles across our global team." },
    { to: "/#contact", label: "Contact us", desc: "Talk to our expansion specialists." },
  ],
};

const dropdownOrder = ["Services", "Industries", "About us"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);

  // close mobile menu automatically if viewport is resized back to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // lock background scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close any open dropdown / search on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function closeMenu() {
    setOpen(false);
    setActiveMenu(null);
  }

  function toggleDropdown(name) {
    setActiveMenu((cur) => (cur === name ? null : name));
  }

  return (
    <header className="navbar" ref={navRef}>
      <div className="topbar">
        <div className="container topbar-inner">
          <Link to="/careers">Careers</Link>
          <a href="mailto:info@aqualeodigital.com">info@aqualeodigital.com</a>
        </div>
      </div>

      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          AquaLeo Digital
        </Link>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          {dropdownOrder.map((name) => (
            <div
              key={name}
              className={`nav-item has-dropdown ${activeMenu === name ? "dropdown-open" : ""}`}
              onMouseEnter={() => window.innerWidth > 860 && setActiveMenu(name)}
              onMouseLeave={() => window.innerWidth > 860 && setActiveMenu(null)}
            >
              <button
                type="button"
                className="nav-link-btn"
                aria-expanded={activeMenu === name}
                onClick={() => toggleDropdown(name)}
              >
                {name}
                <svg className="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="dropdown-panel">
                {dropdowns[name].map((item) => (
                  <Link key={item.label} to={item.to} className="dropdown-item" onClick={closeMenu}>
                    <span className="dropdown-item-label">{item.label}</span>
                    <span className="dropdown-item-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/insights" onClick={closeMenu}>
            Insights
          </Link>

          <Link to="/#contact" className="btn btn-primary nav-cta-mobile" onClick={closeMenu}>
            Get Started
          </Link>
        </nav>

        <div className="navbar-actions">
          <div className={`nav-search ${searchOpen ? "search-open" : ""}`}>
            <input
              type="search"
              placeholder="Search…"
              className="nav-search-input"
              aria-label="Search"
            />
            <button
              type="button"
              className="nav-search-toggle"
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 16l-3.4-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <Link to="/#contact" className="btn btn-primary btn-pill nav-cta-desktop">
            Get Started
          </Link>

          <button
            className={`nav-toggle ${open ? "active" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {open && <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true"></div>}
    </header>
  );
}
