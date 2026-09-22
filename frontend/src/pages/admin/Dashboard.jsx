import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaTools } from "react-icons/fa";
import AdminTopbar from "../../layout/AdminTopbar";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("technosoft_token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <AdminTopbar />

      <main className="flex-1">
        <section className="border-b border-neutral-900 bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 text-right lg:px-6 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-neutral-50 md:text-4xl">
              لوحة التحكم
            </h1>
            <p className="mt-3 text-sm text-neutral-300">
              اختر القسم الذي تريد إدارته.
            </p>
          </div>
        </section>

        <section className="bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-12">
            <div className="grid gap-5 md:grid-cols-3">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="group flex min-h-[150px] flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-5 text-right shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-50">
                      إدارة المنتجات
                    </h2>
                    <p className="mt-2 text-sm text-neutral-300">
                      إضافة/تعديل/حذف المنتجات مع صورها وتصنيفاتها.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-amber-300 group-hover:border-amber-400/60">
                    <FaBoxOpen className="h-5 w-5" />
                  </div>
                </div>
                <span className="mt-4 text-xs text-neutral-500">
                  فتح إدارة المنتجات →
                </span>
              </button>

              {/* قسم خدمات الهاردوير */}
              <button
                type="button"
                onClick={() => navigate("/admin/services?type=hardware")}
                className="group flex min-h-[150px] flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-5 text-right shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-50">
                      خدمات الهاردوير
                    </h2>
                    <p className="mt-2 text-sm text-neutral-300">
                      إدارة خدمات صيانة وترقية قطع الكمبيوتر والأجهزة.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-amber-300 group-hover:border-amber-400/60">
                    <FaTools className="h-5 w-5" />
                  </div>
                </div>
                <span className="mt-4 text-xs text-neutral-500">
                  فتح خدمات الهاردوير →
                </span>
              </button>

              {/* قسم خدمات السوفتوير */}
              <button
                type="button"
                onClick={() => navigate("/admin/services?type=software")}
                className="group flex min-h-[150px] flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-5 text-right shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-50">
                      خدمات السوفتوير
                    </h2>
                    <p className="mt-2 text-sm text-neutral-300">
                      إدارة خدمات تنصيب الأنظمة، البرامج، والألعاب.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-amber-300 group-hover:border-amber-400/60">
                    <FaTools className="h-5 w-5" />
                  </div>
                </div>
                <span className="mt-4 text-xs text-neutral-500">
                  فتح خدمات السوفتوير →
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

