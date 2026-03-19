import type { SiteSettings, ContactContent } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
  contact: ContactContent;
  sections?: {
    hasEvents?: boolean;
    hasProviders?: boolean;
  };
}

export function Footer({ settings, contact, sections }: FooterProps) {
  const navLinks = [
    { label: "Services", href: "#services", show: true },
    { label: "About", href: "#story", show: true },
    { label: "Events", href: "#events", show: sections?.hasEvents !== false },
    { label: "Providers", href: "#providers", show: sections?.hasProviders !== false },
    { label: "Book Now", href: "#booking", show: true },
  ].filter((link) => link.show);

  return (
    <footer id="footer" style={{ background: "var(--bark)", color: "var(--cream)" }}>
      <div className="container-main py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-lg tracking-tight mb-4 opacity-80">
              {settings.siteName}
            </p>
            <p className="text-sm leading-relaxed opacity-50 max-w-xs">
              {settings.siteDescription}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.2em] font-bold mb-5 opacity-40">
              Navigate
            </p>
            <ul className="space-y-3 text-sm opacity-60">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:opacity-100 transition-opacity">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.2em] font-bold mb-5 opacity-40">
              Connect
            </p>
            <ul className="space-y-3 text-sm opacity-60">
              {contact.email && (
                <li><a href={`mailto:${contact.email}`} className="hover:opacity-100 transition-opacity">{contact.email}</a></li>
              )}
              {contact.phone && (
                <li><a href={`tel:${contact.phone}`} className="hover:opacity-100 transition-opacity">{contact.phone}</a></li>
              )}
              {contact.instagramUrl && contact.instagramUrl !== "#" && (
                <li><a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a></li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container-main py-5 flex flex-wrap justify-between items-center gap-4 text-[0.625rem] tracking-wider uppercase opacity-40">
          <p>&copy; {new Date().getFullYear()} {settings.copyrightText}</p>
          <p>{settings.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
