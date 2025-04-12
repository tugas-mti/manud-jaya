export default function DashboardLoading() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 h-8 w-80 bg-gray-200 rounded animate-pulse" />
      <div className="overflow-x-auto">
        <div className="w-full">
          <div className="bg-gray-100 border-b">
            <div className="grid grid-cols-4 p-4">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-b">
              <div className="grid grid-cols-4 p-4">
                <div className="h-4 w-8 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-8 w-8 bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
