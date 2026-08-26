const productModel = require("../models/productModel");

const productController = {
  getProducts: (req, res) => {
    const data = productModel.getAll();
    res.json(data);
  },
  getProductBySlug: (req, res) => {
    const item = productModel.getBySlug(req.params.slug);
    if (!item) return res.status(404).json({ error: "Produk tidak ditemukan" });
    res.json(item);
  }
};

module.exports = productController;
