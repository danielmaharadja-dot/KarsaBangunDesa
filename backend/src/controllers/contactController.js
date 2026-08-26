const contactModel = require("../models/contactModel");

const contactController = {
  submitContact: (req, res) => {
    const { nama, email, pesan } = req.body || {};
    if (!nama || !email || !pesan) {
      return res.status(400).json({ error: "Nama, email, dan pesan wajib diisi." });
    }
    const result = contactModel.create(req.body);
    res.status(201).json(result);
  }
};

module.exports = contactController;
