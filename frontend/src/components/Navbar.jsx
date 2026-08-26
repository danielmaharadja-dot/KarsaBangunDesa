import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Calculator, ChevronRight } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Beranda" },
  { path: "/tentang", label: "Tentang" },
  { path: "/program", label: "Program" },
  { path: "/produk", label: "Produk" },
  { path: "/berita", label: "Berita" },
  { path: "/kalkulator", label: "Kalkulator Desa", isBadge: true },
  { path: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#064e3b]/95 backdrop-blur-md shadow-xl border-b border-[#10b981]/30 py-3"
          : "bg-gradient-to-b from-[#043327]/90 to-transparent backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-12 bg-[#10b981] rounded-lg p-1.5 flex items-center justify-center shadow-lg shadow-[#064e3b]/60 group-hover:bg-[#34d399] transition-all duration-300 border border-[#34d399]/40">
            <svg viewBox="0 0 36 44" fill="none" className="w-full h-full text-white">
              <path
                d="M18 2 L33 10 V32 L18 40 L3 32 V10 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinejoin="round"
              />
              <path d="M18 10 V31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 14 L10 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 14 L26 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 19 L10 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 19 L26 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 24 L11 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 24 L25 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight font-display font-bold text-white tracking-tight">
            <span className="text-sm font-extrabold tracking-wider text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase">
              karsa bangun
            </span>
            <span className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
              desa
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? "text-white bg-emerald-600/30 font-semibold border border-emerald-500/40"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {item.label}
                {item.isBadge && (
                  <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 animate-pulse">
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#064e3b]/95 backdrop-blur-xl border-b border-[#10b981]/30 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[#10b981] text-white font-semibold shadow-md shadow-[#064e3b]/40"
                    : "text-slate-200 hover:bg-[#059669] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.isBadge && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-amber-400 text-slate-950 font-bold">
                      Digital Tool
                    </span>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            );
          })}
          <div className="pt-4 mt-2 border-t border-slate-800">
            <a
              href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hubungi Kami Via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
