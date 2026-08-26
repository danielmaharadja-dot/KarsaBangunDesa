const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const productModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT slug, nama, kategori, deskripsi, harga FROM products ORDER BY id").all();
      } catch (e) {}
    }
    return MOCK_DATA.products;
  },
  getBySlug: (slug) => {
    if (db) {
      try {
        const row = db.prepare("SELECT * FROM products WHERE slug = ?").get(slug);
        if (row) return row;
      } catch (e) {}
    }
    return MOCK_DATA.products.find(p => p.slug === slug) || null;
  }
};

module.exports = productModel;
