import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { products, categoryLabels } from "../data/products";
import type { ProductCategory } from "../types";
import { ProductCard } from "../components/products/ProductCard";
import { ProductGridSkeleton } from "../components/ui/ProductSkeleton";
import { FadeIn } from "../components/ui/PageTransition";

const categories: (ProductCategory | "all")[] = ["all", "lasagna", "macaroni"];

export function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        search === "" ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      {/* Menu hero banner */}
      <div className="relative pt-[5.5rem] sm:pt-32 pb-12 sm:pb-16 overflow-hidden hero-dark">
        <div className="absolute inset-0 opacity-[0.06] bg-[url('https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1400&h=400&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-butter bg-white/10 border border-white/15 mb-4">
              Full Menu
            </span>
            <h1 className="hero-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4">
              Our Menu
            </h1>
            <p className="text-base sm:text-lg text-white max-w-2xl mx-auto px-2 font-semibold">
              Beef or chicken · Pre-order only · All prices in RM
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FadeIn delay={0.15} className="mb-10 space-y-5">
          <div className="relative max-w-lg mx-auto">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted/50"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lasagnas..."
              aria-label="Search products"
              className="w-full pl-14 pr-5 py-3.5 sm:py-4 rounded-2xl surface-card focus:outline-none focus:ring-2 focus:ring-tomato/40 premium-shadow transition-shadow input-mobile"
            />
          </div>

          <div className="scroll-x-mobile sm:items-center">
            <Filter size={16} className="text-muted/60 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 min-h-[44px] ${
                  category === cat
                    ? "bg-tomato text-white shadow-[0_4px_16px_rgba(242,92,5,0.35)]"
                    : "surface-card text-ink/70 hover:text-ink hover:border-tomato/30"
                }`}
              >
                {cat === "all" ? "All" : categoryLabels[cat]}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${search}-${category}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-xl font-display font-semibold mb-2">
                    No lasagnas found
                  </p>
                  <p className="text-muted">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7">
                  {filtered.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
