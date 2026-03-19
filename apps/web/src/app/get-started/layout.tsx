import Link from "next/link";

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626]">
        <Link
          href="/"
          className="font-serif text-lg font-bold tracking-tight text-white"
        >
          REB
        </Link>
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          &larr; Back
        </Link>
      </nav>
      <div className="pt-14">{children}</div>
    </div>
  );
}
