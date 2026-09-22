const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// مخطط بيانات الأدمن
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// قبل حفظ الأدمن، نقوم بتشفير كلمة المرور
adminSchema.pre("save", async function () {
  const admin = this;

  if (!admin.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

// ميثود لمقارنة كلمة المرور المدخلة مع المخزنة
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

