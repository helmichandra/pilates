export function BookingCardSkeleton() {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 animate-pulse">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
  
        {/* Title */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
  
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
  
        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-56 bg-gray-200 rounded"></div>
        </div>
  
        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <div className="flex-1 h-10 bg-gray-200 rounded"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }