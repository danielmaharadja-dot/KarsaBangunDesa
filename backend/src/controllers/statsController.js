const statsModel = require("../models/statsModel");

const statsController = {
  getStats: (req, res) => {
    const data = statsModel.getAll();
    res.json(data);
  }
};

module.exports = statsController;
