"use client";

export default function ClientSiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--cream)", color: "var(--bark)" }}
    >
      <h1 className="font-display text-3xl tracking-tight mb-3">
        Something went wrong
      </h1>
      <p
        className="text-sm leading-relaxed max-w-sm mb-8"
        style={{ color: "var(--bark-light)" }}
      >
        We hit an unexpected error loading this page. Try refreshing, or come
        back in a moment.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
        style={{ background: "var(--sage)", color: "var(--pure-white)" }}
      >
        Try Again
      </button>
    </div>
  );
}
