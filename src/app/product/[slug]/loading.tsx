export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="skeleton h-4 w-60 mb-6"></div>

      {/* Top Summary skeleton */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="skeleton w-16 h-16 rounded-full"></div>
          <div className="space-y-2">
            <div className="skeleton h-8 w-48"></div>
            <div className="skeleton h-4 w-64"></div>
            <div className="flex gap-2">
              <div className="skeleton h-5 w-16"></div>
              <div className="skeleton h-5 w-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Price cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-gray-50 border rounded-xl p-4 space-y-2">
            <div className="skeleton h-3 w-20"></div>
            <div className="skeleton h-7 w-28"></div>
          </div>
        ))}
      </div>

      {/* Markets skeleton */}
      <div className="skeleton h-8 w-56 mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-12 w-full"></div>
        ))}
      </div>
    </div>
  );
}
