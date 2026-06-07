import { useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=700&h=500&q=80";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (currentSrc !== FALLBACK_IMAGE) setCurrentSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
