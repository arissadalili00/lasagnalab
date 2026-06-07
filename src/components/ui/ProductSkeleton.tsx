export function ProductSkeleton() {
  return (
    <div className="surface-card overflow-hidden animate-pulse">
      <div className="h-48 bg-cream-dark" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-cream-dark rounded-lg w-3/4" />
        <div className="h-4 bg-cream-dark rounded-lg w-full" />
        <div className="h-4 bg-cream-dark rounded-lg w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-cream-dark rounded-lg w-16" />
          <div className="h-10 bg-cream-dark rounded-2xl w-28" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
