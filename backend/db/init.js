// Inisialisasi database SQLite: membuat skema dan mengisi data awal (seed)
const path = require("path");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");

const DB_PATH = path.join(__dirname, "karsa.db");
const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");

function init() {
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  db.exec(schema);

  const teamCount = db.prepare("SELECT COUNT(*) AS c FROM team_members").get().c;
  if (teamCount === 0) {
    const insertTeam = db.prepare(
      "INSERT INTO team_members (nama, jabatan, divisi) VALUES (?, ?, ?)"
    );
    const team = [
      ["Rahmat Saleh, S.Hut", "Ketua Dewan Pengurus", "Pengurus"],
      ["Syaiful Taslim", "Direktur Operasional", "Pengurus"],
      ["Linda Biki, S.E.", "Manajer Keuangan", "Keuangan"],
      ["Edi Wicaksono, S.P.", "Manajer Program", "Program"],
      ["Bardi Lamancori, S.Hut", "Manajer Internal", "Internal"],
      ["Lestari Ningsih", "Koordinator Divisi Perencanaan", "Program"],
    ];
    db.exec("BEGIN TRANSACTION;");
    for (const r of team) insertTeam.run(...r);
    db.exec("COMMIT;");
  }

  // Selalu bersihkan dan isi ulang tabel programs dengan 10 program unggulan resmi
  db.exec("DELETE FROM programs;");
  const insertProgram = db.prepare(
    "INSERT INTO programs (slug, judul, ringkasan, deskripsi, ikon) VALUES (?, ?, ?, ?, ?)"
  );
  const programs = [
    [
      "training",
      "Training",
      "Memberi solusi dan layanan terbaik untuk memenuhi kebutuhan dalam pengembangan desa",
      "Memberi solusi dan layanan terbaik untuk memenuhi kebutuhan dalam pengembangan desa",
      "terrace",
    ],
    [
      "coaching",
      "Coaching",
      "Memajukan pemimpin desa dalam menciptakan pengembangan desa yang luar biasa melalui solusi pembinaan terfokus",
      "Memajukan pemimpin desa dalam menciptakan pengembangan desa yang luar biasa melalui solusi pembinaan terfokus",
      "sprout",
    ],
    [
      "mentoring",
      "Mentoring",
      "Didampingi profesional yang berpengalaman luas dalam bidangnya dan akan membagikan pengetahuan, pengalaman dan wawasan",
      "Didampingi profesional yang berpengalaman luas dalam bidangnya dan akan membagikan pengetahuan, pengalaman dan wawasan",
      "leaf",
    ],
    [
      "consulting",
      "Consulting",
      "Memberi solusi yang efektif dalam mengoptimalkan berbagai potensi sumber daya yang ada di desa sebagai kunci keberhasilan pengembangan desa",
      "Memberi solusi yang efektif dalam mengoptimalkan berbagai potensi sumber daya yang ada di desa sebagai kunci keberhasilan pengembangan desa",
      "contour",
    ],
    [
      "berkah-berbagi-makan",
      "Berkah Berbagi Makan",
      "Program BBM adalah gerakan kolaborasi sosial yang menghubungkan kepedulian masyarakat dengan pemberdayaan UMKM lokal binaan Karsa Bangun Desa.",
      "Program BBM adalah gerakan kolaborasi sosial yang menghubungkan kepedulian masyarakat dengan pemberdayaan UMKM lokal binaan Karsa Bangun Desa.",
      "sprout",
    ],
    [
      "berkah-berbagi-quran",
      "Berkah Berbagi Qur’an",
      "Program BBQ hadir sebagai jembatan kepedulian masyarakat kota kepada saudara saudara kita di desa.",
      "Program BBQ hadir sebagai jembatan kepedulian masyarakat kota kepada saudara saudara kita di desa.",
      "leaf",
    ],
    [
      "saluran-air-warga",
      "Saluran Air untuk Warga Desa",
      "Program SAWER hadir untuk mewujudkan akses air bersih yang layak melalui pipanisasi dan pembangunan sumber air bagi warga desa binaan Karsa Bangun Desa di Jawa Barat.",
      "Program SAWER hadir untuk mewujudkan akses air bersih yang layak melalui pipanisasi dan pembangunan sumber air bagi warga desa binaan Karsa Bangun Desa di Jawa Barat.",
      "terrace",
    ],
    [
      "berkah-ekonomi-lokal-umkm",
      "Berkah Ekonomi Lokal untuk UMKM",
      "Seperti berlian yang lahir dari proses panjang dan diasah menjadi bernilai tinggi— UMKM desa binaan KBD memiliki potensi luar biasa yang menunggu untuk dikembangkan.",
      "Seperti berlian yang lahir dari proses panjang dan diasah menjadi bernilai tinggi— UMKM desa binaan KBD memiliki potensi luar biasa yang menunggu untuk dikembangkan.",
      "sprout",
    ],
    [
      "belajar-bertumbuh-berdampak",
      "Belajar, Bertumbuh, Berdampak",
      "KARSA Bangun Desa Academy (KBD Academy) adalah lembaga pelatihan dan pengembangan kapasitas di bawah naungan Yayasan Karsa Bangun Desa, yang hadir sebagai KBD School of Business untuk memperkuat sumber daya manusia di tingkat desa dan komunitas lokal.",
      "KARSA Bangun Desa Academy (KBD Academy) adalah lembaga pelatihan dan pengembangan kapasitas di bawah naungan Yayasan Karsa Bangun Desa, yang hadir sebagai KBD School of Business untuk memperkuat sumber daya manusia di tingkat desa dan komunitas lokal.",
      "contour",
    ],
    [
      "listrik-energi-terbarukan",
      "Listrik Energi Terbarukan Untuk Warga Desa",
      "Program LENTERA DESA hadir sebagai jawaban nyata atas tantangan ini. Dengan menghadirkan instalasi panel surya untuk masjid, mushola, dan gedung serbaguna di desa-desa binaan Karsa Bangun Desa.",
      "Program LENTERA DESA hadir sebagai jawaban nyata atas tantangan ini. Dengan menghadirkan instalasi panel surya untuk masjid, mushola, dan gedung serbaguna di desa-desa binaan Karsa Bangun Desa.",
      "leaf",
    ],
  ];
  db.exec("BEGIN TRANSACTION;");
  for (const r of programs) insertProgram.run(...r);
  db.exec("COMMIT;");

  // Selalu bersihkan dan isi ulang tabel products dengan produk unggulan resmi
  db.exec("DELETE FROM products;");
  const insertProduct = db.prepare(
    "INSERT INTO products (slug, nama, kategori, deskripsi, harga) VALUES (?, ?, ?, ?, ?)"
  );
  const products = [
    [
      "pelatihan-desa",
      "Paket Pelatihan Desa & BUMDes",
      "Training & Edukasi",
      "Pelatihan tatap muka dan praktis untuk aparatur desa & pengurus BUMDes dalam perencanaan bisnis, pembukuan digital, dan pemasaran produk lokal.",
      "Mulai dari Rp3.500.000 / kelompok",
    ],
    [
      "pendampingan-coaching",
      "Coaching & Pendampingan Desa Binaan",
      "Pendampingan",
      "Program pendampingan intensif selama 3-12 bulan untuk mengakselerasi pengembangan potensi komoditas dan kelembagaan ekonomi desa.",
      "Harga sesuai cakupan program",
    ],
    [
      "konsultasi-kelembagaan",
      "Konsultasi Kelembagaan & Perizinan",
      "Consulting",
      "Konsultasi legalitas, pembentukan struktur hukum BUMDes, Koperasi Merah Putih, dan perizinan usaha masyarakat desa.",
      "Mulai dari Rp1.500.000 / sesi",
    ],
    [
      "kopi-desa",
      "Kopi Arabika Priangan Desa Binaan",
      "Komoditas Desa",
      "Kopi khas pegunungan Jawa Barat hasil panen dan olahan kelompok tani binaan Karsa Bangun Desa dengan cita rasa murni.",
      "Rp45.000 / pack (250g)",
    ],
    [
      "madu-hutan",
      "Madu Hutan Murni Pasundan",
      "Hasil Alam",
      "Madu hutan murni 100% tanpa bahan pengawet hasil panen warga desa binaan dengan kualitas dan keaslian terjaga.",
      "Rp75.000 / botol (350ml)",
    ],
    [
      "kalkulator-potensi-desa",
      "Kalkulator Potensi Desa Digital",
      "Alat Bantu Digital",
      "Aplikasi digital gratis untuk mengukur dan mengklasifikasikan tingkat potensi serta kesiapan pembangunan desa secara instan.",
      "Gratis",
    ],
  ];
  db.exec("BEGIN TRANSACTION;");
  for (const r of products) insertProduct.run(...r);
  db.exec("COMMIT;");

  const statCount = db.prepare("SELECT COUNT(*) AS c FROM stats").get().c;
  if (statCount === 0) {
    const insertStat = db.prepare(
      "INSERT INTO stats (label, nilai) VALUES (?, ?)"
    );
    const stats = [
      ["Desa didampingi", "60+"],
      ["Kabupaten/kota terjangkau", "8"],
      ["Tahun pengalaman", "12+"],
      ["BUMDes diperkuat", "45+"],
    ];
    db.exec("BEGIN TRANSACTION;");
    for (const r of stats) insertStat.run(...r);
    db.exec("COMMIT;");
  }

  const beritaCount = db.prepare("SELECT COUNT(*) AS c FROM berita").get().c;
  if (beritaCount === 0) {
    const insertBerita = db.prepare(
      "INSERT INTO berita (slug, judul, ringkasan, konten, tanggal, kategori) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const beritaItems = [
      [
        "koperasi-merah-putih-nafas-baru-ekonomi-rakyat",
        "Koperasi Merah Putih, Nafas Baru Ekonomi Rakyat",
        "Mendorong kebangkitan ekonomi warga desa melalui kelembagaan koperasi desa yang transparan dan profesional.",
        "Pemberdayaan ekonomi warga desa melalui Koperasi Merah Putih membuka akses permodalan dan distribusi produk unggulan desa secara mandiri dan akuntabel.",
        "9 Juli 2025",
        "Ekonomi Desa",
      ],
      [
        "implementasi-koperasi-desa-merah-putih-di-jawa-barat",
        "Implementasi Koperasi Desa Merah Putih di Jawa Barat",
        "Pelaksanaan pendampingan kelembagaan dan pembinaan manajemen koperasi di berbagai desa Jawa Barat.",
        "Karsa Bangun Desa mendampingi implementasi Koperasi Desa Merah Putih di berbagai kabupaten di Jawa Barat untuk memperkuat daya saing produk lokal.",
        "21 April 2025",
        "Pendampingan",
      ],
      [
        "kolaborasi-pentahelix-pemberdayaan-desa",
        "Kolaborasi Pentahelix dalam Pendampingan dan Pemberdayaan Desa",
        "Memperkuat sinergi antara pemerintah, akademisi, bisnis, komunitas, dan media.",
        "Pendekatan pentahelix menjadi kunci utama Karsa Bangun Desa dalam menggerakkan potensi lokal secara holistik dan adaptif.",
        "20 Agustus 2026",
        "Inovasi Desa",
      ],
    ];
    db.exec("BEGIN TRANSACTION;");
    for (const r of beritaItems) insertBerita.run(...r);
    db.exec("COMMIT;");
  }

  console.log("Database siap di:", DB_PATH);
}

init();
module.exports = { db };
