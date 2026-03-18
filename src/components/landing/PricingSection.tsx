import Link from "next/link";
import { Check } from "lucide-react";

const included = [
  "Custom website design",
  "AI content management",
  "Square auto-sync",
  "Local SEO optimization",
  "Weekly performance reports",
  "Unlimited updates",
  "No setup fee",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0a0a0a] py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: headline + comparison */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight">
              One price.<br />No surprises.
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-10 max-w-sm">
              Everything included. Cancel anytime.
              No contracts, no hidden fees, no &quot;oh that costs extra.&quot;
            </p>

            {/* Comparison */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-white/[0.04] pb-3">
                <span className="text-sm text-zinc-500">Agency website</span>
                <span className="text-sm text-zinc-400 line-through decoration-zinc-600">$5,000+ setup</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-white/[0.04] pb-3">
                <span className="text-sm text-zinc-500">Freelancer retainer</span>
                <span className="text-sm text-zinc-400 line-through decoration-zinc-600">$500/mo</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-zinc-500">Doing nothing</span>
                <span className="text-sm text-amber-400/80">Lost customers</span>
              </div>
            </div>
          </div>

          {/* Right: pricing card */}
          <div className="bg-[#111318] border border-white/[0.06] rounded-xl p-8 md:p-10">
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">$49</span>
                <span className="text-zinc-600 text-sm">first month</span>
              </div>
              <div className="mt-2 text-zinc-500 text-sm">
                Then <span className="text-white font-semibold">$199</span>/mo
              </div>
            </div>

            <div className="h-px bg-white/[0.04] mb-6" />

            <ul className="space-y-3 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                  <Check size={15} className="text-violet-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/get-started"
              className="block w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3.5 rounded text-sm text-center transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
