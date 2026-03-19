export default function SquareSection() {
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: explanation */}
          <div>
            <div className="inline-block bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1 mb-6">
              <span className="text-xs font-medium text-zinc-400 tracking-wide">Square Integration</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">
              Your Square data becomes your website
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Connect once. Your catalog, hours, and location stay in sync
              automatically. Change something in Square &mdash; it changes on your site.
            </p>
            <p className="text-sm text-zinc-600">
              No copy-pasting. No manual updates. No forgetting to change your holiday hours.
            </p>
          </div>

          {/* Right: before/after visual */}
          <div className="space-y-4">
            {/* "Before" — raw Square data */}
            <div className="bg-[#111318] border border-white/[0.06] rounded-lg p-5">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">In Square</p>
              <div className="font-mono text-xs text-zinc-500 space-y-1.5">
                <p><span className="text-zinc-400">catalog[0]:</span> &quot;Deep Tissue Massage — 60min — $95&quot;</p>
                <p><span className="text-zinc-400">catalog[1]:</span> &quot;Hot Stone Therapy — 90min — $140&quot;</p>
                <p><span className="text-zinc-400">catalog[2]:</span> &quot;CBD Recovery — 45min — $75&quot;</p>
                <p><span className="text-zinc-400">hours:</span> &quot;Mon-Fri 9a-7p, Sat 10a-4p&quot;</p>
                <p><span className="text-zinc-400">location:</span> &quot;5678 Main St, Williamsville NY&quot;</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-px h-6 bg-gradient-to-b from-zinc-700 to-violet-500" />
            </div>

            {/* "After" — website section */}
            <div className="bg-[#111318] border border-violet-500/20 rounded-lg p-5">
              <p className="text-[10px] uppercase tracking-widest text-violet-400/60 mb-3">On your website</p>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-medium text-white">Deep Tissue Massage</p>
                    <p className="text-xs text-zinc-500">60 minutes</p>
                  </div>
                  <span className="text-sm font-semibold text-white">$95</span>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-medium text-white">Hot Stone Therapy</p>
                    <p className="text-xs text-zinc-500">90 minutes</p>
                  </div>
                  <span className="text-sm font-semibold text-white">$140</span>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-medium text-white">CBD Recovery</p>
                    <p className="text-xs text-zinc-500">45 minutes</p>
                  </div>
                  <span className="text-sm font-semibold text-white">$75</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
