const express = require("express");
const router = express.Router();

const healthController = require("../controllers/healthController");
const statsController = require("../controllers/statsController");
const teamController = require("../controllers/teamController");
const programController = require("../controllers/programController");
const productController = require("../controllers/productController");
const beritaController = require("../controllers/beritaController");
const contactController = require("../controllers/contactController");
const kalkulatorController = require("../controllers/kalkulatorController");
const adminController = require("../controllers/adminController");

router.get("/health", healthController.getHealth);
router.get("/stats", statsController.getStats);
router.get("/team", teamController.getTeam);
router.get("/programs", programController.getPrograms);
router.get("/programs/:slug", programController.getProgramBySlug);
router.get("/products", productController.getProducts);
router.get("/products/:slug", productController.getProductBySlug);
router.get("/berita", beritaController.getBerita);

router.post("/contact", contactController.submitContact);
router.post("/kalkulator", kalkulatorController.calculateAndSubmit);

// Admin Dashboard Routes
router.get("/admin/overview", adminController.getOverview);
router.get("/admin/contacts", adminController.getContacts);
router.delete("/admin/contacts/:id", adminController.deleteContact);
router.get("/admin/kalkulator", adminController.getKalkulator);
router.delete("/admin/kalkulator/:id", adminController.deleteKalkulator);

module.exports = router;

