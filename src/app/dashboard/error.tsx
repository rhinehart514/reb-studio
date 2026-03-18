"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-6 h-6 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-zinc-100 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-violet-600 text-white transition-colors hover:bg-violet-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
