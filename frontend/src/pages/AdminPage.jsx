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
  ShieldCheck,
  MapPin,
  ChevronRight,
  Plus,
  Edit,
  Newspaper,
  Package,
  Compass,
  Users,
  Lock,
  LogOut,
  X
} from "lucide-react";
import { getApiUrl } from "../config/api";

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_token") === "admin-session-token";
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Navigation tab state
  const [activeTab, setActiveTab] = useState("overview"); 
  // "overview" | "contacts" | "kalkulator" | "berita" | "products" | "programs" | "team"

  // Data states
  const [overview, setOverview] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [kalkulator, setKalkulator] = useState([]);
  const [berita, setBerita] = useState([]);
  const [products, setProducts] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [team, setTeam] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Modal State for CRUD
  const [modalType, setModalType] = useState(null); // 'berita' | 'product' | 'program' | 'team' | null
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(getApiUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "PIN tidak valid");

      localStorage.setItem("admin_token", data.token);
      setIsAuthenticated(true);
      setPasscode("");
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  const fetchAllData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [ovRes, conRes, kalRes, berRes, prodRes, progRes, teamRes] = await Promise.all([
        fetch(getApiUrl("/api/admin/overview")).then((r) => r.json()).catch(() => null),
        fetch(getApiUrl("/api/admin/contacts")).then((r) => r.json()).catch(() => []),
        fetch(getApiUrl("/api/admin/kalkulator")).then((r) => r.json()).catch(() => []),
        fetch(getApiUrl("/api/berita")).then((r) => r.json()).catch(() => []),
        fetch(getApiUrl("/api/products")).then((r) => r.json()).catch(() => []),
        fetch(getApiUrl("/api/programs")).then((r) => r.json()).catch(() => []),
        fetch(getApiUrl("/api/team")).then((r) => r.json()).catch(() => []),
      ]);

      if (ovRes) setOverview(ovRes);
      if (Array.isArray(conRes)) setContacts(conRes);
      if (Array.isArray(kalRes)) setKalkulator(kalRes);
      if (Array.isArray(berRes)) setBerita(berRes);
      if (Array.isArray(prodRes)) setProducts(prodRes);
      if (Array.isArray(progRes)) setPrograms(progRes);
      if (Array.isArray(teamRes)) setTeam(teamRes);
    } catch (err) {
      console.error("Admin data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [isAuthenticated]);

  const showTempMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 3500);
  };

  // Delete Handlers
  const handleDeleteItem = async (type, id) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus item ini?`)) return;
    try {
      const res = await fetch(getApiUrl(`/api/admin/${type}/${id}`), { method: "DELETE" });
      if (res.ok) {
        showTempMessage(`Data ${type} berhasil dihapus.`);
        fetchAllData();
      }
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  // Open Modal for Create or Edit
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      if (type === "berita") {
        setFormData({ judul: "", slug: "", ringkasan: "", konten: "", kategori: "Kabar Desa", tanggal: new Date().toLocaleDateString("id-ID") });
      } else if (type === "products") {
        setFormData({ nama: "", slug: "", kategori: "Training & Edukasi", deskripsi: "", harga: "Rp0" });
      } else if (type === "programs") {
        setFormData({ judul: "", slug: "", ringkasan: "", deskripsi: "", ikon: "sprout" });
      } else if (type === "team") {
        setFormData({ nama: "", jabatan: "", divisi: "Pengurus" });
      }
    }
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    try {
      const isEdit = Boolean(editItem && editItem.id);
      const url = isEdit
        ? getApiUrl(`/api/admin/${modalType}/${editItem.id}`)
        : getApiUrl(`/api/admin/${modalType}`);
      const method = isEdit ? "PUT" : "POST";

      // Auto generate slug if empty
      const payload = { ...formData };
      if (!payload.slug && payload.judul) {
        payload.slug = payload.judul.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      } else if (!payload.slug && payload.nama) {
        payload.slug = payload.nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showTempMessage(`Berhasil ${isEdit ? "memperbarui" : "menambahkan"} data!`);
        setModalType(null);
        fetchAllData();
      } else {
        alert("Gagal menyimpan data.");
      }
    } catch (err) {
      console.error("Save error:", err);
    }
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
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold font-display">Akses Panel Admin</h1>
            <p className="text-xs text-slate-400">
              Masukkan PIN Kata Sandi Admin untuk mengelola data masukan warga & konten website.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Kata Sandi PIN Admin
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan PIN (Default: admin123)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-semibold bg-red-950/60 border border-red-800/60 p-3 rounded-xl">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30"
            >
              Masuk Panel Admin
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500">
            Yayasan Karsa Bangun Desa — Sistem Manajemen Admin
          </p>
        </div>
      </div>
    );
  }

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
                PANEL KONTROL ADMIN TERPADU
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                Dashboard Manajemen Karsa Bangun Desa
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Kelola rekapitulasi data input warga (Kalkulator Potensi & Pesan Masuk) serta konten website (Berita, Produk, Program, & Tim).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAllData}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all border border-slate-700 shadow-md"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-400" : ""}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-bold uppercase tracking-wider transition-all border border-red-800/60"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NOTIFICATION MESSAGE */}
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
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          <div 
            onClick={() => setActiveTab("contacts")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "contacts" ? "bg-emerald-950/60 border-emerald-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PESAN MASUK</div>
            <div className="text-2xl font-extrabold text-emerald-400">{contacts.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Form Kontak</p>
          </div>

          <div 
            onClick={() => setActiveTab("kalkulator")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "kalkulator" ? "bg-amber-950/60 border-amber-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ANALISIS DESA</div>
            <div className="text-2xl font-extrabold text-amber-400">{kalkulator.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Hasil Kalkulator</p>
          </div>

          <div 
            onClick={() => setActiveTab("berita")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "berita" ? "bg-teal-950/60 border-teal-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">BERITA DESA</div>
            <div className="text-2xl font-extrabold text-teal-400">{berita.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Artikel Publikasi</p>
          </div>

          <div 
            onClick={() => setActiveTab("products")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "products" ? "bg-purple-950/60 border-purple-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PRODUK BUMDES</div>
            <div className="text-2xl font-extrabold text-purple-400">{products.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Produk & Layanan</p>
          </div>

          <div 
            onClick={() => setActiveTab("programs")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "programs" ? "bg-blue-950/60 border-blue-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PROGRAM</div>
            <div className="text-2xl font-extrabold text-blue-400">{programs.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Program Unggulan</p>
          </div>

          <div 
            onClick={() => setActiveTab("team")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "team" ? "bg-rose-950/60 border-rose-500" : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">TIM PENGURUS</div>
            <div className="text-2xl font-extrabold text-rose-400">{team.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Struktur Inti</p>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "overview" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "contacts" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Pesan Masuk ({contacts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("kalkulator")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "kalkulator" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Hasil Kalkulator ({kalkulator.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("berita")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "berita" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Berita ({berita.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "products" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Produk ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("programs")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "programs" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Program ({programs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("team")}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "team" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Tim ({team.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {(activeTab === "contacts" || activeTab === "kalkulator") && (
              <button
                onClick={() => exportToCSV(activeTab === "contacts" ? contacts : kalkulator, `data_${activeTab}`)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            )}

            {(activeTab === "berita" || activeTab === "products" || activeTab === "programs" || activeTab === "team") && (
              <button
                onClick={() => openModal(activeTab)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Baru</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN TAB CONTENT */}
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
                    <h3 className="font-bold text-lg text-white font-display">Analisis Potensi Desa Terbaru</h3>
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
                <span>Pesan Masuk (Form Kontak Website)</span>
              </h2>
              <span className="text-xs text-slate-400">Total {contacts.length} pesan</span>
            </div>

            {contacts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">Belum ada pesan masuk</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contacts.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="font-extrabold text-white text-base">{item.nama}</h3>
                        <p className="text-xs text-emerald-400 font-medium">{item.email}</p>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.dibuat_pada ? new Date(item.dibuat_pada).toLocaleString("id-ID") : "-"}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400">
                        Subjek: {item.subjek || "Pesan Umum"}
                      </span>
                      <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/50">
                        "{item.pesan}"
                      </p>
                    </div>

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
                          href={`mailto:${item.email}?subject=Re:%20${encodeURIComponent(item.subjek || "Karsa Bangun Desa")}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-400" />
                          <span>Kirim Email</span>
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteItem("contacts", item.id)}
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
              <span className="text-xs text-slate-400">Total {kalkulator.length} pengisian</span>
            </div>

            {kalkulator.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <Calculator className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">Belum ada data pengisian</h3>
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
                    {kalkulator.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white">{item.nama_pengguna}</td>
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
                            onClick={() => handleDeleteItem("kalkulator", item.id)}
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

        {/* BERITA TAB */}
        {activeTab === "berita" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-teal-400" />
                <span>Kelola Artikel & Berita Desa</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {berita.map((item) => (
                <div key={item.id || item.slug} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
                      {item.kategori || "Berita"}
                    </span>
                    <span className="text-xs text-slate-400">{item.tanggal}</span>
                  </div>
                  <h3 className="font-extrabold text-white text-base leading-snug">{item.judul}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.ringkasan}</p>
                  
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => openModal("berita", item)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem("berita", item.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                <span>Kelola Produk BUMDes & Layanan</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((item) => (
                <div key={item.id || item.slug} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                      {item.kategori}
                    </span>
                    <span className="text-xs font-extrabold text-amber-400">{item.harga}</span>
                  </div>
                  <h3 className="font-extrabold text-white text-base leading-snug">{item.nama}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.deskripsi}</p>
                  
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => openModal("products", item)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem("products", item.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRAMS TAB */}
        {activeTab === "programs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                <span>Kelola Program Unggulan</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map((item) => (
                <div key={item.id || item.slug} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <h3 className="font-extrabold text-white text-base leading-snug">{item.judul}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.ringkasan}</p>
                  
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => openModal("programs", item)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem("programs", item.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-400" />
                <span>Kelola Tim Pengurus Yayasan</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {team.map((item) => (
                <div key={item.id || item.nama} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                    {item.divisi || "Pengurus"}
                  </span>
                  <h3 className="font-extrabold text-white text-base leading-snug">{item.nama}</h3>
                  <p className="text-xs text-amber-400 font-semibold">{item.jabatan}</p>
                  
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => openModal("team", item)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem("team", item.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CRUD FORM MODAL */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg font-display text-white capitalize">
                {editItem ? "Edit Data" : "Tambah Data"} {modalType}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              {modalType === "berita" && (
                <>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Judul Berita</label>
                    <input
                      type="text"
                      value={formData.judul || ""}
                      onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Kategori</label>
                    <input
                      type="text"
                      value={formData.kategori || ""}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Ringkasan</label>
                    <textarea
                      rows="2"
                      value={formData.ringkasan || ""}
                      onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Konten Lengkap</label>
                    <textarea
                      rows="4"
                      value={formData.konten || ""}
                      onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === "products" && (
                <>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Nama Produk / Layanan</label>
                    <input
                      type="text"
                      value={formData.nama || ""}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Kategori</label>
                    <input
                      type="text"
                      value={formData.kategori || ""}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Harga</label>
                    <input
                      type="text"
                      value={formData.harga || ""}
                      onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Deskripsi Produk</label>
                    <textarea
                      rows="3"
                      value={formData.deskripsi || ""}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === "programs" && (
                <>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Judul Program</label>
                    <input
                      type="text"
                      value={formData.judul || ""}
                      onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Ringkasan Program</label>
                    <textarea
                      rows="3"
                      value={formData.ringkasan || ""}
                      onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {modalType === "team" && (
                <>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      value={formData.nama || ""}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Jabatan</label>
                    <input
                      type="text"
                      value={formData.jabatan || ""}
                      onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase">Divisi / Pengarah</label>
                    <input
                      type="text"
                      value={formData.divisi || ""}
                      onChange={(e) => setFormData({ ...formData, divisi: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-lg"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
