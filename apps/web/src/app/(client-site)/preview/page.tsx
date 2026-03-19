import { getContent } from "@/lib/storage";
import { Hero } from "@/components/public/Hero";
import { Services } from "@/components/public/Services";
import { Booking } from "@/components/public/Booking";
import { Story } from "@/components/public/Story";
import { Testimonials } from "@/components/public/Testimonials";
import { Events } from "@/components/public/Events";
import { Providers } from "@/components/public/Providers";
import { Contact } from "@/components/public/Contact";

export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  const [hero, services, story, testimonials, events, providers, contact, settings] =
    await Promise.all([
      getContent("hero"),
      getContent("services"),
      getContent("story"),
      getContent("testimonials"),
      getContent("events"),
      getContent("providers"),
      getContent("contact"),
      getContent("settings"),
    ]);

  return (
    <>
      <a href="#services" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm" style={{ background: "var(--sage)", color: "var(--cream)" }}>
        Skip to services
      </a>
      <main>
        <Hero hero={hero} />
        <Services services={services} />
        <Booking bookingUrl={settings.bookingUrl} />
        <Story story={story} />
        <Testimonials testimonials={testimonials} />
        {events.events.length > 0 && <Events events={events} />}
        {providers.providers.length > 0 && <Providers providers={providers} />}
        <Contact contact={contact} />
      </main>
    </>
  );
}
