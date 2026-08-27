const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const teamModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT id, nama, jabatan, divisi FROM team_members ORDER BY id DESC").all();
      } catch (e) {
        console.error("Error fetching team members:", e);
      }
    }
    return MOCK_DATA.team.map((t, idx) => ({ id: idx + 1, ...t }));
  },
  create: (data) => {
    const { nama, jabatan, divisi } = data;
    if (db) {
      try {
        const stmt = db.prepare("INSERT INTO team_members (nama, jabatan, divisi) VALUES (?, ?, ?)");
        const info = stmt.run(nama, jabatan, divisi);
        return { ok: true, id: info.lastInsertRowid };
      } catch (e) {
        console.error("Error creating team member:", e);
      }
    }
    const newMember = { id: Date.now(), nama, jabatan, divisi };
    MOCK_DATA.team.unshift(newMember);
    return { ok: true, id: newMember.id };
  },
  update: (id, data) => {
    const { nama, jabatan, divisi } = data;
    if (db) {
      try {
        const stmt = db.prepare("UPDATE team_members SET nama=?, jabatan=?, divisi=? WHERE id=?");
        stmt.run(nama, jabatan, divisi, id);
        return { ok: true };
      } catch (e) {
        console.error("Error updating team member:", e);
      }
    }
    return { ok: true };
  },
  delete: (id) => {
    if (db) {
      try {
        db.prepare("DELETE FROM team_members WHERE id=?").run(id);
        return { ok: true };
      } catch (e) {
        console.error("Error deleting team member:", e);
      }
    }
    return { ok: true };
  }
};

module.exports = teamModel;

