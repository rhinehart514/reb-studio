export default function DashboardLoading() {
  return (
    <div className="p-6 md:p-8 max-w-5xl space-y-6 bg-[#0a0a0a] min-h-screen">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
        <div className="h-7 w-48 bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#141414] border border-[#262626] rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-zinc-800 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
                <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
