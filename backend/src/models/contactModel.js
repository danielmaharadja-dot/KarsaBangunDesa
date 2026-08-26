const db = require("../config/db");

const contactModel = {
  create: (data) => {
    const { nama, email, whatsapp, subjek, pesan } = data;
    if (db) {
      try {
        const stmt = db.prepare("INSERT INTO contact_messages (nama, email, whatsapp, subjek, pesan) VALUES (?, ?, ?, ?, ?)");
        const info = stmt.run(nama, email, whatsapp || null, subjek || null, pesan);
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {}
    }
    return { ok: true, id: Date.now() };
  }
};

module.exports = contactModel;
