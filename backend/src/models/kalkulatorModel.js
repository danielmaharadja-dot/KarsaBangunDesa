const db = require("../config/db");

function klasifikasiSkor(total) {
  if (total >= 17) return "Desa Mandiri";
  if (total >= 12) return "Desa Berkembang";
  if (total >= 7) return "Desa Berkembang Awal";
  return "Desa Tertinggal";
}

const kalkulatorModel = {
  create: (payload) => {
    const { nama_pengguna, nama_desa, kecamatan, kabupaten, total, klasifikasi } = payload;
    if (db) {
      try {
        const stmt = db.prepare(`
          INSERT INTO kalkulator_submissions
            (nama_pengguna, nama_desa, kecamatan, kabupaten, total_skor, klasifikasi)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(nama_pengguna, nama_desa, kecamatan || null, kabupaten || null, total, klasifikasi);
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {
        console.error("Error creating kalkulator submission:", e);
      }
    }
    return { ok: true, id: Date.now() };
  },

  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT * FROM kalkulator_submissions ORDER BY id DESC").all();
      } catch (e) {
        console.error("Error fetching kalkulator submissions:", e);
      }
    }
    return [];
  },

  delete: (id) => {
    if (db) {
      try {
        const stmt = db.prepare("DELETE FROM kalkulator_submissions WHERE id = ?");
        stmt.run(id);
        return { ok: true };
      } catch (e) {
        console.error("Error deleting kalkulator submission:", e);
      }
    }
    return { ok: true };
  },

  klasifikasiSkor
};

module.exports = kalkulatorModel;

