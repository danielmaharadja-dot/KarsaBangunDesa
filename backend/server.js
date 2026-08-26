const path = require("path");
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

const fs = require("fs");

const FRONTEND_BUILD_DIR = path.join(__dirname, "..", "frontend", "dist");
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
const staticDir = fs.existsSync(FRONTEND_BUILD_DIR) ? FRONTEND_BUILD_DIR : FRONTEND_DIR;

app.use(express.static(staticDir));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  const indexPath = fs.existsSync(path.join(FRONTEND_BUILD_DIR, "index.html"))
    ? path.join(FRONTEND_BUILD_DIR, "index.html")
    : path.join(FRONTEND_DIR, "index.html");
  res.sendFile(indexPath);
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Karsa Bangun Desa server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
