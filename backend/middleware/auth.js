const jwt = require("jsonwebtoken");

// ميدلوير حماية المسارات الخاصة بلوحة التحكم (أدمن فقط)
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    // نتوقع التوكن بالشكل: "Bearer TOKEN"
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "غير مصرح، يجب تسجيل الدخول" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "توكن مفقود" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // نضيف بيانات الأدمن إلى الطلب لاستخدامها لاحقاً إن احتجنا
    req.admin = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "جلسة منتهية أو توكن غير صالح" });
  }
};

module.exports = auth;

