const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const beritaModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT slug, judul, ringkasan, konten, tanggal, kategori FROM berita ORDER BY id").all();
      } catch (e) {}
    }
    return MOCK_DATA.berita;
  }
};

module.exports = beritaModel;
