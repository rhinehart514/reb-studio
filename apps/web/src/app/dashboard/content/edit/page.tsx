"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { InputField, TextAreaField, SaveBar } from "@/components/dashboard/FormField";

type SectionData = Record<string, unknown>;

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  services: "Services",
  story: "About",
  testimonials: "Testimonials",
  events: "Events",
  providers: "Partners",
  contact: "Contact",
  settings: "Settings",
};

function SectionEditorInner() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "";

  const [data, setData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(() => {
    if (!section) return;
    setLoading(true);
    fetch(`/api/content/${section}`, { credentials: "same-origin" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load section data");
        setLoading(false);
      });
  }, [section]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const update = (key: string, value: unknown) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
    setDirty(true);
    setSaved(false);
  };

  const save = async () => {
    if (!data || !section) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Save failed" }));
        setError(err.error || "Save failed");
      } else {
        setDirty(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setError("Failed to save. Check your connection.");
    } finally {
      setSaving(false);
    }
  };

  if (!section || !SECTION_LABELS[section]) {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <p className="text-sm text-zinc-400">Invalid section.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard/content" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {SECTION_LABELS[section]}
          </h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-[#141414] border border-[#262626] rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <p className="text-sm text-red-400">{error || "Failed to load."}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/content" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500">Edit</span>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {SECTION_LABELS[section]}
            </h1>
          </div>
        </div>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-900/20 border border-red-800/30 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Dynamic fields based on section */}
      <div className="space-y-4">
        {section === "hero" && (
          <>
            <TextAreaField label="Headline" value={String(data.headline || "")} onChange={(v) => update("headline", v)} rows={3} />
            <InputField label="Subheadline" value={String(data.subheadline || "")} onChange={(v) => update("subheadline", v)} />
            <TextAreaField label="Tagline" value={String(data.tagline || "")} onChange={(v) => update("tagline", v)} rows={2} />
            <InputField label="Button Text" value={String(data.ctaText || "")} onChange={(v) => update("ctaText", v)} />
            <InputField label="Button Link" value={String(data.ctaLink || "")} onChange={(v) => update("ctaLink", v)} type="url" />
            <InputField label="Background Image URL" value={String(data.backgroundImageUrl || "")} onChange={(v) => update("backgroundImageUrl", v)} type="url" />
          </>
        )}

        {section === "story" && (
          <>
            <InputField label="Headline" value={String(data.headline || "")} onChange={(v) => update("headline", v)} />
            <InputField label="Accent Text" value={String(data.accentText || "")} onChange={(v) => update("accentText", v)} />
            <TextAreaField label="Statement" value={String(data.statement || "")} onChange={(v) => update("statement", v)} rows={4} />
            <TextAreaField label="Bio (one paragraph per line)" value={Array.isArray(data.paragraphs) ? (data.paragraphs as string[]).join("\n\n") : ""} onChange={(v) => update("paragraphs", v.split("\n\n").filter(Boolean))} rows={6} />
            <InputField label="Quote" value={String(data.quote || "")} onChange={(v) => update("quote", v)} />
            <InputField label="Quote Attribution" value={String(data.quoteAttribution || "")} onChange={(v) => update("quoteAttribution", v)} />
          </>
        )}

        {section === "contact" && (
          <>
            <InputField label="Email" value={String(data.email || "")} onChange={(v) => update("email", v)} type="email" />
            <InputField label="Phone" value={String(data.phone || "")} onChange={(v) => update("phone", v)} type="tel" />
            <InputField label="Address" value={String(data.address || "")} onChange={(v) => update("address", v)} />
            <TextAreaField label="Hours" value={String(data.hours || "")} onChange={(v) => update("hours", v)} rows={4} placeholder="Monday: 9am-5pm&#10;Tuesday: 9am-5pm" />
            <InputField label="Location Title" value={String(data.locationTitle || "")} onChange={(v) => update("locationTitle", v)} />
            <TextAreaField label="Location Directions" value={String(data.locationDescription || "")} onChange={(v) => update("locationDescription", v)} rows={3} />
            <InputField label="Instagram URL" value={String(data.instagramUrl || "")} onChange={(v) => update("instagramUrl", v)} type="url" />
            <InputField label="Facebook URL" value={String(data.facebookUrl || "")} onChange={(v) => update("facebookUrl", v)} type="url" />
            <InputField label="Google Maps Embed URL" value={String(data.googleMapsUrl || "")} onChange={(v) => update("googleMapsUrl", v)} type="url" />
          </>
        )}

        {section === "settings" && (
          <>
            <InputField label="Site Name" value={String(data.siteName || "")} onChange={(v) => update("siteName", v)} />
            <InputField label="Tagline" value={String(data.siteTagline || "")} onChange={(v) => update("siteTagline", v)} />
            <TextAreaField label="Description (for search engines)" value={String(data.siteDescription || "")} onChange={(v) => update("siteDescription", v)} rows={3} />
            <InputField label="Booking URL" value={String(data.bookingUrl || "")} onChange={(v) => update("bookingUrl", v)} type="url" />
            <InputField label="Footer Tagline" value={String(data.footerTagline || "")} onChange={(v) => update("footerTagline", v)} />
            <InputField label="Copyright Text" value={String(data.copyrightText || "")} onChange={(v) => update("copyrightText", v)} />
          </>
        )}

        {section === "services" && (
          <ArraySection
            items={(data.services as Record<string, unknown>[]) || []}
            onChange={(items) => update("services", items)}
            renderItem={(item, onChange) => (
              <>
                <InputField label="Name" value={String(item.name || "")} onChange={(v) => onChange({ ...item, name: v })} />
                <TextAreaField label="Description" value={String(item.description || "")} onChange={(v) => onChange({ ...item, description: v })} rows={3} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Price" value={String(item.price || "")} onChange={(v) => onChange({ ...item, price: v })} />
                  <InputField label="Duration" value={String(item.duration || "")} onChange={(v) => onChange({ ...item, duration: v })} />
                </div>
                <InputField label="Who It's For" value={String(item.who_its_for || "")} onChange={(v) => onChange({ ...item, who_its_for: v })} />
                <InputField label="Booking Link" value={String(item.booking_link || "")} onChange={(v) => onChange({ ...item, booking_link: v })} type="url" />
                <label className="flex items-center gap-2 mt-1">
                  <input type="checkbox" checked={!!item.featured} onChange={(e) => onChange({ ...item, featured: e.target.checked })} className="rounded border-[#262626] bg-[#141414] text-violet-600" />
                  <span className="text-xs text-zinc-400">Featured service</span>
                </label>
              </>
            )}
            createItem={() => ({
              id: `service-${Date.now()}`,
              name: "",
              description: "",
              duration: "60 min",
              price: "",
              featured: false,
              who_its_for: "",
              booking_link: String(data.services && Array.isArray(data.services) && (data.services as Record<string, unknown>[])[0]?.booking_link || ""),
              comingSoon: false,
            })}
            itemLabel={(item) => String(item.name || "New Service")}
          />
        )}

        {section === "testimonials" && (
          <ArraySection
            items={(data.testimonials as Record<string, unknown>[]) || []}
            onChange={(items) => update("testimonials", items)}
            renderItem={(item, onChange) => (
              <>
                <TextAreaField label="Quote" value={String(item.quote || "")} onChange={(v) => onChange({ ...item, quote: v })} rows={3} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Name" value={String(item.author || "")} onChange={(v) => onChange({ ...item, author: v })} />
                  <InputField label="Location" value={String(item.location || "")} onChange={(v) => onChange({ ...item, location: v })} />
                </div>
              </>
            )}
            createItem={() => ({
              id: `t-${Date.now()}`,
              quote: "",
              author: "",
              location: "",
            })}
            itemLabel={(item) => String(item.author || "New Testimonial")}
          />
        )}

        {section === "events" && (
          <ArraySection
            items={(data.events as Record<string, unknown>[]) || []}
            onChange={(items) => update("events", items)}
            renderItem={(item, onChange) => (
              <>
                <InputField label="Title" value={String(item.title || "")} onChange={(v) => onChange({ ...item, title: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Date" value={String(item.date || "")} onChange={(v) => onChange({ ...item, date: v })} />
                  <InputField label="Time" value={String(item.time || "")} onChange={(v) => onChange({ ...item, time: v })} />
                </div>
                <InputField label="Location" value={String(item.location || "")} onChange={(v) => onChange({ ...item, location: v })} />
                <TextAreaField label="Description" value={String(item.description || "")} onChange={(v) => onChange({ ...item, description: v })} rows={3} />
                <InputField label="Link" value={String(item.external_link || "")} onChange={(v) => onChange({ ...item, external_link: v })} type="url" />
              </>
            )}
            createItem={() => ({
              id: `event-${Date.now()}`,
              title: "",
              date: new Date().toISOString().split("T")[0],
              time: "",
              location: "",
              description: "",
              hosted_by: "owner",
              external_link: "",
            })}
            itemLabel={(item) => String(item.title || "New Event")}
          />
        )}

        {section === "providers" && (
          <ArraySection
            items={(data.providers as Record<string, unknown>[]) || []}
            onChange={(items) => update("providers", items)}
            renderItem={(item, onChange) => (
              <>
                <InputField label="Name" value={String(item.name || "")} onChange={(v) => onChange({ ...item, name: v })} />
                <InputField label="Service" value={String(item.service || "")} onChange={(v) => onChange({ ...item, service: v })} />
                <TextAreaField label="Why I Recommend" value={String(item.why_i_recommend || "")} onChange={(v) => onChange({ ...item, why_i_recommend: v })} rows={2} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Booking Link" value={String(item.booking_link || "")} onChange={(v) => onChange({ ...item, booking_link: v })} type="url" />
                  <InputField label="Phone" value={String(item.phone || "")} onChange={(v) => onChange({ ...item, phone: v })} type="tel" />
                </div>
              </>
            )}
            createItem={() => ({
              id: `provider-${Date.now()}`,
              name: "",
              category: "specialty",
              service: "",
              why_i_recommend: "",
              booking_link: "",
              phone: "",
              photo_url: "",
            })}
            itemLabel={(item) => String(item.name || "New Partner")}
          />
        )}
      </div>

      <SaveBar saving={saving} onSave={save} dirty={dirty} />
    </div>
  );
}

// Reusable array editor for services, testimonials, events, providers
function ArraySection({
  items,
  onChange,
  renderItem,
  createItem,
  itemLabel,
}: {
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
  renderItem: (item: Record<string, unknown>, onChange: (item: Record<string, unknown>) => void) => React.ReactNode;
  createItem: () => Record<string, unknown>;
  itemLabel: (item: Record<string, unknown>) => string;
}) {
  const add = () => onChange([...items, createItem()]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const updateItem = (i: number, item: Record<string, unknown>) => {
    const next = [...items];
    next[i] = item;
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-zinc-500">{items.length} item{items.length !== 1 ? "s" : ""}</span>
        <button
          onClick={add}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-xs text-white transition-colors duration-150"
        >
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-[#141414] border border-[#262626] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-300">{itemLabel(item)}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-zinc-600 hover:text-zinc-300 disabled:opacity-20 transition-colors">
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1 text-zinc-600 hover:text-zinc-300 disabled:opacity-20 transition-colors">
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => remove(i)} className="p-1 text-red-500/60 hover:text-red-400 transition-colors ml-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {renderItem(item, (updated) => updateItem(i, updated))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EditSectionPage() {
  return (
    <Suspense fallback={<div className="p-6"><Loader2 className="w-5 h-5 text-violet-400 animate-spin" /></div>}>
      <SectionEditorInner />
    </Suspense>
  );
}
