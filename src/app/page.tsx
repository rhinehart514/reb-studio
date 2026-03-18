import {
  Flower2,
  Sparkles,
  Droplets,
  Wind,
  Brain,
  Syringe,
  ArrowRight,
  Quote,
} from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";

const services = [
  {
    icon: Flower2,
    name: "Therapeutic Massage",
    desc: "Deep tissue and Swedish techniques that release tension and restore balance.",
    price: "From $120",
  },
  {
    icon: Sparkles,
    name: "Signature Facials",
    desc: "Custom treatments using botanical extracts for radiant, renewed skin.",
    price: "From $150",
  },
  {
    icon: Droplets,
    name: "Body Treatments",
    desc: "Full-body rituals that detoxify, hydrate, and revitalize from head to toe.",
    price: "From $195",
  },
  {
    icon: Wind,
    name: "Aromatherapy",
    desc: "Essential oil blends crafted to calm the mind and awaken the senses.",
    price: "From $85",
  },
  {
    icon: Brain,
    name: "Meditation Sessions",
    desc: "Guided journeys into stillness. Learn techniques that last a lifetime.",
    price: "From $65",
  },
  {
    icon: Syringe,
    name: "IV Wellness Therapy",
    desc: "Targeted nutrient infusions for energy, immunity, and recovery.",
    price: "From $250",
  },
];

const testimonials = [
  {
    quote:
      "ROHLAX is the only place where I truly disconnect. The atmosphere, the therapists, the attention to detail — it's unlike anything in Buffalo.",
    name: "Danielle M.",
    detail: "Client since 2023",
  },
  {
    quote:
      "After my first session, I understood why people call it transformative. I sleep better, I think clearer. This is healthcare, not luxury.",
    name: "Marcus T.",
    detail: "Monthly member",
  },
  {
    quote:
      "The IV therapy changed my recovery game completely. And the space itself? Walking in feels like exhaling for the first time all week.",
    name: "Priya S.",
    detail: "Athlete & wellness advocate",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.04)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-amber-600/[0.02] blur-3xl animate-pulse-glow" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-amber-400/[0.02] blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.4em] text-[#888]">
            Premium Wellness Studio
          </p>
          <h1
            className="animate-fade-in-up delay-100 mt-6 text-4xl font-normal leading-tight tracking-tight sm:text-5xl md:text-7xl font-serif-display"
          >
            Where stillness
          </h1>
          <h1
            className="animate-fade-in-up delay-200 mt-2 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-4xl font-normal leading-tight tracking-tight text-transparent sm:text-5xl md:text-7xl font-serif-display"
          >
            becomes strength.
          </h1>
          <p className="animate-fade-in-up delay-300 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#888] sm:text-xl">
            A sanctuary for body and mind in the heart of Buffalo. Therapeutic treatments, guided meditation, and holistic wellness — all in one serene space.
          </p>
          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/book"
              className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Book a Session
            </a>
            <a
              href="/services"
              className="flex items-center gap-2 rounded-lg border border-[#1e1e1e] px-6 py-3.5 text-sm font-medium text-[#fafafa] transition-all duration-200 hover:border-[#888] hover:bg-[#111111]"
            >
              Explore Services
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[#888]">
              Our Offerings
            </p>
            <h2
              className="mt-4 text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl font-serif-display"
            >
              Six paths to{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                renewal.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="group rounded-xl border border-[#1e1e1e] bg-[#111111] p-8 transition-all duration-300 hover:border-amber-600/20 hover:shadow-[0_0_40px_-12px_rgba(212,165,116,0.1)]">
                  <service.icon
                    size={24}
                    className="text-[#888] transition-colors duration-200 group-hover:text-amber-400"
                  />
                  <h3 className="mt-4 text-base font-medium text-[#fafafa]">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#888]">
                    {service.desc}
                  </p>
                  <p className="mt-4 text-sm font-medium text-amber-400/80">
                    {service.price}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="mt-12 text-center">
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-[#888] transition-colors duration-200 hover:text-amber-400"
              >
                View all services & pricing
                <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Teaser */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="rounded-2xl border border-[#1e1e1e] bg-[#111111] p-10 sm:p-16">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#888]">
                Our Story
              </p>
              <h2 className="mt-4 text-2xl font-normal leading-relaxed tracking-tight sm:text-3xl font-serif-display">
                Founded by practitioners who believed{" "}
                <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  healing shouldn&apos;t feel clinical.
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#888]">
                ROHLAX was born from a simple observation: the places meant to restore us often feel sterile, rushed, impersonal. We built something different — a space where every detail serves your well-being, from the temperature of the room to the silence between breaths.
              </p>
              <a
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-opacity duration-200 hover:opacity-80"
              >
                Read our story
                <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[#888]">
              Testimonials
            </p>
            <h2
              className="mt-4 text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl font-serif-display"
            >
              Words from those who{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                found stillness.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="flex h-full flex-col rounded-xl border border-[#1e1e1e] bg-[#111111] p-8">
                  <Quote size={20} className="text-amber-400/40" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#fafafa]/90">
                    {t.quote}
                  </p>
                  <div className="mt-6 border-t border-[#1e1e1e] pt-4">
                    <p className="text-sm font-medium text-[#fafafa]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#888]">{t.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111111] p-10 text-center sm:p-16">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.05)_0%,transparent_70%)]" />

              <div className="relative z-10">
                <h2
                  className="text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl font-serif-display"
                >
                  Begin your{" "}
                  <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    journey.
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#888]">
                  Your body remembers what rest feels like. Let us help you find it again. Book your first session and experience the ROHLAX difference.
                </p>
                <a
                  href="/book"
                  className="mt-8 inline-block rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                >
                  Book a Session
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
