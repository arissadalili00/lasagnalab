import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import { ProductCard } from "../products/ProductCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Button } from "../ui/Button";

export function FeaturedMenu() {
  const featured = products.slice(0, 6);

  return (
    <section id="menu" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="text-tomato font-medium text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Signature Lasagnas
          </h2>
          <p className="text-olive/70 dark:text-cream/70 max-w-2xl mx-auto">
            Each lasagna is handcrafted with premium ingredients and baked to
            perfection. Choose your favorite or try them all.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link to="/menu">
            <Button variant="outline" size="lg">
              View Full Menu
              <ArrowRight size={18} />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
