import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="bg-black border-t border-[#262626] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="font-display text-xl text-white tracking-tight mb-1">REB</div>
            <div className="text-xs text-zinc-500">Built in Buffalo, NY</div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Pricing
            </a>
            <Link href="/get-started" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Get Started
            </Link>
            <Link href="/admin/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Login
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1c1c1c] text-center">
          <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} REB Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
