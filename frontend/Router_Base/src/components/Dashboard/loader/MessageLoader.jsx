// SkeletonMessage.jsx
const ReceivedSkeleton = () => (
  <div className="animate-pulse space-y-2 flex items-start">
    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
    <div className="ml-2 flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  </div>
);

const SentSkeleton = () => (
  <div className="animate-pulse space-y-2 flex justify-end">
    <div className="space-y-2 max-w-[60%]">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
);

export { ReceivedSkeleton, SentSkeleton };
