import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

export default function BeritaCard({ berita }) {
  return (
    <article className="bg-white border border-slate-200 hover:border-emerald-500/30 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            <Newspaper className="w-3 h-3 text-emerald-600" />
            {berita.kategori || "Berita Desa"}
          </span>
          <span className="flex items-center gap-1 font-medium text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {berita.tanggal}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
          {berita.judul}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {berita.ringkasan || berita.konten}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 uppercase tracking-wider transition-colors"
        >
          <span>Baca Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
