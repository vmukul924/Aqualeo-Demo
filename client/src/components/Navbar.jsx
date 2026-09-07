import { useEffect, useState } from "react";

const links = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About us" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu automatically if the window is resized back to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <header className="navbar" id="top">
      <div className="container navbar-inner">
        <a href="#top" className="brand" onClick={handleLinkClick}>
          AquaLeo Digital
        </a>

        <nav className="nav-links">
          {links
            .filter((l) => l.href !== "#top")
            .map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
        </nav>

        <div className="navbar-actions">
          <a href="#contact" className="btn btn-primary">
            Get Started
          </a>

          <button
            className={`hamburger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav className={`mobile-menu${open ? " is-open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={handleLinkClick}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary mobile-cta" onClick={handleLinkClick}>
          Get Started
        </a>
      </nav>
    </header>
  );
}
