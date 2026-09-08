import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand">AquaLeo Digital</div>
          <p>Global business consultancy helping entrepreneurs register companies, protect IP, and scale across 50+ countries.</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#about">About us</Link></li>
            <li><Link to="/insights">Insights</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4>Headquarters</h4>
          <p>30 N Gould St Ste N,<br />Sheridan, WY 82801, USA</p>
        </div>
      </div>
      <div className="container">
        <p className="copyright">© 2026 AquaLeo Digital — demo project (no external DB connected).</p>
      </div>
    </footer>
  );
}
