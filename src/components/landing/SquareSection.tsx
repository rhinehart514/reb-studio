import { ArrowRight } from "lucide-react";

const flows = [
  { from: "Square Catalog", to: "Services Section" },
  { from: "Square Hours", to: "Contact Page" },
  { from: "Square Location", to: "Map Embed" },
];

export default function SquareSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm font-semibold text-white tracking-tight">Square</span>
            <span className="text-xs text-zinc-500">Integration</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Your Square data becomes your website
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Connect once. Your site stays in sync with your business — automatically.
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {flows.map((f) => (
            <div
              key={f.from}
              className="flex items-center gap-4 bg-[#141414] border border-[#262626] rounded-xl p-5"
            >
              <div className="flex-1 bg-[#1c1c1c] border border-[#333] rounded-lg px-4 py-3">
                <span className="text-xs text-zinc-500 block mb-0.5">Square</span>
                <span className="text-sm font-medium text-white">{f.from}</span>
              </div>
              <ArrowRight size={18} className="text-violet-500 shrink-0" />
              <div className="flex-1 bg-[#1c1c1c] border border-violet-600/20 rounded-lg px-4 py-3">
                <span className="text-xs text-violet-400 block mb-0.5">Your Website</span>
                <span className="text-sm font-medium text-white">{f.to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
