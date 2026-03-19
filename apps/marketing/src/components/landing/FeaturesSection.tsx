const features = [
  {
    name: "Custom website",
    detail: "Designed around your brand, your services, your neighborhood. Not a template with your logo swapped in.",
  },
  {
    name: "AI that manages it",
    detail: "Tell it what to change in plain English. It updates your site, writes copy, adjusts layouts.",
  },
  {
    name: "Square sync",
    detail: "Services, hours, location — pulled from Square automatically. Change it there, it changes here.",
  },
  {
    name: "Local SEO",
    detail: "Structured data, meta tags, Google Business optimization. So customers find you, not a competitor.",
  },
  {
    name: "Weekly reports",
    detail: "Who visited, what they clicked, how you rank. Plain English, no analytics degree required.",
  },
  {
    name: "No lock-in",
    detail: "Export your site anytime. No contracts, no annual commitments. Your data stays yours.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#0c1222] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-medium text-amber-400/60 uppercase tracking-widest mb-3">
          What you get
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-14">
          One product, not six vendors
        </h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {features.map((f) => (
            <div key={f.name}>
              <h3 className="text-base font-semibold text-zinc-200 mb-1.5">
                {f.name}
              </h3>
              <p className="text-[15px] text-zinc-500 leading-relaxed">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
