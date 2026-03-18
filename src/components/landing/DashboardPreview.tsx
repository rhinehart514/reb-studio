import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
            Chat to change anything
          </h2>
          <p className="text-zinc-500 leading-relaxed">
            No login to WordPress. No calling your web person.
            Tell the AI what you want and it updates your site.
          </p>
        </div>

        {/* Browser chrome mockup — slight perspective */}
        <div
          className="bg-[#111318] border border-white/[0.06] rounded-xl overflow-hidden"
          style={{
            boxShadow: "0 24px 80px -12px rgba(124, 58, 237, 0.08), 0 12px 40px -8px rgba(0,0,0,0.5)",
            transform: "perspective(2000px) rotateY(-1deg) rotateX(1deg)",
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-[11px] text-zinc-600 font-mono">dashboard.rebstudio.com</span>
          </div>

          {/* Dashboard content */}
          <div className="p-5 md:p-8">
            <div className="grid md:grid-cols-[180px_1fr] gap-4">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col gap-0.5 border-r border-white/[0.04] pr-4">
                <div className="px-3 py-2 rounded bg-white/[0.04] text-xs text-white font-medium border-l-2 border-violet-600">
                  Overview
                </div>
                <div className="px-3 py-2 text-xs text-zinc-600">AI Chat</div>
                <div className="px-3 py-2 text-xs text-zinc-600">My Site</div>
                <div className="px-3 py-2 text-xs text-zinc-600">Content</div>
                <div className="px-3 py-2 text-xs text-zinc-600">Settings</div>
              </div>

              {/* Main */}
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-zinc-600">LIVE</span>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3.5">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Services</div>
                    <div className="text-xl font-semibold text-white">7</div>
                    <div className="text-[10px] text-emerald-500/70 mt-1">Synced from Square</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3.5">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Square</div>
                    <div className="text-lg font-semibold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-1">Auto-syncing</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3.5 hidden lg:block">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">AI Updates</div>
                    <div className="text-xl font-semibold text-white">12</div>
                    <div className="text-[10px] text-zinc-600 mt-1">This month</div>
                  </div>
                </div>

                {/* Chat preview */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-zinc-400">Y</span>
                    </div>
                    <div className="bg-violet-600 rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-white">
                      Update my holiday hours &mdash; closed Dec 25 and Jan 1
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-white">R</span>
                    </div>
                    <div className="bg-white/[0.04] rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-zinc-400">
                      Done! I&apos;ve updated your contact page &mdash; closed Dec 25 and Jan 1. Your site is live with the new hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/preview"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            See an example site
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
