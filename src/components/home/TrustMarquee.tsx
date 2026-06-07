import { Clock, Star, ShieldCheck } from "lucide-react";
import { brand } from "../../data/site";

const items = [
  { icon: Star, text: "5.0 Customer Rating" },
  { icon: Clock, text: "Open 10am – 5pm" },
  { icon: ShieldCheck, text: "Pre-Order · Fresh Daily" },
  { icon: ShieldCheck, text: "Order on Our Website" },
];

export function TrustMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-ink overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2 mx-10 text-sm font-bold text-white">
            <item.icon size={15} className="text-butter shrink-0" />
            {item.text}
            <span className="text-white/25 mx-1">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 cta-band">
      <div className="absolute inset-0 opacity-[0.07] bg-[url('https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1200&h=400&fit=crop&q=80')] bg-cover bg-center" />

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <p className="text-butter text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
          {brand.location}
        </p>
        <h2 className="hero-headline text-2xl sm:text-3xl md:text-4xl text-white mb-3">
          Fresh trays, baked to order
        </h2>
        <p className="text-white/80 text-sm sm:text-base font-medium">
          {brand.hours} · Pre-order from the Menu
        </p>
      </div>
    </section>
  );
}
