export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="prose prose-lg max-w-none lg:col-span-2">
          <div className="relative w-full h-[480px] mb-8 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-12 bg-gray-200 animate-pulse rounded-lg mb-8 w-3/4" />
          <div className="flex space-x-4 mb-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-24" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 animate-pulse rounded w-full"
              />
            ))}
          </div>
        </article>

        <aside className="lg:sticky lg:top-8 h-fit">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-40 mb-4" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="relative w-full h-48 mb-2 bg-gray-200 animate-pulse rounded-lg" />
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
