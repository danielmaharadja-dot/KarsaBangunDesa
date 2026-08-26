import React, { useState, useEffect } from "react";
import { BookOpen, Search } from "lucide-react";
import BeritaCard from "../components/BeritaCard";
import { getApiUrl } from "../config/api";

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl("/api/berita"))
      .then((r) => r.json())
      .then((data) => setBeritaList(data))
      .catch((err) => console.error("Error fetching berita:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredBerita = beritaList.filter(
    (b) =>
      b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.ringkasan.toLowerCase().includes(search.toLowerCase()) ||
      (b.konten && b.konten.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              DESA DALAM BERITA
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-tight">
              Kabar & Artikel <br />
              <span className="text-emerald-400">Pemberdayaan Desa</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Informasi kegiatan pendampingan, inovasi kelembagaan koperasi desa, serta liputan program Karsa Bangun Desa.
            </p>
          </div>
        </div>
      </section>

      {/* BERITA LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold font-display text-slate-900">
            Daftar Berita & Artikel ({filteredBerita.length})
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kabar desa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-16">
            Memuat berita desa...
          </div>
        ) : filteredBerita.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBerita.map((item) => (
              <BeritaCard key={item.slug} berita={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-16 bg-slate-100 rounded-2xl">
            Tidak ada berita yang ditemukan untuk pencarian "{search}".
          </div>
        )}
      </section>
    </div>
  );
}
