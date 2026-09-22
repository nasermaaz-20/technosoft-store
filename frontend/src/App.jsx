import "./App.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import heroBg from "./assets/1.webp";
import heroMobileBg from "./assets/2.webp";
import { Link } from "react-router-dom";
import { routePreloaders } from "./routePreloaders";
import { ChevronLeft } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section
  id="home"
  className="hero-section relative overflow-hidden"
>
  {/* ✅ صورة الديسكتوب */}
  <div
    className="absolute inset-0 hidden lg:block"
    style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center right",
    }}
  />

  {/* ✅ صورة الموبايل */}
  <div
    className="absolute inset-0 block lg:hidden"
    style={{
      backgroundImage: `url(${heroMobileBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
          {/* طبقة تعتيم وتدرج فوق الخلفية (غامق أكثر عند النص، شفاف قرب الجهاز) */}
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-950 via-neutral-950/85 to-transparent" />
          <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col gap-6 px-4 pb-16 pt-10 lg:px-6 lg:pb-24 lg:pt-16">
            <div className="max-w-xl space-y-4 text-right lg:text-right ml-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                TECHNOSOFT – حلب
              </p>
              <h1 className=" text-3xl font-bold leading-snug text-neutral-50 md:text-4xl lg:text-5xl">
             <span className="mb-1 block"> حلول الكمبيوتر <span className="text-amber-400">الاحترافية </span></span>
                <span className="text-amber-400">
                    والصيانة المتكاملة
                </span>
              </h1>
              <p dir="rtl" className="text-sm leading-relaxed text-neutral-300 md:text-base">
                صيانة هاردوير وسوفتوير، تجميع أجهزة، وترقية مكونات لأفضل أداء
                للطلاب، الجيمرز، والشركات الصغيرة في حلب.
              </p>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <a
                  href="/contact"
                  className="rounded-full border border-neutral-700 px-6 py-3 text-lg font-semibold text-neutral-100 hover:border-amber-400 hover:text-amber-300"
                >
                  تواصل معنا
                </a>
                <a
                  href="#services"
                  className="rounded-full bg-amber-400 px-6 py-3 text-lg font-semibold text-black shadow-lg shadow-amber-500/30 transition hover:bg-amber-500"
                >
                  استعرض الخدمات
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* خدمات تكنو سوفت */}
        <section
          id="services"
          className="bg-neutral-950/95 border-t border-neutral-900"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-14">
          <div className="mb-8 flex flex-row-reverse items-center justify-between gap-3 text-right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                  خدماتنا
                </p>
                <h2 className=" mb-4 text-amber-400 mt-2 text-2xl font-bold  md:text-3xl">
                  حلول صيانة وخدمات تقنية متكاملة
                </h2>
                <p dir="rtl" className="mt-2  text-sm text-neutral-400">
                نغطي كل ما تحتاجه لأجهزة الكمبيوتر من صيانة، تركيب، وترقية، مع الحرص على السرعة والشفافية في التعامل.
                </p>
                
              </div>
              <div className=" hidden lg:flex justify-end lg:justify-start">
                <Link
                  to="/services"
                  onMouseEnter={() => routePreloaders["/services"]?.()}
                  className="whitespace-nowrap inline-flex items-center gap-2 rounded-full border border-amber-500/70 px-4 py-2 text-xs font-semibold text-amber-300 transition hover:border-amber-400 hover:text-amber-200"
                >
                  عرض كل الخدمات
                </Link>
              </div>

            </div>

            <div dir="rtl" className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "صيانة الهاردوير",
                  desc: "تشخيص أعطال اللوحة الأم، مزود الطاقة، الكيس، وتنظيف احترافي لإزالة الغبار وتحسين التبريد.",
                },
                {
                  title: "صيانة السوفتوير",
                  desc: "تنصيب أنظمة تشغيل أصلية، تعريفات كاملة، إزالة الفيروسات، وضبط أداء النظام للأفضل.",
                },
                {
                  title: "تجميع وترقية الأجهزة",
                  desc: "اختيار وتجميع قطع مناسبة للجيمرز والطلاب والعمل المكتبي، مع ترقية RAM و SSD و GPU.",
                },
                {
                  title: "استشارات تقنية",
                  desc: "مساعدتك في اختيار الجهاز أو المواصفات الأنسب لميزانيتك واحتياجك، للأفراد والشركات الصغيرة.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
                >
                  <div className="space-y-2 text-right">
                    <h3 className="text-lg font-semibold text-amber-300">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-300">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="rounded-full border border-amber-400/40 px-3 py-1 text-[11px] font-medium text-amber-300">
                      خدمة متوفرة يومياً
                    </span>
                  </div>
                </article>
              ))}
            </div>
<div className="mt-8 flex justify-center lg:hidden">
  <Link
    to="/services"
    onMouseEnter={() => routePreloaders["/services"]?.()}
    className="group inline-flex flex-row-reverse items-center gap-2 px-4 py-1.5 text-xl font-semibold text-amber-300 animate-pulse transition-colors hover:animate-none hover:text-amber-200"
  >
    <span className="leading-none">عرض كل الخدمات</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="h-6 w-6 shrink-0 translate-y-0.5 transition-transform duration-300 group-hover:-translate-x-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </Link>
</div>
          </div>
        </section>

        {/* خريطة ومعلومات التواصل المختصرة */}
        <section
          id="contact"
          className="border-t border-neutral-900 bg-neutral-950/98"
        >
          <div className=" mx-auto max-w-6xl px-4 py-12 lg:flex lg:items-stretch lg:flex-row-reverse lg:gap-6 lg:px-6 lg:py-14">
            <div className="mb-6 flex-1 text-right lg:mb-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                موقعنا
              </p>
              <h2 className=" text-amber-400 mt-2 text-2xl font-bold  md:text-3xl">
                تجدنا في قلب مدينة حلب
              </h2>
              <p dir="rtl" className="mt-2 text-sm text-neutral-400">
                نسعد بزيارتك للمحل أو تواصلك معنا عبر الهاتف وواتساب للاستفسار
                عن أي مشكلة صيانة أو تجهيز جهاز جديد.
              </p>
              <div className="mt-4 space-y-1 text-sm text-neutral-300">
                <p><span className="text-amber-300">العنوان:</span> حلب – سوريا (يمكنك تخصيص العنوان لاحقاً)</p>
                <p> <span className="text-amber-300">الهاتف:</span> 0989000410</p>
                <p><span className="text-amber-300">واتساب: </span> نفس الرقم </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="group overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                <iframe
                  title="TechnoSoft Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.20862543398312!2d37.14187360859835!3d36.206978521454275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff8117ed7ccd5%3A0x25e50ccc271980da!2zNjQ0UitQSjjYjCDYrdmE2KjYjCDYs9mI2LHZitin!5e0!3m2!1sar!2s!4v1773069535937!5m2!1sar!2s"
                  width="100%"
                  height="260"
                  style={{ border: 0,
                    filter: 'grayscale(1) invert(0.9)',
                    transition: 'filter 0.3s ease'
                  }}
                  className="group-hover:!grayscale-0 group-hover:!invert-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
