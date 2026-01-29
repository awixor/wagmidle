export default function GameSkeleton() {
  return (
    <div className="w-full space-y-8 flex flex-col justify-center animate-pulse">
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 mx-auto"></div>
      </div>
    </div>
  );
}
