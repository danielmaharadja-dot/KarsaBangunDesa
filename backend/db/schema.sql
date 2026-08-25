-- Skema database Karsa Bangun Desa
-- SQLite

CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  divisi TEXT,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  subjudul TEXT,
  ringkasan TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  ikon TEXT DEFAULT 'terrace',
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  harga TEXT,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  nilai TEXT NOT NULL,
  urutan INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  subjek TEXT,
  pesan TEXT NOT NULL,
  dibuat_pada TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS kalkulator_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_pengguna TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  nama_desa TEXT NOT NULL,
  kecamatan TEXT,
  kabupaten TEXT,
  skor_akses_jalan INTEGER NOT NULL,
  skor_sumber_daya_alam INTEGER NOT NULL,
  skor_sumber_daya_manusia INTEGER NOT NULL,
  skor_kelembagaan INTEGER NOT NULL,
  skor_infrastruktur INTEGER NOT NULL,
  total_skor INTEGER NOT NULL,
  klasifikasi TEXT NOT NULL,
  dibuat_pada TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS berita (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  tanggal TEXT NOT NULL,
  kategori TEXT DEFAULT 'Kabar Desa',
  urutan INTEGER DEFAULT 0
);
