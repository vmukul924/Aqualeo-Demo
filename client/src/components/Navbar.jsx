export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">AquaLeo Digital</div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">About us</a>
          <a href="#insights">Insights</a>
          <a href="#careers">Careers</a>
        </nav>
        <a href="#contact" className="btn btn-primary">
          Get Started
        </a>
      </div>
    </header>
  );
}
