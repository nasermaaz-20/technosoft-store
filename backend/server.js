const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/technosoft";

if (process.env.NODE_ENV === "production") {
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is required in production");
    process.exit(1);
  }

  if (!process.env.CLIENT_URL) {
    console.error("❌ CLIENT_URL is required in production");
    process.exit(1);
  }
}

// دالة لبدء السيرفر بعد الاتصال بقاعدة البيانات
const startServer = async () => {
  try {
    // الاتصال بقاعدة بيانات MongoDB
    await mongoose.connect(MONGO_URI, {
      // إعدادات حديثة لـ mongoose
    });

    console.log("✅ Connected to MongoDB");

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
};

startServer();