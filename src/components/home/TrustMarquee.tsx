import { Clock, MessageCircle, Star, ShieldCheck } from "lucide-react";
import { brand } from "../../data/site";
import { Button } from "../ui/Button";

const items = [
  { icon: Star, text: "5.0 Customer Rating" },
  { icon: Clock, text: "Open 10am – 5pm" },
  { icon: ShieldCheck, text: "Pre-Order · Fresh Daily" },
  { icon: MessageCircle, text: "WhatsApp Orders Only" },
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
    <section className="relative overflow-hidden py-16 sm:py-24 cta-band">
      <div className="absolute inset-0 opacity-[0.07] bg-[url('https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1200&h=400&fit=crop&q=80')] bg-cover bg-center" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="hero-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-5">
          Ready to Order?
        </h2>
        <p className="text-white text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed font-semibold max-w-xl mx-auto">
          Message us on WhatsApp to pre-order. Pick beef or chicken, choose your
          size — we&apos;ll confirm your pickup time.
        </p>
        <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline-light" className="shadow-lg">
            <MessageCircle size={22} />
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </section>
  );
}
