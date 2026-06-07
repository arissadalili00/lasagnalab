import { Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../ui/Button";
import { RatingStars } from "../ui/RatingStars";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass dark:glass-dark rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-xl font-semibold text-olive dark:text-cream">
            {product.name}
          </h3>
          <RatingStars rating={product.rating} size={14} />
        </div>

        <p className="text-sm text-olive/70 dark:text-cream/70 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-tomato">
            {formatCurrency(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} />
            Add To Cart
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCardCompact({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="flex gap-4 p-3 rounded-xl bg-white/50 dark:bg-olive/50">
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{product.name}</h4>
        <p className="text-sm text-tomato font-semibold">
          {formatCurrency(product.price)}
        </p>
      </div>
      <button
        onClick={() => addItem(product)}
        className="self-center p-2 rounded-full bg-tomato text-cream hover:bg-tomato-dark transition-colors"
        aria-label={`Add ${product.name}`}
      >
        <ShoppingBag size={16} />
      </button>
    </div>
  );
}
