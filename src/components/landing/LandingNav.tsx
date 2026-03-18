"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#262626]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl text-white tracking-tight">
          REB
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Pricing
          </a>
          <Link
            href="/get-started"
            className="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-md transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-[#262626] px-6 pb-6 pt-4 flex flex-col gap-4">
          <a
            href="#how-it-works"
            onClick={() => setOpen(false)}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            How it Works
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
            className="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-md transition-colors text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
