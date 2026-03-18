import Link from "next/link";
import { Check } from "lucide-react";

const included = [
  "Custom website",
  "AI management",
  "Square sync",
  "SEO optimization",
  "Weekly reports",
  "Unlimited updates",
  "No setup fee",
];

const comparisons = [
  { label: "Agency setup", cost: "$5,000+" },
  { label: "Freelancer retainer", cost: "$500/mo" },
  { label: "Doing nothing", cost: "Lost customers" },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          Simple pricing
        </h2>

        {/* Pricing card */}
        <div className="max-w-md mx-auto bg-[#141414] border border-[#262626] rounded-2xl p-8 md:p-10 text-center mb-16">
          <div className="mb-6">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl md:text-6xl font-bold text-white">$49</span>
              <span className="text-zinc-500 text-sm">first month</span>
            </div>
            <div className="mt-2 text-zinc-400">
              Then <span className="text-white font-semibold">$199</span>/mo
            </div>
          </div>

          <div className="border-t border-[#262626] pt-6 mb-8">
            <ul className="space-y-3 text-left">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <Check size={16} className="text-violet-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/get-started"
            className="block w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3.5 rounded-md transition-colors text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Comparison */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {comparisons.map((c) => (
            <div
              key={c.label}
              className="text-center bg-[#141414] border border-[#262626] rounded-xl p-5"
            >
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">vs</div>
              <div className="text-lg font-semibold text-white mb-1">{c.cost}</div>
              <div className="text-xs text-zinc-500">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
