const express = require("express");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const auth = require("../middleware/auth");

const router = express.Router();

// المسار العام لجلب الخدمات
router.get("/", getAllServices);

// مسارات الأدمن لإدارة الخدمات
router.post("/", auth, createService);
router.put("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

module.exports = router;

