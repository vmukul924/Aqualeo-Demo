import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Trust from "./components/Trust.jsx";
import Services from "./components/Services.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Insights from "./components/Insights.jsx";
import FAQ from "./components/FAQ.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Testimonials />
      <Insights />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
}
