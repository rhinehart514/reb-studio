const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";

export default function LandingFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.04] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="font-display text-xl text-white tracking-tight mb-1">REB</div>
            <div className="text-xs text-zinc-600">Built in Buffalo, NY</div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#how-it-works" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
              Pricing
            </a>
            <a href={`${webUrl}/get-started`} className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
              Get Started
            </a>
            <a href={`${webUrl}/admin/login`} className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
              Login
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-700">&copy; {new Date().getFullYear()} REB Studio</p>
          <p className="text-xs text-zinc-800">Websites that don&apos;t need you.</p>
        </div>
      </div>
    </footer>
  );
}
