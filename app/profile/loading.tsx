export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 gap-8 animate-pulse">
      <div>
        <div className="h-12 w-40 bg-gray-200 rounded mb-8"></div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-6 w-72 bg-gray-200 rounded"></div>
            <div className="h-6 w-72 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div>
        <div className="h-12 w-48 bg-gray-200 rounded mb-8"></div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
