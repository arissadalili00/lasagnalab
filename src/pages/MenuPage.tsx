import { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { products, categoryLabels } from "../data/products";
import type { ProductCategory } from "../types";
import { ProductCard } from "../components/products/ProductCard";
import { ProductGridSkeleton } from "../components/ui/ProductSkeleton";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const categories: (ProductCategory | "all")[] = [
  "all",
  "classic",
  "chicken",
  "seafood",
  "vegetarian",
  "premium",
  "spicy",
];

export function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
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
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="text-tomato font-medium text-sm uppercase tracking-wider">
            Full Menu
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Our Lasagna Collection
          </h1>
          <p className="text-olive/70 dark:text-cream/70 max-w-2xl mx-auto">
            Browse our complete selection of handcrafted lasagnas. Filter by
            category or search for your favorite flavors.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-olive/40 dark:text-cream/40"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lasagnas..."
              aria-label="Search products"
              className="w-full pl-12 pr-4 py-3 rounded-full glass dark:glass-dark focus:outline-none focus:ring-2 focus:ring-tomato transition-shadow"
            />
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter size={16} className="text-olive/50 dark:text-cream/50" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? "bg-tomato text-cream shadow-md"
                    : "glass dark:glass-dark hover:bg-tomato/10"
                }`}
              >
                {cat === "all" ? "All" : categoryLabels[cat]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <ProductGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium mb-2">No lasagnas found</p>
            <p className="text-olive/60 dark:text-cream/60">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
