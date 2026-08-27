const contactModel = require("../models/contactModel");
const kalkulatorModel = require("../models/kalkulatorModel");
const beritaModel = require("../models/beritaModel");
const productModel = require("../models/productModel");
const programModel = require("../models/programModel");
const teamModel = require("../models/teamModel");

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin123";

const adminController = {
  login: (req, res) => {
    const { passcode } = req.body || {};
    if (passcode === ADMIN_PASSCODE) {
      return res.json({ ok: true, message: "Login Admin Berhasil", token: "admin-session-token" });
    }
    return res.status(401).json({ error: "Sandi PIN Admin tidak valid." });
  },

  getOverview: (req, res) => {
    try {
      const contacts = contactModel.getAll();
      const kalkulator = kalkulatorModel.getAll();
      const berita = beritaModel.getAll();
      const products = productModel.getAll();
      const programs = programModel.getAll();
      const team = teamModel.getAll();

      const klasifikasiCounts = {
        "Desa Mandiri": 0,
        "Desa Berkembang": 0,
        "Desa Berkembang Awal": 0,
        "Desa Tertinggal": 0,
      };

      kalkulator.forEach((item) => {
        if (item.klasifikasi in klasifikasiCounts) {
          klasifikasiCounts[item.klasifikasi]++;
        }
      });

      res.json({
        totalContacts: contacts.length,
        totalKalkulator: kalkulator.length,
        totalBerita: berita.length,
        totalProducts: products.length,
        totalPrograms: programs.length,
        totalTeam: team.length,
        klasifikasiCounts,
        recentContacts: contacts.slice(0, 5),
        recentKalkulator: kalkulator.slice(0, 5),
      });
    } catch (err) {
      console.error("Admin overview error:", err);
      res.status(500).json({ error: "Gagal mengambil data ringkasan admin." });
    }
  },

  // Contact Messages
  getContacts: (req, res) => {
    try {
      res.json(contactModel.getAll());
    } catch (err) {
      res.status(500).json({ error: "Gagal mengambil data pesan kontak." });
    }
  },

  deleteContact: (req, res) => {
    try {
      const { id } = req.params;
      res.json(contactModel.delete(id));
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus data kontak." });
    }
  },

  // Kalkulator Submissions
  getKalkulator: (req, res) => {
    try {
      res.json(kalkulatorModel.getAll());
    } catch (err) {
      res.status(500).json({ error: "Gagal mengambil data kalkulator desa." });
    }
  },

  deleteKalkulator: (req, res) => {
    try {
      const { id } = req.params;
      res.json(kalkulatorModel.delete(id));
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus data kalkulator." });
    }
  },

  // Berita CRUD
  createBerita: (req, res) => {
    try {
      res.status(201).json(beritaModel.create(req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal menambah berita." });
    }
  },

  updateBerita: (req, res) => {
    try {
      const { id } = req.params;
      res.json(beritaModel.update(id, req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal memperbarui berita." });
    }
  },

  deleteBerita: (req, res) => {
    try {
      const { id } = req.params;
      res.json(beritaModel.delete(id));
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus berita." });
    }
  },

  // Products CRUD
  createProduct: (req, res) => {
    try {
      res.status(201).json(productModel.create(req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal menambah produk." });
    }
  },

  updateProduct: (req, res) => {
    try {
      const { id } = req.params;
      res.json(productModel.update(id, req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal memperbarui produk." });
    }
  },

  deleteProduct: (req, res) => {
    try {
      const { id } = req.params;
      res.json(productModel.delete(id));
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus produk." });
    }
  },

  // Programs CRUD
  createProgram: (req, res) => {
    try {
      res.status(201).json(programModel.create(req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal menambah program." });
    }
  },

  updateProgram: (req, res) => {
    try {
      const { id } = req.params;
      res.json(programModel.update(id, req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal memperbarui program." });
    }
  },

  deleteProgram: (req, res) => {
    try {
      const { id } = req.params;
      res.json(programModel.delete(id));
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus program." });
    }
  },

  // Team CRUD
  createTeam: (req, res) => {
    try {
      res.status(201).json(teamModel.create(req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal menambah anggota tim." });
    }
  },

  updateTeam: (req, res) => {
    try {
      const { id } = req.params;
      res.json(teamModel.update(id, req.body));
    } catch (err) {
      res.status(500).json({ error: "Gagal memperbarui anggota tim." });
    }
  },

  deleteTeam: (req, res) => {
    try {
      const { id } = req.params;
      res.json(teamModel.delete(id));
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus anggota tim." });
    }
  }
};

module.exports = adminController;

