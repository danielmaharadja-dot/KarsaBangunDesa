const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const programModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT id, slug, judul, ringkasan, deskripsi, ikon FROM programs ORDER BY id DESC").all();
      } catch (e) {
        console.error("Error fetching programs:", e);
      }
    }
    return MOCK_DATA.programs.map((p, idx) => ({ id: idx + 1, ...p }));
  },
  getBySlug: (slug) => {
    if (db) {
      try {
        const row = db.prepare("SELECT * FROM programs WHERE slug = ?").get(slug);
        if (row) return row;
      } catch (e) {}
    }
    return MOCK_DATA.programs.find(p => p.slug === slug) || null;
  },
  create: (data) => {
    const { slug, judul, ringkasan, deskripsi, ikon } = data;
    if (db) {
      try {
        const stmt = db.prepare("INSERT INTO programs (slug, judul, ringkasan, deskripsi, ikon) VALUES (?, ?, ?, ?, ?)");
        const info = stmt.run(slug, judul, ringkasan, deskripsi || ringkasan, ikon || "sprout");
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {
        console.error("Error creating program:", e);
      }
    }
    const newProg = { id: Date.now(), slug, judul, ringkasan, deskripsi, ikon };
    MOCK_DATA.programs.unshift(newProg);
    return { ok: true, id: newProg.id };
  },
  update: (id, data) => {
    const { slug, judul, ringkasan, deskripsi, ikon } = data;
    if (db) {
      try {
        const stmt = db.prepare("UPDATE programs SET slug=?, judul=?, ringkasan=?, deskripsi=?, ikon=? WHERE id=?");
        stmt.run(slug, judul, ringkasan, deskripsi, ikon, id);
        return { ok: true };
      } catch (e) {
        console.error("Error updating program:", e);
      }
    }
    return { ok: true };
  },
  delete: (id) => {
    if (db) {
      try {
        db.prepare("DELETE FROM programs WHERE id=?").run(id);
        return { ok: true };
      } catch (e) {
        console.error("Error deleting program:", e);
      }
    }
    return { ok: true };
  }
};

module.exports = programModel;

