const db = require("../config/db");
const MOCK_DATA = require("../config/mockData");

const statsModel = {
  getAll: () => {
    if (db) {
      try {
        return db.prepare("SELECT label, nilai FROM stats ORDER BY id").all();
      } catch (e) {}
    }
    return MOCK_DATA.stats;
  }
};

module.exports = statsModel;
