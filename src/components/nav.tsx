"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#1e1e1e]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.3em] uppercase text-[#fafafa]"
        >
          ROHLAX
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#888] transition-colors duration-200 hover:text-[#fafafa]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#fafafa] transition-colors duration-200 hover:bg-[#111111] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm text-[#888] transition-colors duration-200 hover:bg-[#111111] hover:text-[#fafafa]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-3 text-center text-sm font-medium text-white"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
