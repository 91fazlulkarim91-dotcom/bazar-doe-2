export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="skeleton h-8 w-32 mb-2"></div>
          <div className="skeleton h-4 w-48"></div>
        </div>
        <div className="skeleton h-8 w-40"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
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
  );
}
