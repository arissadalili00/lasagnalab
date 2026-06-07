import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import { ProductCard } from "../products/ProductCard";
import { SectionHeader, SectionWrapper } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../ui/ScrollReveal";

export function FeaturedMenu() {
  return (
    <SectionWrapper id="menu" className="section-dark">
      <SectionHeader
        eyebrow="Our Menu"
        title="Lasagna & Baked Macaroni"
        description="All sizes in cm. Available in beef or chicken. Pre-order via WhatsApp."
        light
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      <ScrollReveal className="text-center mt-12 sm:mt-14">
        <Link to="/menu">
          <Button variant="outline-light" size="lg" className="group">
            Full Menu & Prices
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </ScrollReveal>
    </SectionWrapper>
  );
}
