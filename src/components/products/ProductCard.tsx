import { Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { ProductImage } from "../ui/ProductImage";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const isBestseller = product.tags.includes("bestseller");

  const imageFocus: Record<string, string> = {
    "lasagna-regular": "object-[center_38%]",
    "macaroni-regular": "object-[center_38%]",
    "lasagna-large": "object-[center_42%]",
    "macaroni-large": "object-[center_42%]",
    "lasagna-petite": "object-center scale-105",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group h-full"
    >
      <div className="surface-card overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:premium-shadow-lg transition-all duration-300">
        <div className="relative h-48 sm:h-52 overflow-hidden m-3 mb-0 rounded-[1.25rem]">
          <ProductImage
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageFocus[product.id] ?? "object-center"}`}
          />
          {isBestseller && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-tomato text-white text-[11px] font-bold uppercase tracking-wide">
              <Sparkles size={11} />
              Popular
            </span>
          )}
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 text-ink text-[11px] font-bold shadow-sm">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="p-5 pt-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-lg text-ink group-hover:text-tomato transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          <p className="text-[11px] font-bold text-tomato uppercase tracking-wider mb-2">
            {product.size} · {product.protein}
          </p>

          <p className="text-sm text-ink/75 mb-3 line-clamp-2 flex-1 font-semibold">{product.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] font-semibold text-muted">
            <span className="px-2.5 py-1 rounded-lg bg-cream-dark">{product.serves}</span>
            <span className="px-2.5 py-1 rounded-lg bg-cream-dark">{product.dimensions}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-linen/60">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Price</p>
              <span className="text-2xl font-extrabold text-tomato">
                {formatCurrency(product.price)}
              </span>
            </div>
            <button
              onClick={() => addItem(product)}
              aria-label={`Add ${product.name} to cart`}
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-tomato text-white hover:bg-tomato-dark shadow-[0_4px_16px_rgba(242,92,5,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
