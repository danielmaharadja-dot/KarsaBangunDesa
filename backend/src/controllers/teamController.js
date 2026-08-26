const teamModel = require("../models/teamModel");

const teamController = {
  getTeam: (req, res) => {
    const data = teamModel.getAll();
    res.json(data);
  }
};

module.exports = teamController;
