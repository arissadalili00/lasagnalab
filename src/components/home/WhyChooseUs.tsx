import { Leaf, Truck, Award, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { whyChooseUs } from "../../data/site";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";

const iconMap = {
  leaf: Leaf,
  truck: Truck,
  award: Award,
  chef: ChefHat,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-transparent to-green/5 dark:to-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <span className="text-green font-medium text-sm uppercase tracking-wider">
            Why LasagnaLab
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Why Choose Us
          </h2>
          <p className="text-olive/70 dark:text-cream/70 max-w-2xl mx-auto">
            We combine traditional Italian craftsmanship with modern convenience
            to deliver an unforgettable dining experience.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <GlassCard hover className="h-full text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex p-4 rounded-2xl bg-tomato/10 text-tomato mb-4"
                  >
                    <Icon size={28} />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-olive/70 dark:text-cream/70 leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
