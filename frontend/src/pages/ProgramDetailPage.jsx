import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, CheckCircle2, Sprout, Share2 } from "lucide-react";
import { getApiUrl } from "../config/api";

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(getApiUrl(`/api/programs/${slug}`))
      .then((r) => {
        if (!r.ok) throw new Error("Program not found");
        return r.json();
      })
      .then((data) => setProgram(data))
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-slate-500 min-h-[60vh] flex items-center justify-center">
        Memuat detail program...
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-slate-900">Program Tidak Ditemukan</h2>
        <p className="text-slate-600 text-sm">Program yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <Link
          to="/program"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Program</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-[#043327] via-[#059669] to-[#10b981] text-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            to="/program"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Program</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Detail Program Pendampingan
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            {program.judul}
          </h1>
          <p className="text-slate-300 text-base font-light leading-relaxed">
            {program.ringkasan}
          </p>
        </div>
      </section>

      {/* CONTENT & ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg space-y-8">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 mb-3">
              Deskripsi & Cakupan Layanan
            </h2>
            <p className="text-slate-700 leading-relaxed text-base whitespace-pre-line">
              {program.deskripsi}
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Manfaat Program Untuk Desa</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Pendampingan intensif oleh tenaga profesional dan praktisi berpengalaman.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Perencanaan bisnis dan kelembagaan yang terarah & akuntabel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Akses jaringan mitra kolaborasi pentahelix.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum,%20saya%20tertarik%20dengan%20program%20${encodeURIComponent(program.judul)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ajukan Program Ini via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
