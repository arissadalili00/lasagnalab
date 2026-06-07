import { Link } from "react-router-dom";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  light?: boolean;
  compact?: boolean;
}

const sizes = {
  sm: { circle: "w-9 h-9 sm:w-10 sm:h-10", title: "text-sm sm:text-[15px]", sub: "text-[10px]" },
  md: { circle: "w-11 h-11", title: "text-lg", sub: "text-xs" },
  lg: { circle: "w-14 h-14", title: "text-xl", sub: "text-sm" },
};

export function BrandLogo({ size = "md", light = false, compact = false }: BrandLogoProps) {
  const s = sizes[size];
  const textColor = light ? "text-white" : "text-ink";
  const subColor = light ? "text-white/60" : "text-muted";

  return (
    <Link to="/" className="flex items-center gap-2.5 group min-w-0" aria-label="The Creamy Pasta Co. home">
      <div
        className={`${s.circle} rounded-2xl bg-tomato flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(242,92,5,0.4)] group-hover:scale-105 transition-transform`}
      >
        <svg viewBox="0 0 40 40" className="w-[55%] h-[55%]" aria-hidden="true">
          <path
            d="M12 28c0-6 4-10 8-14 2-2 4-4 4-6 0-2-1-3-2-3s-2 1-2 3c0 3-3 5-5 8-2 2-3 5-3 8"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="leading-tight min-w-0">
        <p className={`font-display font-bold tracking-tight truncate ${s.title} ${textColor}`}>
          {compact ? (
            <>
              <span className="sm:hidden">Creamy Pasta</span>
              <span className="hidden sm:inline">The Creamy Pasta Co.</span>
            </>
          ) : (
            "The Creamy Pasta Co."
          )}
        </p>
        {(!compact || size !== "sm") && (
          <p className={`${s.sub} font-medium ${compact ? "hidden sm:block" : ""} ${subColor}`}>
            by jijah
          </p>
        )}
      </div>
    </Link>
  );
}
