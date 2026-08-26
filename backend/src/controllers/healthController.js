const db = require("../config/db");

const healthController = {
  getHealth: (req, res) => {
    res.json({ ok: true, mode: db ? "SQLite" : "In-Memory Serverless", waktu: new Date().toISOString() });
  }
};

module.exports = healthController;
