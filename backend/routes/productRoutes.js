const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// المسارات العامة (بدون توثيق)
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// المسارات الخاصة بالأدمن (محمية بالتوكن + رفع صورة)
router.post("/", auth, upload.single("image"), createProduct);
router.put("/:id", auth, upload.single("image"), updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;

