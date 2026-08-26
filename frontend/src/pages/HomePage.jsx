import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Lightbulb, 
  Users, 
  ShieldCheck, 
  Compass, 
  Calculator, 
  MessageCircle, 
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";
import StatCard from "../components/StatCard";
import ProgramCard from "../components/ProgramCard";
import BeritaCard from "../components/BeritaCard";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [stats, setStats] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [products, setProducts] = useState([]);
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, progRes, prodRes, beritaRes] = await Promise.all([
          fetch("/api/stats").then((r) => r.json()).catch(() => []),
          fetch("/api/programs").then((r) => r.json()).catch(() => []),
          fetch("/api/products").then((r) => r.json()).catch(() => []),
          fetch("/api/berita").then((r) => r.json()).catch(() => []),
        ]);

        setStats(statsRes);
        setPrograms(progRes);
        setProducts(prodRes.slice(0, 3)); // show top 3 on home
        setBerita(beritaRes.slice(0, 3)); // show top 3 on home
      } catch (err) {
        console.error("Failed fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                KARSA BANGUN DESA
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1]">
                Langkah Pertama <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  Memberdayakan Desa
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
                Yayasan NGO <em>(Non-Governmental Organization)</em> yang berkomitmen menjadi lembaga pemberdayaan desa terdepan melalui kolaborasi pentahelix, inovasi, dan pendampingan yang efektif dengan pendekatan holistik & adaptif.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/tentang"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
                >
                  <span>Profil Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hubungi Kami</span>
                </a>
              </div>

              {/* Quick Badge info */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Lembaga Terdaftar & Berbadan Hukum</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Kolaborasi Pentahelix</span>
                </div>
              </div>
            </div>

            {/* Right Media Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="/img/workshop.jpg"
                    alt="Building a Great Team Workshop — Karsa Bangun Desa"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback image gradient if image not found
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider mb-2">
                      Dokumentasi Pelatihan
                    </span>
                    <h3 className="font-bold text-lg leading-tight">
                      Building a Great Team Workshop
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Pelatihan Kepemimpinan & Penguatan Tim Penggerak Desa
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none opacity-40">
          <div className="w-full h-full bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-slate-900 py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.length > 0 ? (
              stats.map((stat, idx) => (
                <StatCard key={idx} label={stat.label} nilai={stat.nilai} />
              ))
            ) : (
              <>
                <StatCard label="Desa Didampingi" nilai="60+" />
                <StatCard label="Kabupaten/Kota" nilai="8" />
                <StatCard label="Tahun Pengalaman" nilai="12+" />
                <StatCard label="BUMDes Diperkuat" nilai="45+" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHO WE ARE & VISION MISSION */}
      <section className="py-20 bg-slate-50 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left overview */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                WHO WE ARE
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                Apa Itu <span className="text-emerald-700">Karsa Bangun Desa</span>
              </h2>
              <p className="text-slate-600 leading-relaxed font-normal text-base">
                Yayasan NGO <em>(Non-Governmental Organization)</em> yang berkomitmen menjadi lembaga pemberdayaan terdepan melalui kolaborasi pentahelix, inovasi, dan pendampingan yang efektif, dengan pendekatan holistik dan adaptif.
              </p>
              <p className="text-slate-600 leading-relaxed font-normal text-base">
                Fokus pada pendampingan masyarakat desa menjadikan Yayasan Karsa Bangun Desa sebagai mitra yang handal dalam menciptakan desa-desa yang maju dan mandiri secara ekonomi maupun kelembagaan.
              </p>
              <div>
                <a
                  href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Konsultasikan Kebutuhan Desa</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Visi & Misi Card */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-white to-emerald-50/60 p-8 rounded-3xl border border-emerald-200/80 shadow-xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3 text-emerald-800 font-bold font-display text-lg mb-3">
                    <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <span>Our Vision (Visi)</span>
                  </div>
                  <p className="text-slate-800 font-bold text-lg leading-snug pl-11">
                    "Menjadi lembaga yang terdepan dan terpercaya dalam mewujudkan Desa Unggul dan Mandiri."
                  </p>
                </div>

                <div className="pt-6 border-t border-emerald-200/60">
                  <div className="flex items-center gap-3 text-emerald-800 font-bold font-display text-lg mb-4">
                    <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                      <Target className="w-5 h-5" />
                    </div>
                    <span>Our Mission (Misi Utama)</span>
                  </div>
                  <ul className="space-y-3 pl-11 text-slate-700 font-medium text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span>Membangun kolaborasi pentahelix dalam pembangunan dan pendampingan desa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span>Melaksanakan pendampingan dan pemberdayaan inovatif dalam keberlanjutan ekonomi desa.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              OUR VALUES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Nilai Identitas Yang Tertanam
            </h2>
            <p className="text-slate-400 text-base">
              Cerminan komitmen kami untuk mencapai hasil positif dan berkelanjutan dalam pengembangan desa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="text-3xl p-3 bg-emerald-950/80 text-emerald-400 rounded-xl w-fit mb-4 border border-emerald-800/40 group-hover:scale-110 transition-transform">
                💡
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Inovatif</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fokus pada ide dan pendekatan baru untuk pembangunan desa yang relevan dengan perkembangan zaman.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="text-3xl p-3 bg-emerald-950/80 text-emerald-400 rounded-xl w-fit mb-4 border border-emerald-800/40 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Kolaboratif</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mendorong kerja sama dan kemitraan antara berbagai pemangku kepentingan dalam paradigma pentahelix.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="text-3xl p-3 bg-emerald-950/80 text-emerald-400 rounded-xl w-fit mb-4 border border-emerald-800/40 group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Respect</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Menghargai dan merayakan kearifan lokal, budaya, dan nilai-nilai tradisi kemasyarakatan desa.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="text-3xl p-3 bg-emerald-950/80 text-emerald-400 rounded-xl w-fit mb-4 border border-emerald-800/40 group-hover:scale-110 transition-transform">
                🔍
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Transparant</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transparan, terbuka, dan dapat dipercaya dalam seluruh pelaksanaan program pendampingan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-200/60 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                PROGRAM UNGGULAN
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                Solusi Terbaik Pengembangan Desa
              </h2>
              <p className="text-slate-600 text-base max-w-xl">
                Temukan inovasi dan program pendampingan terdepan yang dirancang khusus untuk meningkatkan kemandirian desa.
              </p>
            </div>
            <div>
              <Link
                to="/program"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Lihat Semua Program ({programs.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.slice(0, 4).map((prog) => (
              <ProgramCard key={prog.slug} program={prog} />
            ))}
          </div>
        </div>
      </section>

      {/* KALKULATOR POTENSI DESA CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-950/60 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-emerald-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-amber-400" />
                ALAT BANTU DIGITAL GRATIS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Ukur Kesiapan & Potensi Desa Anda Secara Instan
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Gunakan Kalkulator Potensi Desa untuk menilai 5 parameter kunci (Akses jalan, SDA, SDM, Kelembagaan, dan Infrastruktur) dan dapatkan rekomendasi klasifikasi potensi desa Anda.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/kalkulator"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95"
              >
                <Calculator className="w-5 h-5" />
                <span>Coba Kalkulator Sekarang</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BERITA & KABAR DESA */}
      {berita.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  DESA DALAM BERITA
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                  Kabar & Artikel Terkini
                </h2>
                <p className="text-slate-600 text-base">
                  Lihat publikasi kegiatan dan inovasi terkini dari Yayasan Karsa Bangun Desa.
                </p>
              </div>
              <div>
                <Link
                  to="/berita"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Lihat Semua Berita</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {berita.map((item) => (
                <BeritaCard key={item.slug} berita={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
