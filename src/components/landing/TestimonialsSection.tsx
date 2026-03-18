import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I went from having no website to a fully working site with my Square services, hours, and location — all in about 10 minutes. I didn't have to fill out a single form.",
    name: "Chelsea R.",
    business: "Rohlax Wellness, Williamsville NY",
  },
  {
    quote:
      "My old site was 3 years out of date. REB pulled everything from Square and had a better site than what I paid an agency $4,000 for.",
    name: "First Client",
    business: "Coming soon",
  },
  {
    quote:
      "I just tell the AI what I want changed and it updates my site. No logging into WordPress, no calling my web guy. It just works.",
    name: "First Client",
    business: "Coming soon",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
            What business owners say
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white mt-3">
            Real results, real businesses
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-[#141414] border border-[#262626] rounded-xl p-8 flex flex-col"
            >
              <Quote size={20} className="text-violet-600/40 mb-4 shrink-0" />
              <blockquote className="text-sm text-zinc-300 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-[#262626]">
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{t.business}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
