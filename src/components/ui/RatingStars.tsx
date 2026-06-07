import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export function RatingStars({
  rating,
  size = 16,
  showValue = false,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? "fill-gold text-gold"
              : i < rating
                ? "fill-gold/50 text-gold"
                : "fill-linen text-linen"
          }
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-bold text-muted">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
