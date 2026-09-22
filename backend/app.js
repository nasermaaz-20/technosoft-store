const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");

const defaultDevOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const clientOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? clientOrigins
    : [...new Set([...defaultDevOrigins, ...clientOrigins])];

// إنشاء تطبيق إكسبريس
const app = express();

app.use(helmet());
app.use(apiLimiter);

// إعدادات عامة للـ API
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// خدمة مجلد رفع الصور كملفات ثابتة
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ربط الراوتس
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);

// مسار بسيط لاختبار أن الـ API تعمل
app.get("/api/health", (req, res) => {
  return res.json({
    status: "ok",
    message: "TechnoSoft API is running",
  });
});

module.exports = app;