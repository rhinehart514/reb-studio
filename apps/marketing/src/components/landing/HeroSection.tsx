const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end bg-[#0a0a0a] pt-14 pb-16 md:pb-24">
      {/* Subtle dot grid — faded */}
      <div className="absolute inset-0 reb-grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="text-sm text-amber-400/80 font-medium tracking-wide mb-4">
            Built for salons, studios, and shops on Square
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-normal tracking-tight leading-[1.02]">
            <span className="text-white">Your site works</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
              while you sleep
            </span>
          </h1>

          <p className="mt-6 text-lg text-zinc-500 max-w-md leading-relaxed">
            Connect Square. Get a website that updates itself.
            No agencies, no maintenance, no thinking about it.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
            <a
              href={`${webUrl}/get-started`}
              className="w-full sm:w-auto text-center bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3.5 rounded transition-colors text-sm tracking-wide"
            >
              Connect Square
            </a>
            <a
              href={`${webUrl}/get-started`}
              className="w-full sm:w-auto text-center border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 font-medium px-8 py-3.5 rounded transition-colors text-sm tracking-wide"
            >
              Tell us about your business
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
