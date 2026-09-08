import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToHash from "./ScrollToHash.jsx";
import Home from "./pages/Home.jsx";
import InsightsPage from "./pages/InsightsPage.jsx";
import InsightArticle from "./pages/InsightArticle.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="page">
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightArticle />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
