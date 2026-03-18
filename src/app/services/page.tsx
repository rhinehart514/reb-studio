import {
  Flower2,
  Sparkles,
  Droplets,
  Wind,
  Brain,
  Syringe,
  ArrowRight,
} from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";

const services = [
  {
    icon: Flower2,
    name: "Therapeutic Massage",
    description:
      "Our massage therapists combine deep tissue, Swedish, and myofascial release techniques tailored to your body's needs. Whether you carry tension from desk work or athletic training, we restore range of motion and dissolve chronic pain patterns.",
    options: [
      { duration: "60 min", price: "$120" },
      { duration: "90 min", price: "$175" },
    ],
    gradient: "from-amber-800/30 to-amber-600/10",
  },
  {
    icon: Sparkles,
    name: "Signature Facial",
    description:
      "A 75-minute ritual using botanical extracts and clinical-grade serums. We analyze your skin, customize every product, and finish with LED therapy. Clients leave with a glow that lasts weeks — and a protocol to maintain it at home.",
    options: [{ duration: "75 min", price: "$150" }],
    gradient: "from-amber-700/30 to-yellow-600/10",
  },
  {
    icon: Droplets,
    name: "Body Treatment",
    description:
      "A full-body experience: dry brushing, mineral-rich body wrap, and hydrating application. This 90-minute treatment detoxifies, improves circulation, and leaves your skin impossibly soft. Seasonal ingredients keep every visit unique.",
    options: [{ duration: "90 min", price: "$195" }],
    gradient: "from-amber-600/30 to-orange-700/10",
  },
  {
    icon: Wind,
    name: "Aromatherapy Session",
    description:
      "Custom-blended essential oils selected for your specific needs — stress relief, energy, or deep relaxation. Paired with gentle acupressure and breathwork, this compact session recalibrates your nervous system in under an hour.",
    options: [{ duration: "45 min", price: "$85" }],
    gradient: "from-yellow-700/30 to-amber-600/10",
  },
  {
    icon: Brain,
    name: "Guided Meditation",
    description:
      "Led by certified mindfulness practitioners in our dedicated meditation suite. Learn techniques drawn from vipassana, yoga nidra, and breathwork traditions. Solo or group sessions available. Leave with practices you can use anywhere.",
    options: [
      { duration: "30 min", price: "$65" },
      { duration: "60 min", price: "$95" },
    ],
    gradient: "from-amber-800/30 to-yellow-700/10",
  },
  {
    icon: Syringe,
    name: "IV Wellness Therapy",
    description:
      "Physician-supervised nutrient infusions delivered in our private IV lounge. Choose from immunity, recovery, energy, or beauty formulas — each with clinical-grade vitamins, minerals, and amino acids. Results you can feel within hours.",
    options: [{ duration: "45 min", price: "$250 — $350" }],
    gradient: "from-amber-700/30 to-amber-500/10",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />

      {/* Header */}
      <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.4em] text-[#888]">
            Our Services
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl font-serif-display">
            Every treatment,{" "}
            <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              a ritual.
            </span>
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#888] sm:text-lg">
            We don&apos;t rush. Every session is designed around your body, your needs, your pace. Browse our offerings and find what calls to you.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="group overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111111] transition-all duration-300 hover:border-amber-600/20">
                  <div className="flex flex-col md:flex-row">
                    {/* Image placeholder */}
                    <div
                      className={`flex h-48 w-full items-center justify-center bg-gradient-to-br ${service.gradient} md:h-auto md:w-72 md:shrink-0`}
                    >
                      <service.icon
                        size={48}
                        className="text-amber-400/30 transition-colors duration-300 group-hover:text-amber-400/50"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-8 sm:p-10">
                      <h2 className="text-xl font-medium text-[#fafafa] sm:text-2xl font-serif-display">
                        {service.name}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-[#888] sm:text-base">
                        {service.description}
                      </p>

                      {/* Options */}
                      <div className="mt-6 flex flex-wrap gap-4">
                        {service.options.map((opt, j) => (
                          <div
                            key={j}
                            className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-2.5"
                          >
                            <span className="text-sm font-medium text-amber-400">
                              {opt.price}
                            </span>
                            <span className="ml-2 text-xs text-[#888]">
                              {opt.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111111] p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.05)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-normal tracking-tight sm:text-4xl font-serif-display">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    begin?
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#888]">
                  Choose your treatment, pick a time, and let us take care of the rest.
                </p>
                <a
                  href="/book"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                >
                  Book a Session
                  <ArrowRight size={14} />
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
