import { Link2, Sparkles, Zap } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Link2,
    title: "Connect Square",
    description:
      "Link your Square account and we pull your business info automatically.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "AI Builds Your Site",
    description:
      "In minutes, not months. Custom design based on your brand.",
  },
  {
    num: "03",
    icon: Zap,
    title: "It Runs Itself",
    description:
      "Updates, SEO, content — handled by AI. You focus on your business.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-20">
          How it works
        </h2>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-[#262626]" />

          {steps.map((step) => (
            <div key={step.num} className="relative text-center">
              {/* Step number + icon */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto mb-6">
                <step.icon size={28} className="text-violet-400" />
              </div>
              <span className="text-xs font-mono text-violet-500 tracking-widest uppercase mb-2 block">
                Step {step.num}
              </span>
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
