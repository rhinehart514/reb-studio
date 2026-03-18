import {
  Globe,
  MessageSquare,
  RefreshCcw,
  Search,
  BarChart3,
  DoorOpen,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Custom Website",
    description: "A beautifully designed site, built for your brand and your customers.",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Manage your content through chat. Just tell it what to change.",
  },
  {
    icon: RefreshCcw,
    title: "Square Sync",
    description: "Auto-import your catalog, hours, and location from Square.",
  },
  {
    icon: Search,
    title: "Auto SEO",
    description: "Optimized for local search so customers actually find you.",
  },
  {
    icon: BarChart3,
    title: "Weekly Reports",
    description: "Know what's happening on your site without digging through analytics.",
  },
  {
    icon: DoorOpen,
    title: "No Lock-In",
    description: "Export anytime. No contracts. Your site, your data.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-4">
          Everything your website needs
        </h2>
        <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
          One product. No plugins, no agencies, no maintenance.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-[#141414] border border-[#262626] rounded-xl p-7 transition-colors hover:border-violet-600/40"
            >
              <div className="w-11 h-11 rounded-lg bg-[#1c1c1c] border border-[#333] flex items-center justify-center mb-5 transition-colors group-hover:border-violet-600/40">
                <f.icon size={20} className="text-zinc-400 group-hover:text-violet-400 transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
