import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
// ملاحظة: احفظ شعارك في src/assets/logo-technosoft.png أو عدّل المسار أدناه
import logo from "../assets/logo-technosoft.png";
import { routePreloaders } from "../routePreloaders";
const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/products", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(location.pathname || "/");

  useEffect(() => {
    setActiveHref(location.pathname || "/");
  }, [location.pathname]);

  const handleNavClick = (href) => {
    routePreloaders[href]?.();
    setActiveHref(href);
    navigate(href);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
      <nav className="flex items-center justify-between px-4 py-3 lg:px-10">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="TechnoSoft logo"
            loading="lazy"
            className="h-10 w-10 rounded-full border border-amber-400/60 object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-amber-400 uppercase">
              TechnoSoft
            </span>
            <span className="text-[11px] text-neutral-400">
              حلول الكمبيوتر المتكاملة
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-neutral-200 lg:flex">
          {/* نستخدم flex-row-reverse حتى يظهر ترتيب الروابط من اليمين: الرئيسية → ... → تواصل معنا */}
          <ul className="flex flex-row-reverse items-center gap-6">
          {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => routePreloaders[link.href]?.()}
                    className={`relative pb-1 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-amber-400"
                        : "text-neutral-200 hover:text-amber-300"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full transition-opacity duration-200 ${
                        isActive ? "bg-amber-400 opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* WhatsApp CTA (يظهر بعد "تواصل معنا" في نفس السطر) */}
          <a
            href="https://wa.me/963989000410"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>تواصل واتساب</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-neutral-700 p-2 text-neutral-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-neutral-800 bg-neutral-950/95 lg:hidden">
          <div className="px-4 py-4 space-y-4">
            <ul className="flex flex-col gap-3 text-sm font-medium text-neutral-100">
            {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      onMouseEnter={() => routePreloaders[link.href]?.()}
                      className={`block w-full rounded-md px-2 py-2 text-right text-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-neutral-900 text-amber-400"
                          : "text-neutral-100 hover:bg-neutral-900 hover:text-amber-400"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href="https://wa.me/963989000410"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30"
              onClick={() => setOpen(false)}
            >
              <FaWhatsapp className="h-4 w-4" />
              <span>تواصل واتساب</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

