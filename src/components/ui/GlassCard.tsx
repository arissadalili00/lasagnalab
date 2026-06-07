import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  const Component = hover ? motion.div : "div";
  const motionProps = hover
    ? {
        whileHover: { y: -4 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  return (
    <Component
      {...motionProps}
      className={`surface-card p-6 sm:p-7 transition-shadow duration-300 ${
        hover ? "hover:premium-shadow-lg cursor-default" : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}
