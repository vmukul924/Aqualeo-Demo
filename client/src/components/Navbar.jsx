import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/#services", label: "Services" },
  { to: "/#about", label: "About us" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          AquaLeo Digital
        </Link>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={closeMenu}>
              {l.label}
            </Link>
          ))}
          <Link to="/#contact" className="btn btn-primary nav-cta-mobile" onClick={closeMenu}>
            Get Started
          </Link>
        </nav>

        <Link to="/#contact" className="btn btn-primary nav-cta-desktop">
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

      {open && <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true"></div>}
    </header>
  );
}
