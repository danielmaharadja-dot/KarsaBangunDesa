const kalkulatorModel = require("../models/kalkulatorModel");

const kalkulatorController = {
  calculateAndSubmit: (req, res) => {
    const {
      nama_pengguna, email, whatsapp, nama_desa, kecamatan, kabupaten,
      akses_jalan, sumber_daya_alam, sumber_daya_manusia, kelembagaan, infrastruktur,
    } = req.body || {};

    const skor = [akses_jalan, sumber_daya_alam, sumber_daya_manusia, kelembagaan, infrastruktur].map((v) => Number(v));

    if (!nama_pengguna || !nama_desa || skor.some((v) => !Number.isFinite(v) || v < 1 || v > 4)) {
      return res.status(400).json({ error: "Data belum lengkap." });
    }

    const total = skor.reduce((a, b) => a + b, 0);
    const klasifikasi = kalkulatorModel.klasifikasiSkor(total);

    const result = kalkulatorModel.create({
      nama_pengguna, nama_desa, kecamatan, kabupaten, total, klasifikasi
    });

    res.status(201).json({
      ok: true,
      id: result.id,
      total_skor: total,
      skor_maksimum: 20,
      klasifikasi
    });
  }
};

module.exports = kalkulatorController;
