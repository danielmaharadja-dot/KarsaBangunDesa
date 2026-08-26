const path = require("path");

let db = null;
try {
  const { DatabaseSync } = require("node:sqlite");
  require("../../db/init.js");
  db = new DatabaseSync(path.join(__dirname, "../../db/karsa.db"));
  db.exec("PRAGMA journal_mode = WAL;");
} catch (e) {
  console.log("Menjalankan dalam mode Serverless / Standalone (tanpa node:sqlite)");
}

module.exports = db;
