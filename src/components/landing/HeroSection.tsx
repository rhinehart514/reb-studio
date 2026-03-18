import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] reb-grid-bg pt-16">
      {/* Gradient overlay to fade grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05]">
          <span className="bg-gradient-to-r from-violet-400 to-white bg-clip-text text-transparent">
            Your site works
          </span>
          <br />
          <span className="text-white">while you sleep</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AI-powered websites for local businesses. Connect Square, and we handle the rest.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-started"
            className="w-full sm:w-auto text-center bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3.5 rounded-md transition-colors text-sm tracking-wide"
          >
            Connect Square
          </Link>
          <Link
            href="/get-started"
            className="w-full sm:w-auto text-center border border-[#333] hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-8 py-3.5 rounded-md transition-colors text-sm tracking-wide"
          >
            Tell us about your business
          </Link>
        </div>
      </div>
    </section>
  );
}
