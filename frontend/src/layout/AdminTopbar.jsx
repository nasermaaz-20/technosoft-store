import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo-technosoft.png";

function AdminTopbar() {
  const navigate = useNavigate();

  const admin = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("technosoft_admin") || "{}");
    } catch {
      return {};
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("technosoft_token");
    localStorage.removeItem("technosoft_admin");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 lg:px-10">
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
            <span className="text-[11px] text-neutral-400">Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-neutral-300 md:inline-block">
            أهلاً،{" "}
            <span className="font-semibold text-amber-300">
              {admin?.username || "Admin"}
            </span>
          </span>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-100 hover:border-red-500/70 hover:text-red-200"
          >
            <FaSignOutAlt className="h-4 w-4" />
            تسجيل خروج
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;

