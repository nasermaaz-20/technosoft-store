import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <Navbar />

      <main className="flex-1">
        {/* عنوان الصفحة */}
        <section className="border-b border-neutral-900 bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 text-right lg:px-6 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              تواصل معنا
            </p>
            <h1 dir="rtl" className="text-amber-400 mt-2 text-3xl font-bold  md:text-4xl">
              تواصل مع TechnoSoft في حلب
            </h1>
            <p dir="rtl" className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 lg:ml-auto">
              سواء كنت بحاجة لصيانة مستعجلة، استشارة في تجميع جهاز جديد، أو
              استفسار عن منتج معيّن، يمكنك التواصل معنا عبر الهاتف أو واتساب،
              أو زيارتنا في المحل.
            </p>
          </div>
        </section>

        {/* معلومات الاتصال + خريطة */}
        <section dir="rtl" className="bg-neutral-950/98">
          <div className="mx-auto max-w-7xl px-4 py-10 lg:flex lg:flex-row lg:gap-12 lg:px-6 lg:py-14">
            
            {/* العمود الأيمن - معلومات التواصل */}
            <div className="mb-8 flex-[1.6] text-right lg:mb-0">
              <h2 className="text-2xl font-semibold text-amber-400">
                معلومات التواصل
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                <span className="font-semibold text-amber-300">قسمان رئيسيان:</span> 
                {" "}قسم الصيانة وقسم المبيعات.
                يمكنك اختيار القسم المناسب حسب حاجتك والتواصل معه مباشرة
              </p>

              {/* البطاقات */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                
                {/* بطاقة قسم الصيانة */}
                <div className="group rounded-3xl border border-amber-500/10 bg-neutral-900/50 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_25px_60px_rgba(245,192,0,0.15)]">
                  <h3 className="text-2xl font-semibold text-amber-400 mb-3">
                    قسم الصيانة
                  </h3>
                  <p className="text-base text-neutral-300 mb-6">
                    لصيانة الحواسيب، اللابتوبات، حلول الأعطال والبرمجيات.
                  </p>

                  <div className="space-y-4">
                    {/* Phone */}
                    <a
                      href="tel:0989000430"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                        <FaPhoneAlt size={18} />
                      </span>
                      <div className="flex-1">
                        <p dir="ltr" className="text-neutral-100 font-medium text-right text-base">
                          0989 000 430
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          اتصل الآن
                        </p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/963989000430"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <FaWhatsapp size={20} />
                      </span>
                      <div className="flex-1">
                        <p dir="ltr" className="text-neutral-100 font-medium text-right text-base">
                          0989 000 430
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          واتساب
                        </p>
                      </div>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/technosoftrepair"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        <FaFacebookF size={18} />
                      </span>
                      <div className="flex-1">
                        <p className="text-neutral-100 font-medium text-right text-base">
                          Technosoftrepair
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          فيسبوك
                        </p>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/technosoft_repair"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-400">
                        <FaInstagram size={20} />
                      </span>
                      <div className="flex-1">
                        <p className="text-neutral-100 font-medium text-right text-base">
                          @technosoft_repair
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          انستغرام
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* بطاقة قسم المبيعات */}
                <div className="group rounded-3xl border border-amber-500/10 bg-neutral-900/50 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_25px_60px_rgba(245,192,0,0.15)]">
                  <h3 className="text-2xl font-semibold text-amber-400 mb-3">
                    قسم المبيعات
                  </h3>
                  <p className="text-base text-neutral-300 mb-6">
                    للاستفسار عن الأسعار، توفر القطع، والعروض الخاصة.
                  </p>

                  <div className="space-y-4">
                    {/* Phone */}
                    <a
                      href="tel:0989000420"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                        <FaPhoneAlt size={18} />
                      </span>
                      <div className="flex-1">
                        <p dir="ltr" className="text-neutral-100 font-medium text-right text-base">
                          0989 000 420
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          اتصل الآن
                        </p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/963989000420"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <FaWhatsapp size={20} />
                      </span>
                      <div className="flex-1">
                        <p dir="ltr" className="text-neutral-100 font-medium text-right text-base">
                          0989 000 420
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          واتساب
                        </p>
                      </div>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/technoosoft"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        <FaFacebookF size={18} />
                      </span>
                      <div className="flex-1">
                        <p className="text-neutral-100 font-medium text-right text-base">
                          TechnoSoft
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          فيسبوك
                        </p>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/technosoftcompany"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-2xl bg-neutral-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800/60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-400">
                        <FaInstagram size={20} />
                      </span>
                      <div className="flex-1">
                        <p className="text-neutral-100 font-medium text-right text-base">
                          @technosoftcompany
                        </p>
                        <p className="text-sm text-neutral-400 text-right">
                          انستغرام
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* العمود الأيسر - الخريطة */}
            <div className="flex-1 lg:pr-16">
              <h2 className="mb-5 mt-4 text-right text-xl font-semibold text-amber-400">
                موقعنا على الخريطة
              </h2>
              
              <div className=" mt-10 group overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                 <div className="h-[260px] sm:h-[280px] md:h-[330px] lg:h-[380px]">
                <iframe
                  title="TechnoSoft Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.20862543398312!2d37.14187360859835!3d36.206978521454275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff8117ed7ccd5%3A0x25e50ccc271980da!2zNjQ0UitQSjjYjCDYrdmE2KjYjCDYs9mI2LHZitin!5e0!3m2!1sar!2s!4v1773069535937!5m2!1sar!2s"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0,
                    filter: 'grayscale(1) invert(0.9)',
                    transition: 'filter 0.3s ease'
                  }}
                  className="group-hover:!grayscale-0 group-hover:!invert-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              </div>

              {/* العنوان والإيميل */}
              <div className="mt-8  space-y-3 text-right">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm">
                  <p dir="rtl" className="text-sm">
                    <span className="font-semibold text-amber-400">العنوان:</span>
                    <span   className="text-neutral-300"> حلب – سوريا</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm">
                  <p className="text-sm">
                    <span className="font-semibold text-amber-400">الإيميل العام:</span>
                    <span dir="ltr" className="inline-block text-neutral-300"> info@technosoft.local</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;

