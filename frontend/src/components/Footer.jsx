import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#051f1b] text-slate-300 pt-16 pb-8 border-t border-[#1b5e52]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1b5e52]/40">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-12 bg-[#2b7a6d] rounded-lg p-1.5 flex items-center justify-center border border-[#40a996]/30">
                <svg viewBox="0 0 36 44" fill="none" className="w-full h-full text-white">
                  <path d="M18 2 L33 10 V32 L18 40 L3 32 V10 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
                  <path d="M18 10 V31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 14 L10 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 14 L26 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 19 L10 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 19 L26 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 24 L11 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 24 L25 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="font-display font-extrabold text-white text-lg leading-tight uppercase tracking-wider">
                <span>karsa</span><br />
                <span className="text-emerald-400">bangun</span><br />
                <span>desa</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Kami siap membantu siapa pun yang berkomitmen untuk memajukan desa dan menciptakan perubahan positif secara berkelanjutan.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-transparent border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Col 2: Layanan Utama */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide uppercase border-b border-emerald-500/30 pb-2 inline-block">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/program" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Training & Pelatihan
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Coaching Pemimpin Desa
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Mentoring Kelembagaan
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Consulting Potensi Desa
                </Link>
              </li>
              <li>
                <Link to="/kalkulator" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-2">
                  <span className="text-amber-400">•</span> Kalkulator Potensi Desa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi Menu */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide uppercase border-b border-emerald-500/30 pb-2 inline-block">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Program Pendampingan
                </Link>
              </li>
              <li>
                <Link to="/produk" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Produk BUMDes & Komoditas
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Kabar & Inovasi Desa
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">•</span> Formulir Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Info Alamat & Kontak */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide uppercase border-b border-emerald-500/30 pb-2 inline-block">
              Kantor & Kontak
            </h4>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-xs">
                  D'Amerta Residence Blok E6 No. 1 RT 01 RW 16 Bojongsoang, Kab. Bandung 40287
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 font-semibold text-xs">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>0857 7000 3549 / 0852 8000 3548</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-xs">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="break-all">karsabangundesa@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Yayasan Karsa Bangun Desa. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
