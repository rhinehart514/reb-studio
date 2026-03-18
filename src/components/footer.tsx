import Link from "next/link";
import { MapPin, Mail, Phone, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold tracking-[0.3em] uppercase text-[#fafafa]">
              ROHLAX
            </span>
            <p className="mt-4 text-sm leading-relaxed text-[#888]">
              Where stillness becomes strength. Premium wellness in the heart of Buffalo.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e1e1e] text-[#888] transition-all duration-200 hover:border-amber-600/30 hover:text-amber-400"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e1e1e] text-[#888] transition-all duration-200 hover:border-amber-600/30 hover:text-amber-400"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[#888]">
              Quick Links
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Book Now", href: "/book" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#fafafa] transition-colors duration-200 hover:text-amber-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[#888]">
              Contact
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-[#fafafa]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#888]" />
                <span>123 Wellness Way<br />Buffalo, NY 14201</span>
              </div>
              <a
                href="mailto:hello@rohlax.com"
                className="flex items-center gap-2 text-sm text-[#fafafa] transition-colors duration-200 hover:text-amber-400"
              >
                <Mail size={14} className="shrink-0 text-[#888]" />
                hello@rohlax.com
              </a>
              <a
                href="tel:+17165550199"
                className="flex items-center gap-2 text-sm text-[#fafafa] transition-colors duration-200 hover:text-amber-400"
              >
                <Phone size={14} className="shrink-0 text-[#888]" />
                (716) 555-0199
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-[#888]">
              Hours
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-[#fafafa]">
                <Clock size={14} className="shrink-0 text-[#888]" />
                <div>
                  <p>Mon — Sat: 9am — 8pm</p>
                  <p>Sun: 10am — 6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#1e1e1e] pt-8 text-center">
          <p className="text-xs text-[#888]">
            &copy; {new Date().getFullYear()} ROHLAX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
