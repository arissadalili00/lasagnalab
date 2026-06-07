export function ProductSkeleton() {
  return (
    <div className="glass dark:glass-dark rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-olive/10 dark:bg-cream/10" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-olive/10 dark:bg-cream/10 rounded w-3/4" />
        <div className="h-4 bg-olive/10 dark:bg-cream/10 rounded w-full" />
        <div className="h-4 bg-olive/10 dark:bg-cream/10 rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-olive/10 dark:bg-cream/10 rounded w-16" />
          <div className="h-10 bg-olive/10 dark:bg-cream/10 rounded-full w-28" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
