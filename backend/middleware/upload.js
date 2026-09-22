const multer = require("multer");
const path = require("path");

// إعداد مكان تخزين الصور واسم الملف
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  },
});

// السماح فقط بأنواع الصور المطلوبة
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("نوع الملف غير مدعوم، المسموح: jpeg, jpg, png, webp"));
  }
  cb(null, true);
};

// حد الحجم الأقصى 5MB
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

// سنستخدم upload.single("image") في مسارات المنتجات
module.exports = upload;

