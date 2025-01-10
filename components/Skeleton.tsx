interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton = ({ width = '100%', height = '20px', className = '' }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export const CoinSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton width="48px" height="48px" className="rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton width="150px" height="20px" />
        <Skeleton width="100px" height="16px" />
      </div>
    </div>
  );
};
