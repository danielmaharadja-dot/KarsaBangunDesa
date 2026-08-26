import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramPage from "./pages/ProgramPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BeritaPage from "./pages/BeritaPage";
import KalkulatorPage from "./pages/KalkulatorPage";
import ContactPage from "./pages/ContactPage";

// Helper component to scroll window to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/program/:slug" element={<ProgramDetailPage />} />
          <Route path="/produk" element={<ProductPage />} />
          <Route path="/produk/:slug" element={<ProductDetailPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/kalkulator" element={<KalkulatorPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
