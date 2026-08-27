const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const beritaModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT id, slug, judul, ringkasan, konten, tanggal, kategori FROM berita ORDER BY id DESC").all();
      } catch (e) {
        console.error("Error fetching berita:", e);
      }
    }
    return MOCK_DATA.berita.map((b, idx) => ({ id: idx + 1, ...b }));
  },
  create: (data) => {
    const { slug, judul, ringkasan, konten, tanggal, kategori } = data;
    if (db) {
      try {
        const stmt = db.prepare("INSERT INTO berita (slug, judul, ringkasan, konten, tanggal, kategori) VALUES (?, ?, ?, ?, ?, ?)");
        const info = stmt.run(slug, judul, ringkasan, konten, tanggal || new Date().toLocaleDateString("id-ID"), kategori || "Kabar Desa");
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {
        console.error("Error creating berita:", e);
      }
    }
    const newBerita = { id: Date.now(), slug, judul, ringkasan, konten, tanggal, kategori };
    MOCK_DATA.berita.unshift(newBerita);
    return { ok: true, id: newBerita.id };
  },
  update: (id, data) => {
    const { slug, judul, ringkasan, konten, tanggal, kategori } = data;
    if (db) {
      try {
        const stmt = db.prepare("UPDATE berita SET slug=?, judul=?, ringkasan=?, konten=?, tanggal=?, kategori=? WHERE id=?");
        stmt.run(slug, judul, ringkasan, konten, tanggal, kategori, id);
        return { ok: true };
      } catch (e) {
        console.error("Error updating berita:", e);
      }
    }
    return { ok: true };
  },
  delete: (id) => {
    if (db) {
      try {
        db.prepare("DELETE FROM berita WHERE id=?").run(id);
        return { ok: true };
      } catch (e) {
        console.error("Error deleting berita:", e);
      }
    }
    return { ok: true };
  }
};

module.exports = beritaModel;

