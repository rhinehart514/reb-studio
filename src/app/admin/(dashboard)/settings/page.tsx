"use client";

import { useState, useEffect } from "react";
import { SectionEditor } from "@/components/admin/SectionEditor";
import type { SiteSettings } from "@/lib/types";

export default function SettingsEditor() {
  const [data, setData] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/api/content/settings").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    const res = await fetch("/api/content/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Server error");
    }
  };

  if (!data) return <div style={{ color: "var(--bark-faded)" }}>Loading...</div>;

  return (
    <SectionEditor title="Site Settings" description="Global config — site name, SEO, booking" onSave={save}>
      <div className="grid gap-6 bg-white p-6 rounded-xl border border-[var(--cream-dark)]">
        <div>
          <label className="block text-sm font-medium text-[var(--bark-light)] mb-1">Site Name</label>
          <input type="text" value={data.siteName} onChange={(e) => setData({ ...data, siteName: e.target.value })} className="w-full px-3 py-2.5 border border-[var(--cream-dark)] rounded-lg outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--bark-light)] mb-1">Site Tagline</label>
          <input type="text" value={data.siteTagline} onChange={(e) => setData({ ...data, siteTagline: e.target.value })} className="w-full px-3 py-2.5 border border-[var(--cream-dark)] rounded-lg outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--bark-light)] mb-1">Meta Description</label>
          <p className="text-xs mb-1.5" style={{ color: "var(--bark-faded)" }}>Shown in Google search results. Keep under 160 characters.</p>
          <textarea value={data.siteDescription} onChange={(e) => setData({ ...data, siteDescription: e.target.value })} rows={2} maxLength={200} className="w-full px-3 py-2.5 border border-[var(--cream-dark)] rounded-lg outline-none text-sm" />
          <p className="text-[0.625rem] mt-0.5 text-right" style={{ color: "var(--bark-faded)" }}>{data.siteDescription.length}/160 characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--bark-light)] mb-1">Booking URL</label>
          <p className="text-xs mb-1.5" style={{ color: "var(--bark-faded)" }}>
            Your online booking page. Connect Square or paste a direct link.
          </p>
          <input type="text" value={data.bookingUrl} onChange={(e) => setData({ ...data, bookingUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2.5 border border-[var(--cream-dark)] rounded-lg outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--bark-light)] mb-1">Footer Tagline</label>
          <input type="text" value={data.footerTagline} onChange={(e) => setData({ ...data, footerTagline: e.target.value })} className="w-full px-3 py-2.5 border border-[var(--cream-dark)] rounded-lg outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--bark-light)] mb-1">Copyright Text</label>
          <input type="text" value={data.copyrightText} onChange={(e) => setData({ ...data, copyrightText: e.target.value })} className="w-full px-3 py-2.5 border border-[var(--cream-dark)] rounded-lg outline-none text-sm" />
        </div>
      </div>
    </SectionEditor>
  );
}
