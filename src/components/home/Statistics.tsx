import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../../data/site";
import { ScrollReveal } from "../ui/ScrollReveal";

function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/^([\d,.]+)(\+?)(.*)$/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(numericMatch[1].replace(/,/g, ""));
    const suffix = (numericMatch[2] || "") + (numericMatch[3] || "");
    const isDecimal = numericMatch[1].includes(".");
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        setDisplay(current.toFixed(1) + suffix);
      } else if (target >= 1000) {
        setDisplay(Math.floor(current).toLocaleString() + suffix);
      } else {
        setDisplay(Math.floor(current) + suffix);
      }

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

export function Statistics() {
  return (
    <section className="py-16 sm:py-20 bg-olive text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-tomato/10 to-green/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="font-display text-4xl sm:text-5xl font-bold text-tomato mb-2">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-cream/70 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
