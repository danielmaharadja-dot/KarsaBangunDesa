// Server backend Karsa Bangun Desa
// Menyediakan REST API (programs, products, team, stats, contact, kalkulator)
// dan menyajikan file frontend statis.

const path = require("path");
const express = require("express");
const cors = require("cors");
const { DatabaseSync } = require("node:sqlite");

// Pastikan skema & data awal sudah ada
require("./db/init.js");

const db = new DatabaseSync(path.join(__dirname, "db", "karsa.db"));
db.exec("PRAGMA journal_mode = WAL;");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ---------- API ----------

app.get("/api/health", (req, res) => {
  res.json({ ok: true, waktu: new Date().toISOString() });
});

app.get("/api/stats", (req, res) => {
  const rows = db.prepare("SELECT label, nilai FROM stats ORDER BY urutan").all();
  res.json(rows);
});

app.get("/api/team", (req, res) => {
  const rows = db
    .prepare("SELECT nama, jabatan, divisi FROM team_members ORDER BY urutan")
    .all();
  res.json(rows);
});

app.get("/api/programs", (req, res) => {
  const rows = db
    .prepare(
      "SELECT slug, judul, ringkasan, ikon FROM programs ORDER BY urutan"
    )
    .all();
  res.json(rows);
});

app.get("/api/programs/:slug", (req, res) => {
  const row = db
    .prepare("SELECT * FROM programs WHERE slug = ?")
    .get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Program tidak ditemukan" });
  res.json(row);
});

app.get("/api/products", (req, res) => {
  const rows = db
    .prepare(
      "SELECT slug, nama, kategori, deskripsi, harga FROM products ORDER BY urutan"
    )
    .all();
  res.json(rows);
});

app.get("/api/berita", (req, res) => {
  const rows = db
    .prepare("SELECT slug, judul, ringkasan, konten, tanggal, kategori FROM berita ORDER BY urutan")
    .all();
  res.json(rows);
});

app.get("/api/berita/:slug", (req, res) => {
  const row = db
    .prepare("SELECT * FROM berita WHERE slug = ?")
    .get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Berita tidak ditemukan" });
  res.json(row);
});

// Form kontak
app.post("/api/contact", (req, res) => {
  const { nama, email, whatsapp, subjek, pesan } = req.body || {};
  if (!nama || !email || !pesan) {
    return res
      .status(400)
      .json({ error: "Nama, email, dan pesan wajib diisi." });
  }
  const stmt = db.prepare(
    "INSERT INTO contact_messages (nama, email, whatsapp, subjek, pesan) VALUES (?, ?, ?, ?, ?)"
  );
  const info = stmt.run(nama, email, whatsapp || null, subjek || null, pesan);
  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

// Kalkulator Potensi Desa
// Setiap parameter dinilai 1 (rendah) - 4 (tinggi). Total maksimum 20.
function klasifikasiSkor(total) {
  if (total >= 17) return "Desa Mandiri";
  if (total >= 12) return "Desa Berkembang";
  if (total >= 7) return "Desa Berkembang Awal";
  return "Desa Tertinggal";
}

app.post("/api/kalkulator", (req, res) => {
  const {
    nama_pengguna,
    email,
    whatsapp,
    nama_desa,
    kecamatan,
    kabupaten,
    akses_jalan,
    sumber_daya_alam,
    sumber_daya_manusia,
    kelembagaan,
    infrastruktur,
  } = req.body || {};

  const skor = [
    akses_jalan,
    sumber_daya_alam,
    sumber_daya_manusia,
    kelembagaan,
    infrastruktur,
  ].map((v) => Number(v));

  if (
    !nama_pengguna ||
    !nama_desa ||
    skor.some((v) => !Number.isFinite(v) || v < 1 || v > 4)
  ) {
    return res.status(400).json({
      error:
        "Data belum lengkap. Pastikan nama, nama desa, dan semua parameter (1-4) terisi.",
    });
  }

  const total = skor.reduce((a, b) => a + b, 0);
  const klasifikasi = klasifikasiSkor(total);

  const stmt = db.prepare(`
    INSERT INTO kalkulator_submissions
      (nama_pengguna, email, whatsapp, nama_desa, kecamatan, kabupaten,
       skor_akses_jalan, skor_sumber_daya_alam, skor_sumber_daya_manusia,
       skor_kelembagaan, skor_infrastruktur, total_skor, klasifikasi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    nama_pengguna,
    email || null,
    whatsapp || null,
    nama_desa,
    kecamatan || null,
    kabupaten || null,
    skor[0],
    skor[1],
    skor[2],
    skor[3],
    skor[4],
    total,
    klasifikasi
  );

  res.status(201).json({
    ok: true,
    id: info.lastInsertRowid,
    total_skor: total,
    skor_maksimum: 20,
    klasifikasi,
  });
});

// ---------- Frontend statis ----------
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
app.use(express.static(FRONTEND_DIR));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Karsa Bangun Desa server berjalan di http://localhost:${PORT}`);
});
