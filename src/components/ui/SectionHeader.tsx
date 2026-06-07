import { type ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: "tomato" | "green" | "gold";
  align?: "center" | "left";
  light?: boolean;
}

const accentStyles = {
  tomato: "text-tomato-dark bg-tomato/10 border-tomato/25",
  green: "text-green bg-green/10 border-green/25",
  gold: "text-ink bg-gold/20 border-gold/40",
};

const accentStylesLight = {
  tomato: "text-white bg-white/15 border-white/30",
  green: "text-white bg-white/15 border-white/30",
  gold: "text-white bg-white/15 border-white/30",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent = "tomato",
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const accentClass = light ? accentStylesLight[accent] : accentStyles[accent];

  return (
    <ScrollReveal
      className={`mb-10 sm:mb-14 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span
        className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 border ${accentClass}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`section-title text-2xl xs:text-3xl sm:text-4xl mb-3 sm:mb-4 ${
          light ? "!text-white" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed px-1 sm:px-0 font-semibold ${
            light ? "text-white" : "text-ink/80"
          }`}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}

export function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  withOrbs?: boolean;
}) {
  return (
    <section id={id} className={`relative section-padding ${className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
