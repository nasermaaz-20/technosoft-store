import { useEffect, useMemo, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await api.get("/services");
        setServices(data || []);
      } catch (err) {
        setError("تعذّر جلب الخدمات حالياً، جرّب لاحقاً.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const hardwareServices = useMemo(
    () =>
      services.filter(
        (s) => (s.category || "hardware") === "hardware"
      ),
    [services]
  );

  const softwareServices = useMemo(
    () =>
      services.filter(
        (s) => s.category === "software"
      ),
    [services]
  );

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-neutral-900 bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 text-right lg:px-6 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              خدماتنا
            </p>
            <h1 className=" mb-4 text-amber-400 mt-2 text-3xl font-bold  md:text-4xl">
              حلول صيانة وخدمات تقنية متكاملة
            </h1>
            <p dir="rtl" className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 lg:ml-auto">
              في TechnoSoft نقدّم مجموعة خدمات تغطي صيانة الهاردوير، السوفتوير،
              بالإضافة إلى تجميع وترقية الأجهزة وخدمات الاستشارات التقنية.
            </p>
          </div>
        </section>

        <section className="bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
            {loading && (
              <p dir="rtl" className="text-center text-sm text-neutral-400">
                جارِ تحميل الخدمات...
              </p>
            )}

            {error && !loading && (
              <p className="mb-4 text-center text-sm text-red-400">{error}</p>
            )}

            {!loading && !error && services.length === 0 && (
              <p dir="rtl" className="text-center text-sm text-neutral-400">
                لا توجد خدمات مضافة بعد. يمكنك إضافة خدمات من لوحة التحكم.
              </p>
            )}

            {!loading && services.length > 0 && (
              <div className="grid gap-8 lg:grid-cols-2">
                {/* قسم الهاردوير */}
                <div>
                  <div className="mb-4 text-right">
                    <h2 className="mb-2 text-amber-400 text-2xl font-semibold ">
                      خدمات الهاردوير
                    </h2>
                    <p dir="rtl" className="mt-1 text-xs text-neutral-400">
                      صيانة الأعطال الفيزيائية، تنظيف الأجهزة، وتركيب القطع
                      وترقيتها.
                    </p>
                  </div>

                  {hardwareServices.length === 0 ? (
                    <p dir="rtl" className="text-sm text-neutral-500">
                      لا توجد خدمات هاردوير مضافة حالياً.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {hardwareServices.map((service) => (
                        <article
                          key={service._id}
                          className="flex min-h-[160px] flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-5 text-right shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
                        >
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-amber-300">
                              {service.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-neutral-300">
                              {service.description}
                            </p>
                          </div>
                          <span className="mt-4 inline-flex items-center justify-end text-[11px] text-neutral-500">
                            خدمة صيانة هاردوير متاحة في فرع حلب
                          </span>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                {/* قسم السوفت وير */}
                <div>
                  <div className="mb-4 text-right">
                    <h2 className="mb-2 text-amber-400 text-2xl font-semibold ">
                      خدمات السوفتوير
                    </h2>
                    <p dir="rtl" className="mt-1 text-xs text-neutral-400">
                      تنصيب أنظمة التشغيل، تعريفات، حماية من الفيروسات، وتنزيل
                      الألعاب والبرامج حسب طلبك.
                    </p>
                  </div>

                  {softwareServices.length === 0 ? (
                    <p dir="rtl" dir="rtl" className="text-sm text-neutral-500">
                      لا توجد خدمات سوفتوير مضافة حالياً.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {softwareServices.map((service) => (
                        <article
                          key={service._id}
                          className="flex min-h-[160px] flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-5 text-right shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
                        >
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-amber-300">
                              {service.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-neutral-300">
                              {service.description}
                            </p>
                          </div>
                          <span className="mt-4 inline-flex items-center justify-end text-[11px] text-neutral-500">
                            خدمة سوفتوير متاحة في فرع حلب
                          </span>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Services;

