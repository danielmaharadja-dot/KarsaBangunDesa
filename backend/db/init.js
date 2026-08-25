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
      "INSERT INTO team_members (nama, jabatan, divisi, urutan) VALUES (?, ?, ?, ?)"
    );
    const team = [
      ["Rahmat Saleh, S.Hut", "Ketua Dewan Pengurus", "Pengurus", 1],
      ["Syaiful Taslim", "Direktur Operasional", "Pengurus", 2],
      ["Linda Biki, S.E.", "Manajer Keuangan", "Keuangan", 3],
      ["Edi Wicaksono, S.P.", "Manajer Program", "Program", 4],
      ["Bardi Lamancori, S.Hut", "Manajer Internal", "Internal", 5],
      ["Lestari Ningsih", "Koordinator Divisi Perencanaan", "Program", 6],
    ];
    db.exec("BEGIN TRANSACTION;");
    for (const r of team) insertTeam.run(...r);
    db.exec("COMMIT;");
  }

  // Selalu bersihkan dan isi ulang tabel programs dengan 10 program unggulan resmi
  db.exec("DELETE FROM programs;");
  const insertProgram = db.prepare(
    "INSERT INTO programs (slug, judul, subjudul, ringkasan, deskripsi, ikon, urutan) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const programs = [
    [
      "training",
      "Training",
      null,
      "Memberi solusi dan layanan terbaik untuk memenuhi kebutuhan dalam pengembangan desa",
      "Memberi solusi dan layanan terbaik untuk memenuhi kebutuhan dalam pengembangan desa",
      "terrace",
      1,
    ],
    [
      "coaching",
      "Coaching",
      null,
      "Memajukan pemimpin desa dalam menciptakan pengembangan desa yang luar biasa melalui solusi pembinaan terfokus",
      "Memajukan pemimpin desa dalam menciptakan pengembangan desa yang luar biasa melalui solusi pembinaan terfokus",
      "sprout",
      2,
    ],
    [
      "mentoring",
      "Mentoring",
      null,
      "Didampingi profesional yang berpengalaman luas dalam bidangnya dan akan membagikan pengetahuan, pengalaman dan wawasan",
      "Didampingi profesional yang berpengalaman luas dalam bidangnya dan akan membagikan pengetahuan, pengalaman dan wawasan",
      "leaf",
      3,
    ],
    [
      "consulting",
      "Consulting",
      null,
      "Memberi solusi yang efektif dalam mengoptimalkan berbagai potensi sumber daya yang ada di desa sebagai kunci keberhasilan pengembangan desa",
      "Memberi solusi yang efektif dalam mengoptimalkan berbagai potensi sumber daya yang ada di desa sebagai kunci keberhasilan pengembangan desa",
      "contour",
      4,
    ],
    [
      "berkah-berbagi-makan",
      "Berkah Berbagi Makan",
      null,
      "Program BBM adalah gerakan kolaborasi sosial yang menghubungkan kepedulian masyarakat dengan pemberdayaan UMKM lokal binaan Karsa Bangun Desa.",
      "Program BBM adalah gerakan kolaborasi sosial yang menghubungkan kepedulian masyarakat dengan pemberdayaan UMKM lokal binaan Karsa Bangun Desa.",
      "sprout",
      5,
    ],
    [
      "berkah-berbagi-quran",
      "Berkah Berbagi Qur’an",
      null,
      "Program BBQ hadir sebagai jembatan kepedulian masyarakat kota kepada saudara saudara kita di desa.",
      "Program BBQ hadir sebagai jembatan kepedulian masyarakat kota kepada saudara saudara kita di desa.",
      "leaf",
      6,
    ],
    [
      "saluran-air-warga",
      "Saluran Air untuk Warga Desa",
      null,
      "Program SAWER hadir untuk mewujudkan akses air bersih yang layak melalui pipanisasi dan pembangunan sumber air bagi warga desa binaan Karsa Bangun Desa di Jawa Barat.",
      "Program SAWER hadir untuk mewujudkan akses air bersih yang layak melalui pipanisasi dan pembangunan sumber air bagi warga desa binaan Karsa Bangun Desa di Jawa Barat.",
      "terrace",
      7,
    ],
    [
      "berkah-ekonomi-lokal-umkm",
      "Berkah Ekonomi Lokal untuk UMKM",
      "Andalan Negeri",
      "Seperti berlian yang lahir dari proses panjang dan diasah menjadi bernilai tinggi— UMKM desa binaan KBD memiliki potensi luar biasa yang menunggu untuk dikembangkan.",
      "Seperti berlian yang lahir dari proses panjang dan diasah menjadi bernilai tinggi— UMKM desa binaan KBD memiliki potensi luar biasa yang menunggu untuk dikembangkan.",
      "sprout",
      8,
    ],
    [
      "belajar-bertumbuh-berdampak",
      "Belajar, Bertumbuh, Berdampak",
      null,
      "KARSA Bangun Desa Academy (KBD Academy) adalah lembaga pelatihan dan pengembangan kapasitas di bawah naungan Yayasan Karsa Bangun Desa, yang hadir sebagai KBD School of Business untuk memperkuat sumber daya manusia di tingkat desa dan komunitas lokal.",
      "KARSA Bangun Desa Academy (KBD Academy) adalah lembaga pelatihan dan pengembangan kapasitas di bawah naungan Yayasan Karsa Bangun Desa, yang hadir sebagai KBD School of Business untuk memperkuat sumber daya manusia di tingkat desa dan komunitas lokal.",
      "contour",
      9,
    ],
    [
      "listrik-energi-terbarukan",
      "Listrik Energi Terbarukan Untuk Warga Desa",
      null,
      "Program LENTERA DESA hadir sebagai jawaban nyata atas tantangan ini. Dengan menghadirkan instalasi panel surya untuk masjid, mushola, dan gedung serbaguna di desa-desa binaan Karsa Bangun Desa.",
      "Program LENTERA DESA hadir sebagai jawaban nyata atas tantangan ini. Dengan menghadirkan instalasi panel surya untuk masjid, mushola, dan gedung serbaguna di desa-desa binaan Karsa Bangun Desa.",
      "leaf",
      10,
    ],
  ];
  db.exec("BEGIN TRANSACTION;");
  for (const r of programs) insertProgram.run(...r);
  db.exec("COMMIT;");

  const productCount = db.prepare("SELECT COUNT(*) AS c FROM products").get().c;
  if (productCount === 0) {
    const insertProduct = db.prepare(
      "INSERT INTO products (slug, nama, kategori, deskripsi, harga, urutan) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const products = [
      [
        "pelatihan-desa",
        "Paket Pelatihan Desa",
        "Training",
        "Pelatihan tatap muka atau daring untuk aparat dan pengurus BUMDes: perencanaan, pembukuan, dan pemasaran produk desa.",
        "Mulai dari Rp3.500.000 / kelompok",
        1,
      ],
      [
        "pendampingan-coaching",
        "Coaching Pendampingan Desa",
        "Coaching",
        "Pendampingan berkala selama 3-12 bulan untuk desa yang sedang menyusun rencana pengembangan potensi lokal.",
        "Harga sesuai cakupan program",
        2,
      ],
      [
        "konsultasi-kelembagaan",
        "Konsultasi Kelembagaan & Perizinan",
        "Consulting",
        "Konsultasi legalitas BUMDes, kelompok tani hutan, dan koperasi desa.",
        "Mulai dari Rp1.500.000 / sesi",
        3,
      ],
      [
        "kalkulator-potensi-desa",
        "Kalkulator Potensi Desa",
        "Alat Bantu",
        "Alat digital gratis untuk mengukur dan mengklasifikasikan potensi desa secara cepat sebagai dasar perencanaan.",
        "Gratis",
        4,
      ],
    ];
    db.exec("BEGIN TRANSACTION;");
    for (const r of products) insertProduct.run(...r);
    db.exec("COMMIT;");
  }

  const statCount = db.prepare("SELECT COUNT(*) AS c FROM stats").get().c;
  if (statCount === 0) {
    const insertStat = db.prepare(
      "INSERT INTO stats (label, nilai, urutan) VALUES (?, ?, ?)"
    );
    const stats = [
      ["Desa didampingi", "60+", 1],
      ["Kabupaten/kota terjangkau", "8", 2],
      ["Tahun pengalaman", "12+", 3],
      ["BUMDes diperkuat", "45+", 4],
    ];
    db.exec("BEGIN TRANSACTION;");
    for (const r of stats) insertStat.run(...r);
    db.exec("COMMIT;");
  }

  const beritaCount = db.prepare("SELECT COUNT(*) AS c FROM berita").get().c;
  if (beritaCount === 0) {
    const insertBerita = db.prepare(
      "INSERT INTO berita (slug, judul, ringkasan, konten, tanggal, kategori, urutan) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const beritaItems = [
      [
        "koperasi-merah-putih-nafas-baru-ekonomi-rakyat",
        "Koperasi Merah Putih, Nafas Baru Ekonomi Rakyat",
        "Mendorong kebangkitan ekonomi warga desa melalui kelembagaan koperasi desa yang transparan dan profesional.",
        "Pemberdayaan ekonomi warga desa melalui Koperasi Merah Putih membuka akses permodalan dan distribusi produk unggulan desa secara mandiri dan akuntabel.",
        "9 Juli 2025",
        "Ekonomi Desa",
        1,
      ],
      [
        "implementasi-koperasi-desa-merah-putih-di-jawa-barat",
        "Implementasi Koperasi Desa Merah Putih di Jawa Barat",
        "Pelaksanaan pendampingan kelembagaan dan pembinaan manajemen koperasi di berbagai desa Jawa Barat.",
        "Karsa Bangun Desa mendampingi implementasi Koperasi Desa Merah Putih di berbagai kabupaten di Jawa Barat untuk memperkuat daya saing produk lokal.",
        "21 April 2025",
        "Pendampingan",
        2,
      ],
      [
        "kolaborasi-pentahelix-pemberdayaan-desa",
        "Kolaborasi Pentahelix dalam Pendampingan dan Pemberdayaan Desa",
        "Memperkuat sinergi antara pemerintah, akademisi, bisnis, komunitas, dan media.",
        "Pendekatan pentahelix menjadi kunci utama Karsa Bangun Desa dalam menggerakkan potensi lokal secara holistik dan adaptif.",
        "20 Agustus 2026",
        "Inovasi Desa",
        3,
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
