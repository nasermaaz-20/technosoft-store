import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import logo from "../../assets/logo-technosoft.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("الرجاء إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", { username, password });

      if (!data?.token) {
        setError("تعذر تسجيل الدخول، حاول مجدداً.");
        return;
      }

      localStorage.setItem("technosoft_token", data.token);
      localStorage.setItem("technosoft_admin", JSON.stringify(data.admin || {}));

      // صفحة الداشبورد سننفذها في الخطوة 20
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message || "بيانات الدخول غير صحيحة أو يوجد خطأ.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/60 px-5 py-4">
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
                    Admin Panel
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Login
              </span>
            </div>

            <div className="p-6">
            <div className="mb-6 text-right">
              <h1 className="mt-2 text-2xl font-bold text-neutral-50">
                تسجيل دخول لوحة التحكم
              </h1>
              <p className="mt-2 text-sm text-neutral-400">
                ادخل بيانات الأدمن للوصول إلى إدارة الخدمات والمنتجات.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-right text-sm text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="text-right">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  اسم المستخدم
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>

              <div className="text-right">
                <label className="mb-1 block text-xs font-semibold text-neutral-300">
                  كلمة المرور
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-amber-400"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "جارِ تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </form>


            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;

