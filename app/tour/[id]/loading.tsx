export default function Loading() {
  return (
    <div className="container mx-auto px-4 mb-8">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-2 animate-pulse" />

            <div className="mb-6 flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="mb-8">
              <div className="relative mb-2 h-[480px] w-full rounded-md bg-gray-200 animate-pulse" />
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-md bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-md border border-gray-200 p-4">
                  <div className="h-5 w-1/3 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>

            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-8">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-gray-200 p-6 sticky top-4">
            <div className="space-y-4">
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
