# Karsa Bangun Desa — Website (Frontend + Backend + Database)

Website profil organisasi pendamping desa, terinspirasi dari struktur halaman
"Tentang" pada karsabangundesa.org: Beranda, Tentang, Program, Produk, dan Kontak,
ditambah fitur interaktif **Kalkulator Potensi Desa**.

> Catatan: konten (visi/misi, program, produk, susunan tim) adalah teks contoh yang
> disusun ulang dengan gaya serupa organisasi pendamping desa pada umumnya. Silakan
> sunting datanya di `backend/db/init.js` sesuai kondisi organisasi Anda yang sebenarnya.

## Struktur Proyek

```
karsa-bangun-desa/
├── backend/              # Node.js + Express + SQLite (API)
│   ├── db/
│   │   ├── schema.sql    # Skema tabel database
│   │   ├── init.js       # Membuat skema + mengisi data awal (seed)
│   │   └── karsa.db      # File database SQLite (dibuat otomatis saat pertama jalan)
│   ├── server.js         # Server Express: API + penyaji file frontend
│   └── package.json
└── frontend/              # HTML/CSS/JS statis (tanpa build step)
    ├── index.html         # Beranda
    ├── tentang.html        # Tentang Kami (profil, visi-misi, struktur organisasi)
    ├── program.html
    ├── produk.html
    ├── kalkulator.html     # Kalkulator Potensi Desa
    ├── kontak.html
    ├── css/style.css
    └── js/
        ├── common.js       # Header, footer, komponen bersama
        ├── main.js         # Data dinamis Beranda
        ├── kalkulator.js
        └── kontak.js
```

## Arsitektur

- **Frontend**: HTML/CSS/JavaScript murni (tanpa framework atau build step) agar mudah
  dijalankan dan dimodifikasi. Setiap halaman mengambil data dari API backend melalui `fetch()`.
- **Backend**: Node.js + Express, menyediakan REST API dan sekaligus menyajikan file frontend
  statis, sehingga cukup menjalankan satu server untuk seluruh situs.
- **Database**: SQLite (via `better-sqlite3`) — satu file `karsa.db`, tidak perlu instalasi
  server database terpisah. Skema dan data contoh dibuat otomatis saat server pertama kali dijalankan.

## Cara Menjalankan

Prasyarat: [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
cd backend
npm install
npm start
```

Server akan berjalan di **http://localhost:4000** dan langsung menyajikan seluruh
halaman frontend (backend juga bertindak sebagai web server statis).

Untuk membuat ulang database dari awal, hentikan server lalu hapus file database:

```bash
rm backend/db/karsa.db backend/db/karsa.db-*
npm start   # skema & data contoh akan dibuat ulang otomatis
```

## Endpoint API

| Method | Endpoint              | Keterangan                                   |
|--------|------------------------|-----------------------------------------------|
| GET    | `/api/health`          | Cek status server                              |
| GET    | `/api/stats`           | Statistik ringkas untuk Beranda               |
| GET    | `/api/team`            | Daftar pengurus (struktur organisasi)          |
| GET    | `/api/programs`        | Daftar program                                 |
| GET    | `/api/programs/:slug`  | Detail satu program                            |
| GET    | `/api/products`        | Daftar produk/layanan                          |
| POST   | `/api/contact`         | Simpan pesan dari formulir kontak              |
| POST   | `/api/kalkulator`      | Hitung & simpan hasil Kalkulator Potensi Desa  |

### Contoh body `POST /api/kalkulator`
```json
{
  "nama_pengguna": "Budi",
  "email": "budi@example.com",
  "whatsapp": "081234567890",
  "nama_desa": "Sukamaju",
  "kecamatan": "Cileunyi",
  "kabupaten": "Bandung",
  "akses_jalan": 3,
  "sumber_daya_alam": 4,
  "sumber_daya_manusia": 3,
  "kelembagaan": 2,
  "infrastruktur": 3
}
```
Setiap parameter dinilai 1 (rendah) hingga 4 (tinggi). Total skor (maks. 20) diklasifikasikan
menjadi: **Desa Tertinggal** (<7), **Desa Berkembang Awal** (7–11), **Desa Berkembang** (12–16),
**Desa Mandiri** (≥17).

## Menyesuaikan Konten

- **Teks & data contoh** (program, produk, tim, statistik): edit `backend/db/init.js`, lalu
  hapus `karsa.db` dan jalankan ulang server agar data baru ter-seed.
- **Tampilan/desain**: token warna & tipografi ada di bagian `:root` pada `frontend/css/style.css`.
- **Navigasi**: daftar menu ada di `NAV_LINKS` pada `frontend/js/common.js`.

## Menuju Produksi

Untuk deployment sesungguhnya, pertimbangkan:
- Menambahkan autentikasi admin sederhana untuk mengelola isi program/produk/tim tanpa
  mengedit kode langsung (mis. panel admin + endpoint `PUT`/`DELETE`).
- Mengganti SQLite dengan PostgreSQL/MySQL bila traffic dan jumlah data sudah besar
  (skema `schema.sql` mudah diadaptasi ke SQL standar).
- Menambahkan validasi & rate limiting pada endpoint `POST` publik (`/api/contact`, `/api/kalkulator`)
  untuk mencegah spam.
- Mengirim notifikasi email/WhatsApp otomatis saat ada pesan kontak baru.
