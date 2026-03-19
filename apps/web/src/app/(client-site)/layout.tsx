import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { getContent } from "@/lib/storage";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getContent("settings");
  const contact = await getContent("contact");
  return {
    title: `${settings.siteName} | ${settings.siteTagline}`,
    description: settings.siteDescription,
    openGraph: {
      title: `${settings.siteName} | ${settings.siteTagline}`,
      description: settings.siteDescription,
      type: "website",
      locale: "en_US",
    },
    other: {
      ...(contact.address ? { "geo.placename": contact.address.split(",")[1]?.trim() || "" } : {}),
    },
  };
}

async function LocalBusinessSchema() {
  const contact = await getContent("contact");
  const settings = await getContent("settings");

  const dayMap: Record<string, string> = {
    mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
    fri: "Friday", sat: "Saturday", sun: "Sunday",
  };
  const hoursSpecs: Array<Record<string, string>> = [];
  if (contact.hours) {
    const parts = contact.hours.split(/[,;\n]+/).map((s: string) => s.trim()).filter(Boolean);
    for (const part of parts) {
      const match = part.match(/^(\w{3})\w*\s+(\d{1,2}(?::\d{2})?)\s*[-–]\s*(\d{1,2}(?::\d{2})?)/i);
      if (match) {
        const dayKey = match[1].toLowerCase();
        const day = dayMap[dayKey];
        if (day) {
          const opens = match[2].includes(":") ? match[2] : `${match[2]}:00`;
          const closes = match[3].includes(":") ? match[3] : `${match[3]}:00`;
          hoursSpecs.push({ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens, closes });
        }
      }
    }
  }

  const addressParts = contact.address ? contact.address.split(",").map((s: string) => s.trim()) : [];
  const streetAddress = addressParts[0] || "";
  const addressLocality = addressParts[1] || "";
  const stateZip = (addressParts[2] || "").match(/([A-Z]{2})\s*(\d{5})/);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.siteName,
    description: settings.siteDescription,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.address ? {
      address: {
        "@type": "PostalAddress",
        streetAddress,
        addressLocality,
        addressRegion: stateZip?.[1] || "",
        postalCode: stateZip?.[2] || "",
        addressCountry: "US",
      },
    } : {}),
    ...(hoursSpecs.length > 0 ? { openingHoursSpecification: hoursSpecs } : {}),
    sameAs: [
      contact.instagramUrl,
      contact.facebookUrl,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ClientSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, contact, events, providers] = await Promise.all([
    getContent("settings"),
    getContent("contact"),
    getContent("events"),
    getContent("providers"),
  ]);

  return (
    <SmoothScrollProvider>
      <LocalBusinessSchema />
      <Header
        settings={settings}
        sections={{
          hasEvents: events.events.length > 0,
          hasProviders: providers.providers.length > 0,
        }}
      />
      {children}
      <Footer
        settings={settings}
        contact={contact}
        sections={{
          hasEvents: events.events.length > 0,
          hasProviders: providers.providers.length > 0,
        }}
      />
    </SmoothScrollProvider>
  );
}
