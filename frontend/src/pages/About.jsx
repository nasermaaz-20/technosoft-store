import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-neutral-900 bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 text-right lg:px-6 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              من نحن
            </p>
            <h1 dir="rtl" className="text-amber-400 mt-2 text-3xl font-bold  md:text-4xl">
              TechnoSoft – حلول الكمبيوتر المتكاملة في حلب
            </h1>
            <p dir="rtl" className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 lg:ml-auto">
              تكنو سوفت هو مركز مختص بصيانة وبيع وتجهيز أجهزة الكمبيوتر المكتبية
              والمحمولة، يقدّم خدماته للطلاب، الجيمرز، الموظفين، والشركات
              الصغيرة، مع تركيز على الموثوقية والشفافية في كل عملية صيانة أو
              شراء.
            </p>
          </div>
        </section>

        <section className="bg-neutral-950/98 ">
          <div className="mx-auto max-w-6xl px-4 py-10 lg:flex lg:flex-row-reverse  lg:gap-8 lg:px-6 lg:py-14">
            {/* نبذة + لماذا تختارنا */}
            <div className="flex-1 space-y-6 text-right">
              <div>
                <h2 className="text-2xl font-semibold text-amber-400 ">
                  رؤيتنا
                </h2>
                <p dir="rtl" className="mt-2 text-sm leading-relaxed text-neutral-300">
                  نسعى لأن نكون الوجهة الأولى في حلب لكل من يبحث عن صيانة
                  احترافية أو تجميع جهاز مخصص للاستخدام الدراسي، العملي، أو
                  للألعاب، مع تقديم نصائح تقنية صادقة تراعي ميزانية واحتياج كل
                  عميل.
                </p>
              </div>

              <div>
                <h2 dir="rtl" className="text-2xl font-semibold text-amber-400">
                  لماذا تختار TechnoSoft؟
                </h2>
                <ul dir="rtl" className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>• خبرة عملية في تشخيص أعطال الهاردوير والسوفتوير.</li>
                  <li>• استخدام قطع ومكونات عالية الجودة وموثوقة.</li>
                  <li>• سرعة في إنجاز الصيانة مع متابعة حالة الجهاز.</li>
                  <li>• شروحات مبسطة للعميل حول سبب العطل وخيارات الحل.</li>
                </ul>
              </div>
            </div>

            {/* إحصائيات بسيطة */}
            <div className="mt-8 flex-1 ">
              <div dir="rtl" className="grid gap-4 md:grid-cols-3 lg:grid-cols-2">
                {[
                  { label: "سنوات خبرة", value: "5+" },
                  { label: "أجهزة تم صيانتها", value: "1200+" },
                  { label: "عملاء موثوقين", value: "800+" },
                  { label: "شركات صغيرة نخدمها", value: "25+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-5 text-right shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                  >
                    <p className="text-2xl font-bold text-amber-400">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-neutral-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;

