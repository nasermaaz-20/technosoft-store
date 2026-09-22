const Service = require("../models/Service");

// GET /api/services
// جلب كل الخدمات (عام)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error("getAllServices error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// POST /api/services
// إضافة خدمة جديدة (أدمن فقط)
const createService = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "الرجاء إدخال عنوان الخدمة والوصف" });
    }

    const normalizedCategory =
      category === "software" || category === "hardware" ? category : "hardware";

    const service = await Service.create({
      title,
      description,
      category: normalizedCategory,
    });

    res.status(201).json({
      message: "تمت إضافة الخدمة بنجاح",
      service,
    });
  } catch (error) {
    console.error("createService error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// PUT /api/services/:id
// تعديل خدمة (أدمن فقط)
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "الخدمة غير موجودة" });
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (category === "hardware" || category === "software") {
      service.category = category;
    }

    await service.save();

    res.json({
      message: "تم تعديل الخدمة بنجاح",
      service,
    });
  } catch (error) {
    console.error("updateService error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

// DELETE /api/services/:id
// حذف خدمة (أدمن فقط)
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "الخدمة غير موجودة" });
    }

    res.json({ message: "تم حذف الخدمة بنجاح" });
  } catch (error) {
    console.error("deleteService error:", error.message);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};

