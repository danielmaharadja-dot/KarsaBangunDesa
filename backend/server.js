const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mount API routes on both /api and root / for Vercel Serverless flexibility
app.use("/api", apiRoutes);
app.use("/", apiRoutes);

// Root fallback handler for backend standalone deployment
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Karsa Bangun Desa API Backend Server",
    endpoints: {
      health: "/api/health",
      programs: "/api/programs",
      products: "/api/products",
      berita: "/api/berita",
      stats: "/api/stats",
      team: "/api/team",
      kalkulator: "POST /api/kalkulator",
      contact: "POST /api/contact"
    }
  });
});

const FRONTEND_BUILD_DIR = path.join(__dirname, "..", "frontend", "dist");
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");

if (fs.existsSync(FRONTEND_BUILD_DIR) || fs.existsSync(FRONTEND_DIR)) {
  const staticDir = fs.existsSync(FRONTEND_BUILD_DIR) ? FRONTEND_BUILD_DIR : FRONTEND_DIR;
  app.use(express.static(staticDir));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    const indexPath = fs.existsSync(path.join(FRONTEND_BUILD_DIR, "index.html"))
      ? path.join(FRONTEND_BUILD_DIR, "index.html")
      : path.join(FRONTEND_DIR, "index.html");

    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    next();
  });
}

// 404 handler for unmatched API or static routes
app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`
  });
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Karsa Bangun Desa server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
