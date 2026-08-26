const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const teamModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT nama, jabatan, divisi FROM team_members ORDER BY id").all();
      } catch (e) {}
    }
    return MOCK_DATA.team;
  }
};

module.exports = teamModel;
