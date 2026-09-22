const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// دالة مساعدة لإنشاء توكن JWT
const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d", // صلاحية 7 أيام
    }
  );
};

// POST /api/auth/create
// إنشاء أدمن (مرة واحدة فقط — محمي في الإنتاج)
const createAdmin = async (req, res) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const setupSecret = req.headers["x-admin-setup-secret"];
      if (
        !process.env.ADMIN_SETUP_SECRET ||
        setupSecret !== process.env.ADMIN_SETUP_SECRET
      ) {
        return res.status(403).json({ message: "غير مسموح" });
      }
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "الرجاء إدخال اسم المستخدم وكلمة المرور" });
    }

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res
        .status(400)
        .json({ message: "اسم المستخدم مستخدم مسبقاً" });
    }

    const admin = await Admin.create({ username, password });

    return res.status(201).json({
      message: "تم إنشاء حساب الأدمن بنجاح",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("createAdmin error:", error.message);
    return res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// POST /api/auth/login
// تسجيل الدخول وإرجاع توكن
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "الرجاء إدخال اسم المستخدم وكلمة المرور" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
    }

    const token = generateToken(admin);

    return res.json({
      message: "تم تسجيل الدخول بنجاح",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("login error:", error.message);
    return res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

module.exports = {
  createAdmin,
  login,
};

