const express = require("express");
const { createAdmin, login } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.use(authLimiter);

// إنشاء أدمن جديد (مرة واحدة — محمي في الإنتاج)
router.post("/create", createAdmin);

// تسجيل الدخول
router.post("/login", login);

module.exports = router;

