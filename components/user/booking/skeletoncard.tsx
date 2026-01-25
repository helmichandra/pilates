"use client";

export default function SkeletonCard() {
  return (
    <div className="bg-white border-2 border-gray-50 rounded-[2rem] p-6 shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 w-12 h-12 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 w-16 rounded-md" />
            <div className="h-3 bg-gray-100 w-20 rounded-md" />
          </div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="h-7 bg-gray-200 w-3/4 rounded-lg mb-4" />

      {/* Badges Skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-6 bg-gray-100 w-24 rounded-full" />
        <div className="h-6 bg-gray-100 w-24 rounded-full" />
      </div>

      {/* Grid Info Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-50">
        <div className="h-4 bg-gray-100 w-full rounded-md" />
        <div className="h-4 bg-gray-100 w-full rounded-md" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-100 w-20 rounded-md" />
        <div className="h-12 bg-gray-200 w-32 rounded-2xl" />
      </div>
    </div>
  );
}