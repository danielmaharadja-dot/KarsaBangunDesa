const beritaModel = require("../models/beritaModel");

const beritaController = {
  getBerita: (req, res) => {
    const data = beritaModel.getAll();
    res.json(data);
  }
};

module.exports = beritaController;
