const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";

export default function CTASection() {
  return (
    <section className="relative bg-[#0c1222] py-20 md:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl text-white leading-tight mb-4">
          Stop thinking about your website
        </h2>
        <p className="text-zinc-500 mb-10 max-w-md mx-auto">
          Connect Square, get a site that runs itself.
          Ten minutes from now, it could be live.
        </p>
        <a
          href={`${webUrl}/get-started`}
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-medium px-10 py-4 rounded transition-colors text-sm tracking-wide"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
