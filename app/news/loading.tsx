export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <div className="mb-8">
        <div className="w-full md:h-[520px] h-[240px] bg-gray-200 animate-pulse rounded shadow-lg mb-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index}>
            <div className="h-[240px] bg-gray-200 animate-pulse rounded shadow-lg mb-4" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
