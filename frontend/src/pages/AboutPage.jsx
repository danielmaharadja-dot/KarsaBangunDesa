import React, { useState, useEffect } from "react";
import { ShieldCheck, Target, Users, Award, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import TeamCard from "../components/TeamCard";

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error loading team:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* HEADER HERO */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              TENTANG KAMI
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-tight">
              Mengenal Lebih Dekat <br />
              <span className="text-emerald-400">Karsa Bangun Desa</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Yayasan NGO <em>(Non-Governmental Organization)</em> yang berkomitmen menjadi lembaga pemberdayaan desa terdepan melalui kolaborasi pentahelix, inovasi, dan pendampingan yang efektif.
            </p>
          </div>
        </div>
      </section>

      {/* PROFIL & PENDEKATAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              PROFIL LEMBAGA
            </div>
            <h2 className="text-3xl font-extrabold font-display text-slate-900 leading-tight">
              Mendorong Kemandirian Desa Lewat Kolaborasi Nyata
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Karsa Bangun Desa adalah lembaga pendamping pembangunan desa yang bekerja melalui empat pendekatan utama: <strong>Training, Coaching, Mentoring,</strong> dan <strong>Consulting</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Kami bekerja bersama pemerintah desa, Badan Usaha Milik Desa (BUMDes), kelompok tani, dan komunitas lokal untuk merancang jalan pembangunan yang sesuai dengan konteks dan potensi masing-masing desa.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-900 text-sm mb-1">Training & Coaching</div>
                <div className="text-xs text-slate-600">Peningkatan kapasitas SDM & aparatur desa</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="font-bold text-amber-900 text-sm mb-1">Mentoring & Consulting</div>
                <div className="text-xs text-slate-600">Penguatan ekonomi BUMDes & legalitas</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
              <div>
                <div className="text-emerald-400 font-bold font-display text-lg mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span>Visi Utama</span>
                </div>
                <p className="text-slate-200 font-semibold text-lg leading-snug">
                  "Menjadi lembaga yang terdepan dan terpercaya dalam mewujudkan Desa Unggul dan Mandiri."
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <div className="text-amber-400 font-bold font-display text-lg mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Misi Strategis</span>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Membangun kolaborasi pentahelix (Pemerintah, Akademisi, Bisnis, Komunitas, & Media) dalam pembangunan desa.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Melaksanakan pendampingan dan pemberdayaan inovatif dalam keberlanjutan ekonomi desa.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SUSUNAN TIM PENGURUS */}
      <section className="bg-slate-950 py-16 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              STRUKTUR ORGANISASI
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Tim Inti Pengurus Yayasan
            </h2>
            <p className="text-slate-400 text-sm">
              Para profesional dan praktisi yang berpengalaman mendampingi pembangunan dan pemberdayaan desa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.length > 0 ? (
              team.map((member, idx) => <TeamCard key={idx} member={member} />)
            ) : (
              <div className="col-span-full text-center text-slate-400 py-8">
                Memuat data pengurus...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA MITRA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black font-display">
              Tertarik Menjadi Mitra Karsa Bangun Desa?
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Kami siap membantu mewujudkan kepedulian Anda terhadap desa demi membawa perubahan dan dampak nyata secara terukur.
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum,%20saya%20tertarik%20menjadi%20mitra%20Karsa%20Bangun%20Desa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shrink-0"
          >
            <span>Bergabung Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
