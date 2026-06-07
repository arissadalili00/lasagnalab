import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Truck, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-green/10 dark:from-olive dark:via-olive dark:to-green/20" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-tomato/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-tomato/10 text-tomato text-sm font-medium mb-6">
                🍝 Authentic Italian Since 2018
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-olive dark:text-cream mb-6">
                Handcrafted Lasagna{" "}
                <span className="text-gradient">Delivered Fresh</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg sm:text-xl text-olive/70 dark:text-cream/70 mb-8 max-w-lg leading-relaxed">
                Premium ingredients. Authentic Italian recipes. Delivered to
                your doorstep.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu">
                  <Button size="lg">
                    Order Now
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <a href="#menu">
                  <Button size="lg" variant="outline">
                    Explore Menu
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop"
                  alt="Premium lasagna with melted cheese"
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive/30 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -top-4 -left-4 sm:-left-8 glass dark:glass-dark rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2"
              >
                <Star className="fill-tomato text-tomato" size={20} />
                <div>
                  <p className="font-bold text-sm">4.9 Rating</p>
                  <p className="text-xs text-olive/60 dark:text-cream/60">
                    2,500+ reviews
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-4 -right-4 sm:-right-8 glass dark:glass-dark rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2"
              >
                <Truck className="text-green" size={20} />
                <div>
                  <p className="font-bold text-sm">Free Delivery</p>
                  <p className="text-xs text-olive/60 dark:text-cream/60">
                    On orders $50+
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
