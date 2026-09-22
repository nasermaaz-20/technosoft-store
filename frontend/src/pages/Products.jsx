import { useEffect, useMemo, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import api from "../services/api";
import { IMAGE_BASE_URL } from "../config/env";

const CATEGORY_FILTERS = [
  { key: "all", label: "الكل" },
  { key: "اكسسوارات", label: "اكسسوارات" },
  { key: "قطع كمبيوتر", label: "قطع كمبيوتر" },
  { key: "أجهزة جاهزة", label: "أجهزة جاهزة" },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await api.get("/products");
        setProducts(data || []);
      } catch (err) {
        setError("تعذّر جلب المنتجات حالياً، جرّب لاحقاً.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 animate-fadeIn">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-neutral-900 bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-10 text-right lg:px-6 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              منتجاتنا
            </p>
            <h1 dir="rtl" className=" mt-2 text-amber-400 mt-2 text-3xl font-bold  md:text-4xl">
              قطع كمبيوتر، اكسسوارات، وأجهزة جاهزة
            </h1>
            <p dir="rtl" className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 lg:ml-auto">
              تشكيلة مختارة من القطع والاكسسوارات والأجهزة الجاهزة،
              يمكن استخدامها كمرجع قبل زيارة المحل أو التواصل معنا عبر واتساب
              لإتمام الطلب.
            </p>
          </div>
        </section>

        <section className="bg-neutral-950/98">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
            {/* فلاتر التصنيف */}
            <div className="mb-6 flex flex-row-reverse flex-wrap items-center justify-start gap-2">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat.key
                      ? "border-amber-400 bg-amber-500 text-black"
                      : "border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-amber-400/70 hover:text-amber-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {loading && (
              <p dir="rtl" className="text-center text-sm text-neutral-400">
                جارِ تحميل المنتجات...
              </p>
            )}

            {error && !loading && (
              <p className="mb-4 text-center text-sm text-red-400">{error}</p>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <p dir="rtl" className="text-center text-sm text-neutral-400">
                لا توجد منتجات في هذا التصنيف حالياً.
              </p>
            )}

            {!loading && filteredProducts.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => {
const imageUrl = product.image
? product.image.startsWith("http")
  ? product.image
  : `${IMAGE_BASE_URL}${product.image}`
: null;

                  return (
                    <article
                      key={product._id}
                      className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-4 text-right shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-transform transition-shadow hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
                    >
                      {imageUrl && (
                        <div className="mb-3 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                          <img
                            src={imageUrl}
                            alt={product.name}
                            loading="lazy"
                            className="h-40 w-full object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <h2 className="text-base font-semibold text-neutral-50">
                          {product.name}
                        </h2>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                        <span className="rounded-full bg-neutral-900 px-3 py-1 text-neutral-300">
                          {product.category}
                        </span>
                        <span className="text-amber-300">
                          {product.price && product.price > 0
                            ? `${product.price.toLocaleString()} ل.س`
                            : "السعر عند الاتصال"}
                        </span>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <a
                          href={`https://wa.me/963989000420?text=${encodeURIComponent(
                            `مرحباً، أود الاستفسار عن المنتج: ${product.name}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                        >
                          اطلب عبر واتساب
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Products;

