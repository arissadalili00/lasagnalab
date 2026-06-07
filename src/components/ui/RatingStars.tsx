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
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? "fill-tomato text-tomato"
              : i < rating
                ? "fill-tomato/50 text-tomato"
                : "fill-olive/10 text-olive/20 dark:fill-cream/10 dark:text-cream/20"
          }
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-olive/70 dark:text-cream/70">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
