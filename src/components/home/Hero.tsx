import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight, MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/PageTransition";
import { brand } from "../../data/site";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden hero-dark">
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1400&h=900&fit=crop&q=80')] bg-cover bg-center" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[5.5rem] sm:pt-32 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 min-w-0">
            <FadeIn delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold mb-5 sm:mb-6 border border-white/25">
                <MapPin size={13} className="text-butter shrink-0" />
                {brand.location} · Pre-order only
              </span>
            </FadeIn>

            <h1 className="hero-headline text-[1.75rem] xs:text-[2rem] sm:text-4xl lg:text-[2.85rem] xl:text-5xl text-white mb-4 sm:mb-5 max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="block"
              >
                Indulge in{" "}
                <span className="text-butter">Creamy Pasta</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="block mt-1"
              >
                Perfection
              </motion.span>
            </h1>

            <FadeIn delay={0.45}>
              <p className="text-sm font-bold text-butter mb-2">{brand.byline}</p>
              <p className="text-base sm:text-lg text-white mb-7 sm:mb-8 max-w-md leading-relaxed font-semibold">
                Homemade beef & chicken lasagna and baked macaroni — rich, creamy,
                baked fresh to order. From RM15.
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
                <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto group shadow-[0_8px_32px_rgba(242,92,5,0.45)]">
                    Order on WhatsApp
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </a>
                <Link to="/menu" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline-light" className="w-full sm:w-auto">
                    View Menu
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.65}>
              <div className="flex flex-col sm:flex-row gap-4 pt-5 sm:pt-6 border-t border-white/20 text-sm text-white font-semibold">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-butter shrink-0" />
                  <span>{brand.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="fill-gold text-gold shrink-0" />
                  <span>5.0 from happy customers</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="order-1 lg:order-2 w-full min-w-0">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden premium-shadow-lg ring-4 ring-white/15">
                <img
                  src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=900&h=700&fit=crop&q=80"
                  alt="Creamy lasagna slice on a plate"
                  className="w-full h-[240px] xs:h-[280px] sm:h-[360px] lg:h-[440px] xl:h-[480px] object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 lg:mt-5">
                <div className="surface-card px-4 py-3.5 sm:px-5 sm:py-4">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-tomato mb-0.5">
                    Best Seller
                  </p>
                  <p className="font-bold text-ink text-sm sm:text-base leading-tight">Handsome Regular</p>
                  <p className="text-tomato font-extrabold text-xl sm:text-2xl mt-0.5">RM16</p>
                  <p className="text-[11px] sm:text-xs text-ink font-semibold mt-0.5">1 pax · Beef or Chicken</p>
                </div>
                <div className="surface-card px-4 py-3.5 sm:px-5 sm:py-4">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-ink/70 mb-0.5">
                    Also Available
                  </p>
                  <p className="font-bold text-ink text-sm sm:text-base leading-tight">Baked Macaroni</p>
                  <p className="text-tomato font-extrabold text-xl sm:text-2xl mt-0.5">From RM15</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
