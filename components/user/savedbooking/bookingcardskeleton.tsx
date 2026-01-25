export function BookingCardSkeleton() {
  return (
    <div className="bg-white border-2 border-gray-50 rounded-[2rem] p-6 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl"></div>
          <div className="space-y-2 pt-1">
            <div className="h-3 w-24 bg-gray-100 rounded"></div>
            <div className="h-2 w-16 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-100 rounded mb-4"></div>
      <div className="flex gap-2 mb-8">
        <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
      </div>
      <div className="h-20 w-full bg-gray-50 rounded-2xl mb-6"></div>
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gray-100 rounded-xl"></div>
        <div className="flex-1 h-12 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  );
}