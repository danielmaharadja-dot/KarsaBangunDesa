// Server backend Karsa Bangun Desa
// Compatible with local Node.js server and Vercel Serverless Functions

const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Digunakan untuk Vercel Serverless & Fallback jika SQLite tidak tersedia)
const MOCK_DATA = {
  stats: [
    { label: "Desa Binaan & Mitra", nilai: "50+" },
    { label: "Program Unggulan", nilai: "10" },
    { label: "UMKM Lokal Terbantu", nilai: "120+" },
    { label: "Total Warga Penerima Manfaat", nilai: "15,000+" }
  ],
  team: [
    { nama: "Ir. H. Ahmad Fauzi", jabatan: "Ketua Pembina", divisi: "Pengarah Strategis" },
    { nama: "Daniel Maharadja, S.T.", jabatan: "Direktur Eksekutif", divisi: "Manajemen Utama" },
    { nama: "Siti Rahmawati, M.P.", jabatan: "Kepala Program", divisi: "Pemberdayaan Desa" }
  ],
  programs: [
    { slug: "training", judul: "Training", ringkasan: "Memberi solusi dan layanan terbaik untuk memenuhi kebutuhan dalam pengembangan desa", ikon: "terrace", urutan: 1 },
    { slug: "coaching", judul: "Coaching", ringkasan: "Memajukan pemimpin desa dalam menciptakan pengembangan desa yang luar biasa melalui solusi pembinaan terfokus", ikon: "sprout", urutan: 2 },
    { slug: "mentoring", judul: "Mentoring", ringkasan: "Didampingi profesional yang berpengalaman luas dalam bidangnya dan akan membagikan pengetahuan, pengalaman dan wawasan", ikon: "leaf", urutan: 3 },
    { slug: "consulting", judul: "Consulting", ringkasan: "Memberi solusi yang efektif dalam mengoptimalkan berbagai potensi sumber daya yang ada di desa sebagai kunci keberhasilan pengembangan desa", ikon: "contour", urutan: 4 },
    { slug: "berkah-berbagi-makan", judul: "Berkah Berbagi Makan", ringkasan: "Program BBM adalah gerakan kolaborasi sosial yang menghubungkan kepedulian masyarakat dengan pemberdayaan UMKM lokal binaan Karsa Bangun Desa.", ikon: "sprout", urutan: 5 },
    { slug: "berkah-berbagi-quran", judul: "Berkah Berbagi Qur’an", ringkasan: "Program BBQ hadir sebagai jembatan kepedulian masyarakat kota kepada saudara saudara kita di desa.", ikon: "leaf", urutan: 6 },
    { slug: "saluran-air-warga", judul: "Saluran Air untuk Warga Desa", ringkasan: "Program SAWER hadir untuk mewujudkan akses air bersih yang layak melalui pipanisasi dan pembangunan sumber air bagi warga desa binaan Karsa Bangun Desa di Jawa Barat.", ikon: "terrace", urutan: 7 },
    { slug: "berkah-ekonomi-lokal-umkm", judul: "Berkah Ekonomi Lokal untuk UMKM", subjudul: "Andalan Negeri", ringkasan: "Seperti berlian yang lahir dari proses panjang dan diasah menjadi bernilai tinggi— UMKM desa binaan KBD memiliki potensi luar biasa yang menunggu untuk dikembangkan.", ikon: "sprout", urutan: 8 },
    { slug: "belajar-bertumbuh-berdampak", judul: "Belajar, Bertumbuh, Berdampak", ringkasan: "KARSA Bangun Desa Academy (KBD Academy) adalah lembaga pelatihan dan pengembangan kapasitas di bawah naungan Yayasan Karsa Bangun Desa, yang hadir sebagai KBD School of Business untuk memperkuat sumber daya manusia di tingkat desa dan komunitas lokal.", ikon: "contour", urutan: 9 },
    { slug: "listrik-energi-terbarukan", judul: "Listrik Energi Terbarukan Untuk Warga Desa", ringkasan: "Program LENTERA DESA hadir sebagai jawaban nyata atas tantangan ini. Dengan menghadirkan instalasi panel surya untuk masjid, mushola, dan gedung serbaguna di desa-desa binaan Karsa Bangun Desa.", ikon: "leaf", urutan: 10 }
  ],
  products: [
    { slug: "kopi-desa", nama: "Kopi Arabika Desa Binaan", kategori: "Komoditas", deskripsi: "Kopi olahan petani lokal binaan dengan cita rasa khas gunung Jawa Barat.", harga: 45000 },
    { slug: "madu-hutan", nama: "Madu Hutan Murni", kategori: "Hasil Alam", deskripsi: "Madu murni panen warga lokal tanpa bahan pengawet.", harga: 75000 }
  ],
  berita: [
    { slug: "pelatihan-bumdes-2026", judul: "Pelatihan Penguatan BUMDes Jawa Barat", ringkasan: "Karsa Bangun Desa menggelar workshop pengelolaan keuangan BUMDes.", konten: "Detail kegiatan pelatihan...", tanggal: "2026-08-20", kategori: "Kegiatan" }
  ]
};

let db = null;
try {
  const { DatabaseSync } = require("node:sqlite");
  require("./db/init.js");
  db = new DatabaseSync(path.join(__dirname, "db", "karsa.db"));
  db.exec("PRAGMA journal_mode = WAL;");
} catch (e) {
  console.log("Menjalankan dalam mode Serverless / Standalone (tanpa node:sqlite)");
}

// ---------- API ----------

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mode: db ? "SQLite" : "In-Memory Serverless", waktu: new Date().toISOString() });
});

app.get("/api/stats", (req, res) => {
  if (db) {
    try {
      const rows = db.prepare("SELECT label, nilai FROM stats ORDER BY id").all();
      return res.json(rows);
    } catch(e){}
  }
  res.json(MOCK_DATA.stats);
});

app.get("/api/team", (req, res) => {
  if (db) {
    try {
      const rows = db.prepare("SELECT nama, jabatan, divisi FROM team_members ORDER BY id").all();
      return res.json(rows);
    } catch(e){}
  }
  res.json(MOCK_DATA.team);
});

app.get("/api/programs", (req, res) => {
  if (db) {
    try {
      const rows = db.prepare("SELECT slug, judul, ringkasan, ikon FROM programs ORDER BY id").all();
      return res.json(rows);
    } catch(e){}
  }
  res.json(MOCK_DATA.programs);
});

app.get("/api/programs/:slug", (req, res) => {
  if (db) {
    try {
      const row = db.prepare("SELECT * FROM programs WHERE slug = ?").get(req.params.slug);
      if (row) return res.json(row);
    } catch(e){}
  }
  const item = MOCK_DATA.programs.find(p => p.slug === req.params.slug);
  if (!item) return res.status(404).json({ error: "Program tidak ditemukan" });
  res.json(item);
});

app.get("/api/products", (req, res) => {
  if (db) {
    try {
      const rows = db.prepare("SELECT slug, nama, kategori, deskripsi, harga FROM products ORDER BY id").all();
      return res.json(rows);
    } catch(e){}
  }
  res.json(MOCK_DATA.products);
});

app.get("/api/products/:slug", (req, res) => {
  if (db) {
    try {
      const row = db.prepare("SELECT * FROM products WHERE slug = ?").get(req.params.slug);
      if (row) return res.json(row);
    } catch(e){}
  }
  const item = MOCK_DATA.products.find(p => p.slug === req.params.slug);
  if (!item) return res.status(404).json({ error: "Produk tidak ditemukan" });
  res.json(item);
});

app.get("/api/berita", (req, res) => {
  if (db) {
    try {
      const rows = db.prepare("SELECT slug, judul, ringkasan, konten, tanggal, kategori FROM berita ORDER BY id").all();
      return res.json(rows);
    } catch(e){}
  }
  res.json(MOCK_DATA.berita);
});

// Form kontak
app.post("/api/contact", (req, res) => {
  const { nama, email, whatsapp, subjek, pesan } = req.body || {};
  if (!nama || !email || !pesan) {
    return res.status(400).json({ error: "Nama, email, dan pesan wajib diisi." });
  }
  if (db) {
    try {
      const stmt = db.prepare("INSERT INTO contact_messages (nama, email, whatsapp, subjek, pesan) VALUES (?, ?, ?, ?, ?)");
      const info = stmt.run(nama, email, whatsapp || null, subjek || null, pesan);
      return res.status(201).json({ ok: true, id: info.lastInsertRowid });
    } catch(e){}
  }
  res.status(201).json({ ok: true, id: Date.now() });
});

// Kalkulator Potensi Desa
function klasifikasiSkor(total) {
  if (total >= 17) return "Desa Mandiri";
  if (total >= 12) return "Desa Berkembang";
  if (total >= 7) return "Desa Berkembang Awal";
  return "Desa Tertinggal";
}

app.post("/api/kalkulator", (req, res) => {
  const {
    nama_pengguna, email, whatsapp, nama_desa, kecamatan, kabupaten,
    akses_jalan, sumber_daya_alam, sumber_daya_manusia, kelembagaan, infrastruktur,
  } = req.body || {};

  const skor = [akses_jalan, sumber_daya_alam, sumber_daya_manusia, kelembagaan, infrastruktur].map((v) => Number(v));

  if (!nama_pengguna || !nama_desa || skor.some((v) => !Number.isFinite(v) || v < 1 || v > 4)) {
    return res.status(400).json({ error: "Data belum lengkap." });
  }

  const total = skor.reduce((a, b) => a + b, 0);
  const klasifikasi = klasifikasiSkor(total);

  if (db) {
    try {
      const stmt = db.prepare(`
        INSERT INTO kalkulator_submissions
          (nama_pengguna, nama_desa, kecamatan, kabupaten, total_skor, klasifikasi)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(nama_pengguna, nama_desa, kecamatan || null, kabupaten || null, total, klasifikasi);
      return res.status(201).json({ ok: true, id: info.lastInsertRowid, total_skor: total, skor_maksimum: 20, klasifikasi });
    } catch(e){}
  }

  res.status(201).json({ ok: true, id: Date.now(), total_skor: total, skor_maksimum: 20, klasifikasi });
});

// ---------- Frontend statis ----------
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
app.use(express.static(FRONTEND_DIR));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Karsa Bangun Desa server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
