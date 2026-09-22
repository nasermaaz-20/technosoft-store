const mongoose = require("mongoose");

// مخطط بيانات المنتج
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["اكسسوارات", "قطع كمبيوتر", "أجهزة جاهزة"],
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

