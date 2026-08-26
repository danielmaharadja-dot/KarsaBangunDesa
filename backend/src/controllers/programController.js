const programModel = require("../models/programModel");

const programController = {
  getPrograms: (req, res) => {
    const data = programModel.getAll();
    res.json(data);
  },
  getProgramBySlug: (req, res) => {
    const item = programModel.getBySlug(req.params.slug);
    if (!item) return res.status(404).json({ error: "Program tidak ditemukan" });
    res.json(item);
  }
};

module.exports = programController;
