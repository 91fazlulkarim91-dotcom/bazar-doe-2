export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="bg-green-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="skeleton h-6 w-40"></div>
            <div className="skeleton h-10 w-full max-w-lg"></div>
            <div className="skeleton h-4 w-full max-w-md"></div>
            <div className="skeleton h-12 w-40"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="skeleton w-40 h-40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-white border p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="skeleton h-3 w-16"></div>
                  <div className="skeleton h-6 w-20"></div>
                </div>
                <div className="skeleton h-5 w-14"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
