import { Globe, DollarSign, EyeOff } from "lucide-react";

const problems = [
  {
    icon: Globe,
    title: "Your website is dead",
    description:
      "You built it years ago. It hasn't been updated since. It barely represents what you do anymore.",
  },
  {
    icon: DollarSign,
    title: "Agencies cost too much",
    description:
      "$5K+ to build, $500/mo to maintain. For most local businesses, that math doesn't work.",
  },
  {
    icon: EyeOff,
    title: "You're invisible online",
    description:
      "No SEO, no updates, no presence. Potential customers can't find you — or worse, they find a competitor.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          Sound familiar?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-[#141414] border border-[#262626] rounded-xl p-8"
            >
              <div className="w-12 h-12 rounded-lg bg-[#1c1c1c] border border-[#333] flex items-center justify-center mb-6">
                <p.icon size={22} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
