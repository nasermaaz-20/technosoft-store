import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AdminTopbar from "../../layout/AdminTopbar";
import api from "../../services/api";
import { IMAGE_BASE_URL } from "../../config/env";

const initialForm = {
  name: "",
  description: "",
  category: "اكسسوارات",
  price: "",
};

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("technosoft_token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/products");
      setProducts(data || []);
    } catch (err) {
      setError("تعذّر جلب المنتجات، جرّب تحديث الصفحة.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setImageFile(null);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.description || !form.category) {
      setError("الرجاء تعبئة الاسم والوصف والتصنيف.");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      if (form.price) {
        formData.append("price", form.price);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchProducts();
      resetForm();
    } catch (err) {
      const msg =
        err?.response?.data?.message || "حدث خطأ أثناء حفظ المنتج، جرّب مرة أخرى.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "اكسسوارات",
      price: product.price || "",
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("تعذّر حذف المنتج، جرّب مرة أخرى.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <AdminTopbar />

      <main className="flex-1">
        {/* فورم الإضافة/التعديل */}
        <section className="border-b border-neutral-900 bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
            <div className="mb-6  items-center justify-between">
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                  Admin
                </p>
                <h1 className="mt-2 text-2xl font-bold text-neutral-50">
                  {editingId ? "تعديل المنتج" : "إضافة منتج جديد"}
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                  يمكنك إدارة المنتجات التي تظهر في صفحة المنتجات في الموقع.
                </p>
              </div>
<div className="flex justify-end lg:justify-start" >
              <button 
                type="button"
                onClick={() => navigate("/admin")}
                className=" whitespace-nowrap inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-100 hover:border-amber-400/70 hover:text-amber-200"
              >
                رجوع للوحة التحكم
              </button>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-100 hover:border-amber-400/70 hover:text-amber-200"
                >
                  <FaPlus className="h-4 w-4" />
                  منتج جديد
                </button>
              )}
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-right text-sm text-red-200">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-right md:grid-cols-2 md:gap-5"
            >
              <div className="md:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  اسم المنتج
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="مثال: ماوس جيمينغ RGB"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  التصنيف
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                >
                  <option value="اكسسوارات">اكسسوارات</option>
                  <option value="قطع كمبيوتر">قطع كمبيوتر</option>
                  <option value="أجهزة جاهزة">أجهزة جاهزة</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="وصف مختصر لمواصفات المنتج والاستخدام المناسب له."
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  السعر (اختياري)
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="مثال: 250000"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  صورة المنتج (jpeg, png, webp)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full cursor-pointer rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs text-neutral-300 file:mr-2 file:rounded-md file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-neutral-100 hover:border-amber-400"
                />
                {editingId && !imageFile && (
                  <p className="mt-1 text-[11px] text-neutral-500">
                    إذا لم تختر صورة جديدة سيبقى نفس الصورة الحالية.
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving
                    ? "جارِ الحفظ..."
                    : editingId
                    ? "تحديث المنتج"
                    : "إضافة المنتج"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* قائمة المنتجات */}
        <section className="bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-50">
                المنتجات الحالية
              </h2>
              <p className="text-xs text-neutral-500">
                عدد المنتجات: {products.length}
              </p>
            </div>

            {loading ? (
              <p className="text-sm text-neutral-400">جارِ تحميل المنتجات...</p>
            ) : products.length === 0 ? (
              <p className="text-sm text-neutral-400">
                لا توجد منتجات حتى الآن، قم بإضافة أول منتج من الأعلى.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
const imageUrl = product.image
? product.image.startsWith("http")
  ? product.image
  : `${IMAGE_BASE_URL}${product.image}`
: null;
                  return (
                    <article
                      key={product._id}
                      className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 text-right shadow-[0_14px_35px_rgba(0,0,0,0.5)]"
                    >
                      {imageUrl && (
                        <div className="mb-3 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                          <img
                            src={imageUrl}
                            alt={product.name}
                            loading="lazy"
                            className="h-36 w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <h3 className="text-base font-semibold text-neutral-50">
                          {product.name}
                        </h3>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                        <span className="rounded-full bg-neutral-900 px-3 py-1">
                          {product.category}
                        </span>
                        <span className="text-amber-300">
                          {product.price && product.price > 0
                            ? `${product.price.toLocaleString()} ل.س`
                            : "السعر عند الاتصال"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-neutral-100 hover:border-amber-400/70 hover:text-amber-200"
                        >
                          <FaEdit className="h-3.5 w-3.5" />
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="inline-flex items-center gap-1 rounded-full border border-red-600/60 px-3 py-1.5 text-red-200 hover:border-red-500 hover:bg-red-500/10"
                        >
                          <FaTrash className="h-3.5 w-3.5" />
                          حذف
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ManageProducts;

