-- Skema Database SQLite Karsa Bangun Desa (Sederhana & Efisien)

-- 1. Tabel Anggota Tim (Struktur Organisasi)
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  divisi TEXT NOT NULL
);

-- 2. Tabel Program Unggulan
CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  ringkasan TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  ikon TEXT DEFAULT 'sprout'
);

-- 3. Tabel Produk & Layanan
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  harga TEXT NOT NULL
);

-- 4. Tabel Statistik Beranda
CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  nilai TEXT NOT NULL
);

-- 5. Tabel Pesan Kontak (Form Kontak)
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  subjek TEXT,
  pesan TEXT NOT NULL,
  dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabel Hasil Kalkulator Potensi Desa
CREATE TABLE IF NOT EXISTS kalkulator_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_pengguna TEXT NOT NULL,
  nama_desa TEXT NOT NULL,
  kecamatan TEXT,
  kabupaten TEXT,
  total_skor INTEGER NOT NULL,
  klasifikasi TEXT NOT NULL,
  dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabel Berita & Kabar Desa
CREATE TABLE IF NOT EXISTS berita (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  judul TEXT NOT NULL,
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  tanggal TEXT NOT NULL,
  kategori TEXT DEFAULT 'Kabar Desa'
);

