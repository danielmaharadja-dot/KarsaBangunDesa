import React, { useState, useEffect } from "react";
import { 
  Inbox, 
  Calculator, 
  Search, 
  Trash2, 
  Download, 
  RefreshCw, 
  MessageCircle, 
  Mail, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  Filter,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { getApiUrl } from "../config/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "contacts" | "kalkulator"
  const [contacts, setContacts] = useState([]);
  const [kalkulator, setKalkulator] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [overviewRes, contactsRes, kalkulatorRes] = await Promise.all([
        fetch(getApiUrl("/api/admin/overview")).then((r) => r.json()).catch(() => null),
        fetch(getApiUrl("/api/admin/contacts")).then((r) => r.json()).catch(() => []),
        fetch(getApiUrl("/api/admin/kalkulator")).then((r) => r.json()).catch(() => []),
      ]);

      if (overviewRes) setOverview(overviewRes);
      if (Array.isArray(contactsRes)) setContacts(contactsRes);
      if (Array.isArray(kalkulatorRes)) setKalkulator(kalkulatorRes);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle deletion of contact entry
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    try {
      const res = await fetch(getApiUrl(`/api/admin/contacts/${id}`), { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
        showTempMessage("Pesan kontak berhasil dihapus.");
      }
    } catch (err) {
      console.error("Delete contact error:", err);
    }
  };

  // Handle deletion of kalkulator entry
  const handleDeleteKalkulator = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data kalkulator ini?")) return;
    try {
      const res = await fetch(getApiUrl(`/api/admin/kalkulator/${id}`), { method: "DELETE" });
      if (res.ok) {
        setKalkulator((prev) => prev.filter((item) => item.id !== id));
        showTempMessage("Data kalkulator berhasil dihapus.");
      }
    } catch (err) {
      console.error("Delete kalkulator error:", err);
    }
  };

  const showTempMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  // Export CSV
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert("Tidak ada data untuk diunduh.");
      return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val || "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter contacts by search query
  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.nama && c.nama.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.subjek && c.subjek.toLowerCase().includes(q)) ||
      (c.pesan && c.pesan.toLowerCase().includes(q))
    );
  });

  // Filter kalkulator submissions by search query
  const filteredKalkulator = kalkulator.filter((k) => {
    const q = searchQuery.toLowerCase();
    return (
      (k.nama_pengguna && k.nama_pengguna.toLowerCase().includes(q)) ||
      (k.nama_desa && k.nama_desa.toLowerCase().includes(q)) ||
      (k.kecamatan && k.kecamatan.toLowerCase().includes(q)) ||
      (k.kabupaten && k.kabupaten.toLowerCase().includes(q)) ||
      (k.klasifikasi && k.klasifikasi.toLowerCase().includes(q))
    );
  });

  const getBadgeColor = (klasifikasi) => {
    switch (klasifikasi) {
      case "Desa Mandiri":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Desa Berkembang":
        return "bg-teal-500/20 text-teal-300 border-teal-500/40";
      case "Desa Berkembang Awal":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-red-500/20 text-red-300 border-red-500/40";
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-[#043327] to-slate-900 border-b border-slate-800 py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                PANEL DOKUMEN & INPUT DATA
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                Dashboard Admin Karsa Bangun Desa
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Kelola dan lihat seluruh data pesan masuk pengunjung serta hasil asesmen kalkulator potensi desa secara terpusat.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all border border-slate-700 shadow-md"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-400" : ""}`} />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATUS NOTIFICATION NOTIF */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{statusMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* METRIC OVERVIEW CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div 
            onClick={() => setActiveTab("contacts")}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "contacts" 
                ? "bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/50" 
                : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Inbox className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PESAN MASUK</span>
            </div>
            <div className="text-3xl font-extrabold text-white">{contacts.length}</div>
            <p className="text-xs text-slate-400 mt-1">Total Formulir Kontak</p>
          </div>

          <div 
            onClick={() => setActiveTab("kalkulator")}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "kalkulator" 
                ? "bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950/50" 
                : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">POTENSI DESA</span>
            </div>
            <div className="text-3xl font-extrabold text-white">{kalkulator.length}</div>
            <p className="text-xs text-slate-400 mt-1">Total Asesmen Kalkulator</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">DESA MANDIRI</span>
            </div>
            <div className="text-3xl font-extrabold text-teal-400">
              {overview?.klasifikasiCounts?.["Desa Mandiri"] || 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">Skor Potensi Maksimal (17-20)</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">DESA BERKEMBANG</span>
            </div>
            <div className="text-3xl font-extrabold text-purple-400">
              {overview?.klasifikasiCounts?.["Desa Berkembang"] || 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">Siap Akselerasi BUMDes (12-16)</p>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION & SEARCH CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Ringkasan Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "contacts"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Pesan Masuk ({contacts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("kalkulator")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "kalkulator"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Hasil Kalkulator ({kalkulator.length})</span>
            </button>
          </div>

          {/* Search bar & Export CTA */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, desa, email..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {activeTab === "contacts" && (
              <button
                onClick={() => exportToCSV(contacts, "pesan_masuk_karsa")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            )}

            {activeTab === "kalkulator" && (
              <button
                onClick={() => exportToCSV(kalkulator, "kalkulator_potensi_desa")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TAB CONTENT AREAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Messages */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-lg text-white font-display">Pesan Masuk Terbaru</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {contacts.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-6">Belum ada pesan masuk.</p>
                ) : (
                  <div className="space-y-3">
                    {contacts.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-bold text-emerald-400">{item.nama}</span>
                          <span>{item.dibuat_pada ? new Date(item.dibuat_pada).toLocaleDateString("id-ID") : "Baru saja"}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-200">{item.subjek || "Pesan Umum"}</p>
                        <p className="text-xs text-slate-400 line-clamp-2">{item.pesan}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Kalkulator Submissions */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-lg text-white font-display">Analisis Desa Terbaru</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("kalkulator")}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {kalkulator.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-6">Belum ada hasil pengisian kalkulator.</p>
                ) : (
                  <div className="space-y-3">
                    {kalkulator.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{item.nama_desa}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getBadgeColor(item.klasifikasi)}`}>
                            {item.klasifikasi}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span>Oleh: {item.nama_pengguna}</span>
                          <span>Skor: <strong className="text-emerald-400">{item.total_skor}</strong>/20</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Inbox className="w-5 h-5 text-emerald-400" />
                <span>Daftar Pesan Masuk (Form Kontak)</span>
              </h2>
              <span className="text-xs text-slate-400">Menampilkan {filteredContacts.length} data</span>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">Tidak ada pesan ditemukan</h3>
                <p className="text-xs text-slate-500">Belum ada pengirim atau query pencarian tidak cocok.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredContacts.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl space-y-4 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="font-extrabold text-white text-base">{item.nama}</h3>
                        <p className="text-xs text-emerald-400 font-medium">{item.email}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.dibuat_pada ? new Date(item.dibuat_pada).toLocaleString("id-ID") : "-"}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-block px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400">
                        Subjek: {item.subjek || "Tanya Layanan / Kerjasama"}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/50">
                        "{item.pesan}"
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        {item.whatsapp && (
                          <a
                            href={`https://api.whatsapp.com/send?phone=${item.whatsapp.replace(/[^0-9]/g, "")}&text=Halo%20${encodeURIComponent(item.nama)},%20terima%20kasih%20telah%20menghubungi%20Karsa%20Bangun%20Desa.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Balas WA ({item.whatsapp})</span>
                          </a>
                        )}

                        <a
                          href={`mailto:${item.email}?subject=Re:%20${encodeURIComponent(item.subjek || "Tanggapan Karsa Bangun Desa")}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-400" />
                          <span>Kirim Email</span>
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteContact(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 font-bold text-xs transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* KALKULATOR TAB */}
        {activeTab === "kalkulator" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>Hasil Asesmen Kalkulator Potensi Desa</span>
              </h2>
              <span className="text-xs text-slate-400">Menampilkan {filteredKalkulator.length} data</span>
            </div>

            {filteredKalkulator.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <Calculator className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">Tidak ada data kalkulator</h3>
                <p className="text-xs text-slate-500">Belum ada pengisian kalkulator atau query pencarian tidak cocok.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-xs text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Nama Pengguna</th>
                      <th className="p-4">Desa & Lokasi</th>
                      <th className="p-4">Total Skor</th>
                      <th className="p-4">Klasifikasi Potensi</th>
                      <th className="p-4">Tanggal Input</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {filteredKalkulator.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white">
                          <div>{item.nama_pengguna}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{item.nama_desa}</span>
                          </div>
                          {(item.kecamatan || item.kabupaten) && (
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span>Kec. {item.kecamatan || "-"}, Kab. {item.kabupaten || "-"}</span>
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-base font-extrabold text-amber-400">
                            {item.total_skor} <span className="text-xs text-slate-500 font-normal">/ 20</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${getBadgeColor(item.klasifikasi)}`}>
                            {item.klasifikasi}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-slate-400">
                          {item.dibuat_pada ? new Date(item.dibuat_pada).toLocaleDateString("id-ID") : "-"}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteKalkulator(item.id)}
                            className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 transition-all"
                            title="Hapus data"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
