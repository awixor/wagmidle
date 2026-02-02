interface GuessHistoryHeaderProps {
  title: string;
  subtitle: string;
  count: number;
}

export default function GuessHistoryHeader({
  title,
  subtitle,
  count,
}: GuessHistoryHeaderProps) {
  return (
    <div className="relative mb-6">
      <div className="absolute -left-1 top-0 bottom-0 w-1 bg-linear-to-b from-purple-500 via-pink-500 to-orange-400 rounded-full" />
      <div className="flex items-center justify-between pl-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-linear-to-r from-gray-800 to-gray-900 text-gray-200 text-sm font-semibold border border-gray-700/50 shadow-inner">
          {count} {count === 1 ? "attempt" : "attempts"}
        </span>
      </div>
    </div>
  );
}
