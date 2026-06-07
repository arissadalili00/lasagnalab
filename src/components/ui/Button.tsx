import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-tomato text-white hover:bg-tomato-dark shadow-[0_4px_20px_rgba(242,92,5,0.4)] hover:shadow-[0_6px_28px_rgba(242,92,5,0.5)]",
  secondary:
    "bg-burgundy text-white hover:bg-burgundy-dark shadow-[0_4px_16px_rgba(92,24,40,0.35)]",
  outline:
    "border-2 border-linen bg-surface text-ink hover:border-tomato hover:text-tomato",
  "outline-light":
    "border-2 border-white bg-white text-burgundy hover:bg-cream hover:border-cream font-bold shadow-sm",
  ghost:
    "text-muted hover:text-ink hover:bg-cream-dark/80",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-2xl font-bold",
  md: "px-6 py-2.5 text-sm rounded-2xl font-bold",
  lg: "px-8 py-4 text-base rounded-2xl font-bold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 font-body transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[44px] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        <span className="relative">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
