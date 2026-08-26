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
    { slug: "pelatihan-desa", nama: "Paket Pelatihan Desa & BUMDes", kategori: "Training & Edukasi", deskripsi: "Pelatihan tatap muka dan praktis untuk aparatur desa & pengurus BUMDes dalam perencanaan bisnis, pembukuan digital, dan pemasaran produk lokal.", harga: "Mulai dari Rp3.500.000 / kelompok" },
    { slug: "pendampingan-coaching", nama: "Coaching & Pendampingan Desa Binaan", kategori: "Pendampingan", deskripsi: "Program pendampingan intensif selama 3-12 bulan untuk mengakselerasi pengembangan potensi komoditas dan kelembagaan ekonomi desa.", harga: "Harga sesuai cakupan program" },
    { slug: "konsultasi-kelembagaan", nama: "Konsultasi Kelembagaan & Perizinan", kategori: "Consulting", deskripsi: "Konsultasi legalitas, pembentukan struktur hukum BUMDes, Koperasi Merah Putih, dan perizinan usaha masyarakat desa.", harga: "Mulai dari Rp1.500.000 / sesi" },
    { slug: "kopi-desa", nama: "Kopi Arabika Priangan Desa Binaan", kategori: "Komoditas Desa", deskripsi: "Kopi khas pegunungan Jawa Barat hasil panen dan olahan kelompok tani binaan Karsa Bangun Desa dengan cita rasa murni.", harga: "Rp45.000 / pack (250g)" },
    { slug: "madu-hutan", nama: "Madu Hutan Murni Pasundan", kategori: "Hasil Alam", deskripsi: "Madu hutan murni 100% tanpa bahan pengawet hasil panen warga desa binaan dengan kualitas dan keaslian terjaga.", harga: "Rp75.000 / botol (350ml)" },
    { slug: "kalkulator-potensi-desa", nama: "Kalkulator Potensi Desa Digital", kategori: "Alat Bantu Digital", deskripsi: "Aplikasi digital gratis untuk mengukur dan mengklasifikasikan tingkat potensi serta kesiapan pembangunan desa secara instan.", harga: "Gratis" }
  ],
  berita: [
    { slug: "pelatihan-bumdes-2026", judul: "Pelatihan Penguatan BUMDes Jawa Barat", ringkasan: "Karsa Bangun Desa menggelar workshop pengelolaan keuangan BUMDes.", konten: "Detail kegiatan pelatihan...", tanggal: "2026-08-20", kategori: "Kegiatan" }
  ]
};

module.exports = MOCK_DATA;
