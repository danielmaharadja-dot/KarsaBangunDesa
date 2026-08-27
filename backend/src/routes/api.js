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
router.post("/admin/login", adminController.login);
router.get("/admin/overview", adminController.getOverview);
router.get("/admin/contacts", adminController.getContacts);
router.delete("/admin/contacts/:id", adminController.deleteContact);
router.get("/admin/kalkulator", adminController.getKalkulator);
router.delete("/admin/kalkulator/:id", adminController.deleteKalkulator);

// Admin Content CRUD Routes
router.post("/admin/berita", adminController.createBerita);
router.put("/admin/berita/:id", adminController.updateBerita);
router.delete("/admin/berita/:id", adminController.deleteBerita);

router.post("/admin/products", adminController.createProduct);
router.put("/admin/products/:id", adminController.updateProduct);
router.delete("/admin/products/:id", adminController.deleteProduct);

router.post("/admin/programs", adminController.createProgram);
router.put("/admin/programs/:id", adminController.updateProgram);
router.delete("/admin/programs/:id", adminController.deleteProgram);

router.post("/admin/team", adminController.createTeam);
router.put("/admin/team/:id", adminController.updateTeam);
router.delete("/admin/team/:id", adminController.deleteTeam);

module.exports = router;


