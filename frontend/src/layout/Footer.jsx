import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer dir="rtl" className="border-t border-neutral-800 bg-neutral-950">
      {/* ─── Main Grid ─── */}
      <div className="px-6 py-12 lg:px-12">
        <div className="grid gap-10 text-sm text-neutral-400 sm:grid-cols-2 md:grid-cols-2">

          {/* ── Column 1 : Company (أقصى اليمين) ── */}
          <div className="space-y-3">
            <h3 className="text-base font-bold tracking-wide text-amber-400">
              TechnoSoft – تكنو سوفت
            </h3>
            <p className="max-w-xs text-xs leading-relaxed text-neutral-500">
              حلب، سوريا – صيانة وبيع أجهزة الكمبيوتر، حلول الهاردوير
              والسوفتوير.
            </p>
          </div>



          {/* ── Column 3 : Work Hours + Social (أقصى اليسار) ── */}
          <div className="space-y-4  md:flex md:flex-col md:items-start md:text-left md:justify-self-start md:mr-auto " >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              ساعات العمل
            </h4>
            <ul className="space-y-1.5 text-xs w-[220px]">
              <li className="flex items-center justify-between">
                <span>السبت – الخميس</span>
                <span className="text-neutral-300">9:00 ص – 7:00 م</span>
              </li>
              <li className="flex items-center justify-between">
                <span>الجمعة</span>
                <span className="font-medium text-red-400">مغلق</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3 pt-2 w-full">
              <a
                href="https://www.facebook.com/technoosoft"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full
                           border border-neutral-700 bg-neutral-900
                           text-neutral-400 transition-all duration-300
                           hover:border-amber-400 hover:text-amber-400
                           hover:shadow-[0_0_8px_rgba(251,191,36,.25)]"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/technosoftcompany"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full
                           border border-neutral-700 bg-neutral-900
                           text-neutral-400 transition-all duration-300
                           hover:border-amber-400 hover:text-amber-400
                           hover:shadow-[0_0_8px_rgba(251,191,36,.25)]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/963989000410"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full
                           border border-emerald-500/60 bg-emerald-500/10
                           text-emerald-400 transition-all duration-300
                           hover:bg-emerald-500/20
                           hover:shadow-[0_0_8px_rgba(16,185,129,.3)]"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Copyright + Developer (بدون سطر فاصل) ─── */}
      <div className="px-1 pb-1 lg:px-6">
        <p className="text-center text-[11px] text-neutral-600">
          © {year}{" "}
          <span className="text-neutral-200">TechnoSoft</span> — جميع الحقوق
          محفوظة
          <span className="mx-1.5 hidden sm:inline">|</span>
          <br className="sm:hidden" />
          Developed by{" "}
          <a
            href="https://wa.me/963934766628"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-200 transition-colors duration-300 hover:text-amber-500"
          >
            Naser Maaz
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;