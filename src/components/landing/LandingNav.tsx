"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-white tracking-tight">
          REB
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">
            Pricing
          </a>
          <Link
            href="/get-started"
            className="text-[13px] font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/[0.06] px-6 pb-6 pt-4 flex flex-col gap-4">
          <a
            href="#how-it-works"
            onClick={() => setOpen(false)}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <Link
            href="/get-started"
            className="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded transition-colors text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
