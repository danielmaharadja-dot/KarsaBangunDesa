const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const programModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT slug, judul, ringkasan, ikon FROM programs ORDER BY id").all();
      } catch (e) {}
    }
    return MOCK_DATA.programs;
  },
  getBySlug: (slug) => {
    if (db) {
      try {
        const row = db.prepare("SELECT * FROM programs WHERE slug = ?").get(slug);
        if (row) return row;
      } catch (e) {}
    }
    return MOCK_DATA.programs.find(p => p.slug === slug) || null;
  }
};

module.exports = programModel;
