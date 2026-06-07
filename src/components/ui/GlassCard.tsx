import { type ReactNode } from "react";

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
  return (
    <div
      className={`glass dark:glass-dark rounded-2xl p-6 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
