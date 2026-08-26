import React, { useState } from "react";
import { Calculator, CheckCircle, AlertCircle, MessageCircle, RefreshCw } from "lucide-react";
import { getApiUrl } from "../config/api";

export default function KalkulatorPage() {
  const [formData, setFormData] = useState({
    nama_pengguna: "",
    email: "",
    whatsapp: "",
    nama_desa: "",
    kecamatan: "",
    kabupaten: "",
    akses_jalan: "3",
    sumber_daya_alam: "3",
    sumber_daya_manusia: "2",
    kelembagaan: "2",
    infrastruktur: "3",
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateClassification = (totalScore) => {
    if (totalScore < 7) {
      return {
        klasifikasi: "Desa Tertinggal",
        badgeColor: "bg-red-500 text-white",
        catatan: "Desa memerlukan intervensi mendasar dalam infrastruktur, akses jalan, dan penguatan kelembagaan awal.",
      };
    } else if (totalScore <= 11) {
      return {
        klasifikasi: "Desa Berkembang Awal",
        badgeColor: "bg-amber-500 text-slate-950",
        catatan: "Potensi dasar telah ada, namun kelembagaan ekonomi dan kapasitas SDM perlu pendampingan intensif.",
      };
    } else if (totalScore <= 16) {
      return {
        klasifikasi: "Desa Berkembang",
        badgeColor: "bg-emerald-600 text-white",
        catatan: "Desa memiliki pondasi yang kuat. Fokus selanjutnya adalah akselerasi unit usaha BUMDes dan digitalisasi.",
      };
    } else {
      return {
        klasifikasi: "Desa Mandiri",
        badgeColor: "bg-emerald-400 text-slate-950 font-black",
        catatan: "Desa sangat siap untuk ekspansi pasar nasional, inovasi energi terbarukan, dan investasi kemitraan strategis.",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    const payload = {
      ...formData,
      akses_jalan: Number(formData.akses_jalan),
      sumber_daya_alam: Number(formData.sumber_daya_alam),
      sumber_daya_manusia: Number(formData.sumber_daya_manusia),
      kelembagaan: Number(formData.kelembagaan),
      infrastruktur: Number(formData.infrastruktur),
    };

    try {
      const res = await fetch(getApiUrl("/api/kalkulator"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses perhitungan.");

      setResult(data);
    } catch (err) {
      console.error("Kalkulator error:", err);
      // Local fallback calculation if API fails
      const localTotal =
        payload.akses_jalan +
        payload.sumber_daya_alam +
        payload.sumber_daya_manusia +
        payload.kelembagaan +
        payload.infrastruktur;
      const classInfo = calculateClassification(localTotal);

      setResult({
        total_skor: localTotal,
        klasifikasi: classInfo.klasifikasi,
        catatan: classInfo.catatan,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              ALAT BANTU DIGITAL GRATIS
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-tight">
              Kalkulator <span className="text-amber-400">Potensi Desa</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Nilai lima parameter kunci untuk mendapatkan klasifikasi awal potensi desa Anda — sebagai dasar diskusi perencanaan pembangunan desa.
            </p>
          </div>
        </div>
      </section>

      {/* FORM & RESULT CONTAINER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
                1. Data Pengisi & Identitas Desa
              </h3>
              <p className="text-xs text-slate-500">
                Isi data diri dan informasi lokasi desa Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  name="nama_pengguna"
                  required
                  value={formData.nama_pengguna}
                  onChange={handleChange}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Desa *
                </label>
                <input
                  type="text"
                  name="nama_desa"
                  required
                  value={formData.nama_desa}
                  onChange={handleChange}
                  placeholder="Contoh: Sukamaju"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="budi@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  No. WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="081234567890"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kecamatan
                </label>
                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  placeholder="Cileunyi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kabupaten / Kota
                </label>
                <input
                  type="text"
                  name="kabupaten"
                  value={formData.kabupaten}
                  onChange={handleChange}
                  placeholder="Bandung"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <hr className="border-slate-200" />

            <div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
                2. Penilaian 5 Parameter Kunci (Skala 1 - 4)
              </h3>
              <p className="text-xs text-slate-500">
                Pilih opsi yang paling menggambarkan kondisi desa Anda saat ini.
              </p>
            </div>

            {/* Parameter 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-sm font-bold text-slate-900">
                🛣️ 1. Akses Jalan & Transportasi
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { v: "1", l: "Sangat terbatas" },
                  { v: "2", l: "Terbatas" },
                  { v: "3", l: "Cukup baik" },
                  { v: "4", l: "Sangat baik" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.akses_jalan === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="akses_jalan"
                      value={opt.v}
                      checked={formData.akses_jalan === opt.v}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span>{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Parameter 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-sm font-bold text-slate-900">
                🌾 2. Sumber Daya Alam (SDA)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { v: "1", l: "Sangat terbatas" },
                  { v: "2", l: "Terbatas" },
                  { v: "3", l: "Cukup melimpah" },
                  { v: "4", l: "Sangat melimpah" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.sumber_daya_alam === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sumber_daya_alam"
                      value={opt.v}
                      checked={formData.sumber_daya_alam === opt.v}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span>{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Parameter 3 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-sm font-bold text-slate-900">
                👥 3. Sumber Daya Manusia (SDM)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { v: "1", l: "Rendah" },
                  { v: "2", l: "Sedang" },
                  { v: "3", l: "Baik" },
                  { v: "4", l: "Sangat baik" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.sumber_daya_manusia === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sumber_daya_manusia"
                      value={opt.v}
                      checked={formData.sumber_daya_manusia === opt.v}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span>{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Parameter 4 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-sm font-bold text-slate-900">
                🏛️ 4. Kelembagaan (BUMDes, Kelompok Tani, Koperasi)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { v: "1", l: "Belum ada/aktif" },
                  { v: "2", l: "Ada, kurang aktif" },
                  { v: "3", l: "Aktif" },
                  { v: "4", l: "Aktif & berkembang" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.kelembagaan === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="kelembagaan"
                      value={opt.v}
                      checked={formData.kelembagaan === opt.v}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span>{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Parameter 5 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-sm font-bold text-slate-900">
                💡 5. Infrastruktur Dasar (Listrik, Air, Sinyal)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { v: "1", l: "Sangat minim" },
                  { v: "2", l: "Minim" },
                  { v: "3", l: "Cukup memadai" },
                  { v: "4", l: "Memadai" },
                ].map((opt) => (
                  <label
                    key={opt.v}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.infrastruktur === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="infrastruktur"
                      value={opt.v}
                      checked={formData.infrastruktur === opt.v}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span>{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Menghitung Skor...</span>
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  <span>Hitung Potensi Desa</span>
                </>
              )}
            </button>
          </form>

          {/* RESULT BOX */}
          {result && (
            <div className="mt-8 p-8 rounded-3xl bg-slate-950 text-white border border-emerald-500/40 shadow-2xl space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Hasil Analisis Potensi Desa
                </span>
                <span className="text-xs text-slate-400">
                  Desa: {formData.nama_desa || "—"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Total Skor Potensi</div>
                  <div className="text-5xl font-black font-display text-white mt-1">
                    {result.total_skor} <span className="text-2xl text-slate-500">/ 20</span>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="text-xs text-slate-400 font-medium mb-1">Klasifikasi Desa</div>
                  <span className="inline-block px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                    {result.klasifikasi}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                {result.catatan || calculateClassification(result.total_skor).catatan}
              </p>

              <div className="pt-2">
                <a
                  href={`https://api.whatsapp.com/send?phone=6285770003549&text=Halo%20Admin%20Karsa,%20saya%20telah%20menghitung%20potensi%20Desa%20${encodeURIComponent(formData.nama_desa || "")}%20dengan%20Skor%20${result.total_skor}/20%20(${encodeURIComponent(result.klasifikasi)}).%20Saya%20ingin%20berdiskusi%20lebih%20lanjut.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Diskusikan Hasil Ini dengan Kami via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
