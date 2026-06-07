import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "../../data/site";
import { ScrollReveal } from "../ui/ScrollReveal";

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
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
      const progress = Math.min((now - startTime) / 1000 / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      if (isDecimal) setDisplay(current.toFixed(1) + suffix);
      else if (target >= 1000) setDisplay(Math.floor(current).toLocaleString() + suffix);
      else setDisplay(Math.floor(current) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

export function Statistics() {
  return (
    <section className="relative py-14 sm:py-20 overflow-hidden bg-surface border-y border-linen">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 0.08}>
              <div className="text-center px-2">
                <p className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-burgundy mb-1.5">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-ink/80 text-[11px] sm:text-sm font-bold uppercase tracking-wider leading-snug">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
