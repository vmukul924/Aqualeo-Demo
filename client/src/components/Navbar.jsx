import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About us" },
  { href: "#insights", label: "Insights" },
  { href: "#careers", label: "Careers" },
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
        <a href="#" className="brand" onClick={closeMenu}>
          AquaLeo Digital
        </a>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta-mobile" onClick={closeMenu}>
            Get Started
          </a>
        </nav>

        <a href="#contact" className="btn btn-primary nav-cta-desktop">
          Get Started
        </a>

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
