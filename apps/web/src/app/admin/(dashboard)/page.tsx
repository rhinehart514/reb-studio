"use client";

const SECTIONS = [
  { name: "Hero", href: "/admin/hero", description: "Headline, background image, call-to-action" },
  { name: "Services", href: "/admin/services", description: "Service types, pricing, booking links" },
  { name: "Story", href: "/admin/story", description: "Business bio, credentials, stats" },
  { name: "Testimonials", href: "/admin/testimonials", description: "Client quotes and reviews" },
  { name: "Events", href: "/admin/events", description: "Upcoming events and workshops" },
  { name: "Providers", href: "/admin/providers", description: "Recommended partner providers" },
  { name: "Contact", href: "/admin/contact", description: "Email, phone, hours, location" },
  { name: "Settings", href: "/admin/settings", description: "Site name, SEO, booking URL" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl mb-2" style={{ color: "var(--bark)" }}>Dashboard</h1>
      <p className="text-sm mb-8" style={{ color: "var(--bark-faded)" }}>Manage your site content</p>

      <div
        className="flex items-center gap-6 mb-8 p-4 rounded-xl"
        style={{ background: "var(--pure-white)", border: "1px solid var(--cream-dark)" }}
      >
        <div>
          <p className="text-2xl font-display" style={{ color: "var(--sage)" }}>{SECTIONS.length}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--bark-faded)" }}>Sections</p>
        </div>
      </div>

      <a
        href="/dashboard"
        className="flex items-center justify-between mb-8 p-4 rounded-xl transition-all hover:shadow-sm"
        style={{
          background: "var(--pure-white)",
          border: "1px solid var(--cream-dark)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--sage)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--cream-dark)";
        }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--bark)" }}>View Client Dashboard</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--bark-faded)" }}>See the client-facing dashboard experience</p>
        </div>
        <span className="text-lg" style={{ color: "var(--sage)" }}>&rarr;</span>
      </a>

      <div className="grid sm:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="block p-6 rounded-xl transition-all hover:shadow-sm"
            style={{
              background: "var(--pure-white)",
              border: "1px solid var(--cream-dark)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--sage)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--cream-dark)";
            }}
          >
            <h2 className="text-lg font-medium" style={{ color: "var(--bark)" }}>{section.name}</h2>
            <p className="text-sm mt-1" style={{ color: "var(--bark-faded)" }}>{section.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
