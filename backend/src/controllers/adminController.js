const contactModel = require("../models/contactModel");
const kalkulatorModel = require("../models/kalkulatorModel");

const adminController = {
  getOverview: (req, res) => {
    try {
      const contacts = contactModel.getAll();
      const kalkulator = kalkulatorModel.getAll();

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
        klasifikasiCounts,
        recentContacts: contacts.slice(0, 5),
        recentKalkulator: kalkulator.slice(0, 5),
      });
    } catch (err) {
      console.error("Admin overview error:", err);
      res.status(500).json({ error: "Gagal mengambil data ringkasan admin." });
    }
  },

  getContacts: (req, res) => {
    try {
      const data = contactModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Gagal mengambil data pesan kontak." });
    }
  },

  deleteContact: (req, res) => {
    try {
      const { id } = req.params;
      const result = contactModel.delete(id);
      res.json({ ok: true, message: `Pesan ID ${id} berhasil dihapus.` });
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus data kontak." });
    }
  },

  getKalkulator: (req, res) => {
    try {
      const data = kalkulatorModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Gagal mengambil data kalkulator desa." });
    }
  },

  deleteKalkulator: (req, res) => {
    try {
      const { id } = req.params;
      const result = kalkulatorModel.delete(id);
      res.json({ ok: true, message: `Hasil kalkulator ID ${id} berhasil dihapus.` });
    } catch (err) {
      res.status(500).json({ error: "Gagal menghapus data kalkulator." });
    }
  }
};

module.exports = adminController;
