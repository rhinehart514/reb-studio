import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      {/* Violet gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl text-white leading-tight mb-6">
          Ready to stop thinking about your website?
        </h2>
        <p className="text-zinc-400 mb-10 max-w-lg mx-auto">
          Let AI handle it. You run your business.
        </p>
        <Link
          href="/get-started"
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-medium px-10 py-4 rounded-md transition-colors text-sm tracking-wide"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
