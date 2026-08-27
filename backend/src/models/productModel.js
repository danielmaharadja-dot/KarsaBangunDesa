const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const productModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT id, slug, nama, kategori, deskripsi, harga FROM products ORDER BY id DESC").all();
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    }
    return MOCK_DATA.products.map((p, idx) => ({ id: idx + 1, ...p }));
  },
  getBySlug: (slug) => {
    if (db) {
      try {
        const row = db.prepare("SELECT * FROM products WHERE slug = ?").get(slug);
        if (row) return row;
      } catch (e) {}
    }
    return MOCK_DATA.products.find(p => p.slug === slug) || null;
  },
  create: (data) => {
    const { slug, nama, kategori, deskripsi, harga } = data;
    if (db) {
      try {
        const stmt = db.prepare("INSERT INTO products (slug, nama, kategori, deskripsi, harga) VALUES (?, ?, ?, ?, ?)");
        const info = stmt.run(slug, nama, kategori, deskripsi, harga);
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {
        console.error("Error creating product:", e);
      }
    }
    const newProduct = { id: Date.now(), slug, nama, kategori, deskripsi, harga };
    MOCK_DATA.products.unshift(newProduct);
    return { ok: true, id: newProduct.id };
  },
  update: (id, data) => {
    const { slug, nama, kategori, deskripsi, harga } = data;
    if (db) {
      try {
        const stmt = db.prepare("UPDATE products SET slug=?, nama=?, kategori=?, deskripsi=?, harga=? WHERE id=?");
        stmt.run(slug, nama, kategori, deskripsi, harga, id);
        return { ok: true };
      } catch (e) {
        console.error("Error updating product:", e);
      }
    }
    return { ok: true };
  },
  delete: (id) => {
    if (db) {
      try {
        db.prepare("DELETE FROM products WHERE id=?").run(id);
        return { ok: true };
      } catch (e) {
        console.error("Error deleting product:", e);
      }
    }
    return { ok: true };
  }
};

module.exports = productModel;

