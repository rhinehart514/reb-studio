export default function ClientSiteLoading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--cream)" }}
    >
      <div className="w-full max-w-md px-6 space-y-6">
        {/* Fake headline */}
        <div
          className="h-8 w-3/4 rounded animate-pulse"
          style={{ background: "var(--cream-dark)" }}
        />
        {/* Fake subheadline */}
        <div
          className="h-4 w-1/2 rounded animate-pulse"
          style={{ background: "var(--cream-dark)" }}
        />
        {/* Fake content blocks */}
        <div className="space-y-3 pt-4">
          <div
            className="h-3 w-full rounded animate-pulse"
            style={{ background: "var(--cream-dark)" }}
          />
          <div
            className="h-3 w-5/6 rounded animate-pulse"
            style={{ background: "var(--cream-dark)" }}
          />
          <div
            className="h-3 w-2/3 rounded animate-pulse"
            style={{ background: "var(--cream-dark)" }}
          />
        </div>
      </div>
    </div>
  );
}
