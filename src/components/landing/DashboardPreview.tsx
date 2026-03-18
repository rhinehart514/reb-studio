import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-4">
          Your AI-powered command center
        </h2>
        <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
          Manage your website through conversation. Your AI assistant handles content updates,
          service changes, and keeps your site in sync with Square.
        </p>

        {/* Browser chrome mockup */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden shadow-2xl shadow-black/40">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1c] border-b border-[#262626]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-xs text-zinc-500 font-mono">dashboard.rebstudio.com</span>
          </div>

          {/* Dashboard simulation */}
          <div className="p-6 md:p-10">
            {/* Two-panel layout like real dashboard */}
            <div className="grid md:grid-cols-[200px_1fr] gap-4">
              {/* Sidebar mockup */}
              <div className="hidden md:flex flex-col gap-1 border-r border-[#262626] pr-4">
                <div className="px-3 py-2 rounded-md bg-[#1c1c1c] text-xs text-white font-medium border-l-2 border-violet-600">
                  Overview
                </div>
                <div className="px-3 py-2 text-xs text-zinc-500">AI Chat</div>
                <div className="px-3 py-2 text-xs text-zinc-500">My Site</div>
                <div className="px-3 py-2 text-xs text-zinc-500">Content</div>
                <div className="px-3 py-2 text-xs text-zinc-500">Settings</div>
              </div>

              {/* Main content */}
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-zinc-500">LIVE</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-[#1c1c1c] border border-[#262626] rounded-lg p-4">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Services</div>
                    <div className="text-xl font-semibold text-white">7</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Synced from Square</div>
                  </div>
                  <div className="bg-[#1c1c1c] border border-[#262626] rounded-lg p-4">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Square</div>
                    <div className="text-xl font-semibold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Auto-syncing</div>
                  </div>
                  <div className="bg-[#1c1c1c] border border-[#262626] rounded-lg p-4 hidden lg:block">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">AI Updates</div>
                    <div className="text-xl font-semibold text-white">12</div>
                    <div className="text-[10px] text-zinc-500 mt-1">This month</div>
                  </div>
                </div>

                {/* Chat preview */}
                <div className="bg-[#1c1c1c] border border-[#262626] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-zinc-300">Y</span>
                    </div>
                    <div className="bg-violet-600 rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-white">
                      Update my holiday hours — closed Dec 25 and Jan 1
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-white">R</span>
                    </div>
                    <div className="bg-[#262626] rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-zinc-300">
                      Done! I&apos;ve updated your contact page — closed Dec 25 and Jan 1. Your site is live with the new hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* See example site CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/preview"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            See an example site
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
