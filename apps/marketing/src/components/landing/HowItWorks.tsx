const steps = [
  {
    num: "01",
    title: "Connect Square",
    detail: "One click. We pull your services, hours, location, and branding automatically.",
  },
  {
    num: "02",
    title: "AI builds your site",
    detail: "A custom website in minutes, not months. Designed around your business, not a template.",
  },
  {
    num: "03",
    title: "It runs itself",
    detail: "SEO, content updates, Square sync — handled. You focus on your business.",
  },
];

const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0a0a0a] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
          Three steps. Ten minutes.
        </h2>
        <p className="text-zinc-600 text-sm mb-16 max-w-md">
          From Square account to live website. No forms, no calls, no waiting.
        </p>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-8 ${
                i < steps.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
            >
              <span className="text-xs font-mono text-violet-500/60 tracking-widest pt-1">
                {step.num}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-[15px] leading-relaxed max-w-lg">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href={`${webUrl}/get-started`}
            className="inline-block text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            Start now &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
