const Product = require("../models/Product");

// GET /api/products
// جلب كل المنتجات (عام)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("getAllProducts error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// GET /api/products/:id
// جلب منتج واحد بالتعريف (عام)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    res.json(product);
  } catch (error) {
    console.error("getProductById error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// POST /api/products
// إضافة منتج جديد (أدمن فقط)
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    if (!name || !description || !category) {
      return res
        .status(400)
        .json({ message: "الرجاء إدخال الاسم والوصف والتصنيف" });
    }

    let imagePath = "";
    if (req.file) {
      // سنخزن المسار النسبي للوصول إليه من الواجهة الأمامية
      imagePath = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      description,
      category,
      price: price || 0,
      image: imagePath,
    });

    res.status(201).json({
      message: "تم إضافة المنتج بنجاح",
      product,
    });
  } catch (error) {
    console.error("createProduct error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// PUT /api/products/:id
// تعديل منتج (أدمن فقط)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    // تعديل الحقول
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (typeof price !== "undefined") product.price = price;

    // في حال رفع صورة جديدة
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.json({
      message: "تم تعديل المنتج بنجاح",
      product,
    });
  } catch (error) {
    console.error("updateProduct error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// DELETE /api/products/:id
// حذف منتج (أدمن فقط)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    res.json({ message: "تم حذف المنتج بنجاح" });
  } catch (error) {
    console.error("deleteProduct error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

