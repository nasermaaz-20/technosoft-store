import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AdminTopbar from "../../layout/AdminTopbar";
import api from "../../services/api";

const initialForm = {
  title: "",
  description: "",
};

const CATEGORY_OPTIONS = [
  { value: "hardware", label: "خدمة هاردوير" },
  { value: "software", label: "خدمة سوفتوير" },
];

function ManageServices() {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ ...initialForm, category: "hardware" });
  const [editingId, setEditingId] = useState(null);

  const selectedType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "hardware" || type === "software") return type;
    return "hardware";
  }, [location.search]);

  useEffect(() => {
    const token = localStorage.getItem("technosoft_token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/services");
      setServices(data || []);
    } catch (err) {
      setError("تعذّر جلب الخدمات، جرّب تحديث الصفحة.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ ...initialForm, category: selectedType });
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description) {
      setError("الرجاء تعبئة عنوان الخدمة والوصف واختيار التصنيف.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category || selectedType,
      };

      if (editingId) {
        await api.put(`/services/${editingId}`, payload);
      } else {
        await api.post("/services", payload);
      }

      await fetchServices();
      resetForm();
    } catch (err) {
      const msg =
        err?.response?.data?.message || "حدث خطأ أثناء حفظ الخدمة، جرّب مرة أخرى.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || "",
      description: service.description || "",
      category: service.category || "hardware",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert("تعذّر حذف الخدمة، جرّب مرة أخرى.");
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
                  {selectedType === "hardware"
                    ? "Hardware Services"
                    : "Software Services"}
                </p>
                <h1 className="mt-2 text-2xl font-bold text-neutral-50">
                  {editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                  الخدمات هنا هي التي تظهر في صفحة الخدمات في الموقع، اختر نوع
                  الخدمة (هاردوير أو سوفتوير) من التصنيف أدناه.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-100 hover:border-amber-400/70 hover:text-amber-200"
              >
                رجوع للوحة التحكم
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-100 hover:border-amber-400/70 hover:text-amber-200"
                >
                  <FaPlus className="h-4 w-4" />
                  خدمة جديدة
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
              className="grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-right"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  عنوان الخدمة
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="مثال: صيانة الهاردوير"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  وصف الخدمة
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="وصف مختصر لما تقدمه هذه الخدمة."
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  نوع الخدمة
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving
                    ? "جارِ الحفظ..."
                    : editingId
                    ? "تحديث الخدمة"
                    : "إضافة الخدمة"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* قائمة الخدمات */}
        <section className="bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-50">
                الخدمات الحالية
              </h2>
              <p className="text-xs text-neutral-500">
                عدد الخدمات: {services.length}
              </p>
            </div>

            {loading ? (
              <p className="text-sm text-neutral-400">جارِ تحميل الخدمات...</p>
            ) : services.length === 0 ? (
              <p className="text-sm text-neutral-400">
                لا توجد خدمات حتى الآن، قم بإضافة أول خدمة من الأعلى.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <article
                    key={service._id}
                    className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 text-right shadow-[0_14px_35px_rgba(0,0,0,0.5)]"
                  >
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-neutral-50">
                        {service.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-neutral-300">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleEdit(service)}
                        className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-neutral-100 hover:border-amber-400/70 hover:text-amber-200"
                      >
                        <FaEdit className="h-3.5 w-3.5" />
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(service._id)}
                        className="inline-flex items-center gap-1 rounded-full border border-red-600/60 px-3 py-1.5 text-red-200 hover:border-red-500 hover:bg-red-500/10"
                      >
                        <FaTrash className="h-3.5 w-3.5" />
                        حذف
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ManageServices;

