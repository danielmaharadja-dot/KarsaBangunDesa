const db = require("../config/db");

const contactModel = {
  create: (data) => {
    const { nama, email, whatsapp, subjek, pesan } = data;
    if (db) {
      try {
        const stmt = db.prepare("INSERT INTO contact_messages (nama, email, whatsapp, subjek, pesan) VALUES (?, ?, ?, ?, ?)");
        const info = stmt.run(nama, email, whatsapp || null, subjek || null, pesan);
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {
        console.error("Error creating contact message:", e);
      }
    }
    return { ok: true, id: Date.now() };
  },

  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT * FROM contact_messages ORDER BY id DESC").all();
      } catch (e) {
        console.error("Error fetching contact messages:", e);
      }
    }
    return [];
  },

  delete: (id) => {
    if (db) {
      try {
        const stmt = db.prepare("DELETE FROM contact_messages WHERE id = ?");
        stmt.run(id);
        return { ok: true };
      } catch (e) {
        console.error("Error deleting contact message:", e);
      }
    }
    return { ok: true };
  }
};

module.exports = contactModel;

