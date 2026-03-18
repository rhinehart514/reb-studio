import { ArrowRight } from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";

const team = [
  {
    name: "Maya Chen",
    role: "Founder & Director",
    bio: "A former physical therapist who spent a decade in clinical settings before realizing wellness could be warmer, more human. Maya founded ROHLAX to bridge the gap between clinical efficacy and genuine care.",
    initial: "MC",
  },
  {
    name: "James Rivera",
    role: "Lead Therapist",
    bio: "Certified in deep tissue, sports massage, and craniosacral therapy. James brings 12 years of experience and an intuitive understanding of the body that clients describe as transformative.",
    initial: "JR",
  },
  {
    name: "Aisha Patel",
    role: "Esthetician",
    bio: "Trained in both traditional Ayurvedic skincare and modern clinical aesthetics. Aisha designs every facial as a custom protocol — no two treatments are alike.",
    initial: "AP",
  },
  {
    name: "Sarah Kim",
    role: "Wellness Coach",
    bio: "A certified meditation instructor and yoga therapist. Sarah leads our mindfulness programs and helps clients build sustainable practices that extend far beyond our walls.",
    initial: "SK",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Header */}
      <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.4em] text-[#888]">
            About ROHLAX
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl font-serif-display">
            Built on the belief that{" "}
            <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              rest is not indulgence.
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="space-y-6 text-base leading-relaxed text-[#888] sm:text-lg">
              <p>
                ROHLAX began with a question: why do the places meant to restore us so often feel cold, rushed, transactional? Clinical lighting. Paper-thin walls. A therapist you&apos;ve never met rushing through a 50-minute slot.
              </p>
              <p>
                We built the opposite. A studio where the temperature is always right. Where your therapist knows your name, your history, your tension patterns. Where silence is intentional, and every detail — from the weight of the blankets to the scent in the air — serves a purpose.
              </p>
              <p className="text-[#fafafa]">
                ROHLAX is not a spa. It&apos;s a practice — a place where stillness becomes strength, and where taking care of yourself is taken seriously.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Holistic Approach",
                  desc: "We treat the whole person, not isolated symptoms. Every treatment considers your physical, mental, and emotional state.",
                },
                {
                  title: "Personalized Care",
                  desc: "No two bodies are the same. Every session begins with a conversation and adapts in real-time to what your body needs.",
                },
                {
                  title: "Evidence-Based",
                  desc: "We blend traditional healing wisdom with modern clinical research. If it works, we use it. If it doesn't, we don't.",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-8">
                    <h3 className="text-base font-medium text-[#fafafa]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#888]">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#888]">
              Our Team
            </p>
            <h2 className="mt-4 text-3xl font-normal tracking-tight sm:text-4xl font-serif-display">
              The people behind{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                the practice.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group flex gap-6 rounded-xl border border-[#1e1e1e] bg-[#111111] p-8 transition-all duration-300 hover:border-amber-600/20">
                  {/* Avatar placeholder */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-800/40 to-amber-600/20 text-sm font-medium text-amber-400/80">
                    {member.initial}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#fafafa]">
                      {member.name}
                    </h3>
                    <p className="text-sm text-amber-400/70">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#888]">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Space */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#111111]">
              {/* Image placeholder */}
              <div className="flex h-64 items-center justify-center bg-gradient-to-br from-amber-800/20 via-[#111111] to-amber-600/10 sm:h-80">
                <p className="text-sm text-amber-400/30 tracking-widest uppercase">
                  The Studio
                </p>
              </div>
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl font-normal tracking-tight sm:text-3xl font-serif-display">
                  A space designed for{" "}
                  <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    presence.
                  </span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#888]">
                  Natural materials, warm lighting, and thoughtful acoustics create an environment where your nervous system can downshift the moment you walk in. Private treatment rooms, a dedicated meditation suite, and our IV wellness lounge — each space calibrated for its purpose. No detail is accidental.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-normal tracking-tight sm:text-4xl font-serif-display">
              Experience it{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                yourself.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#888]">
              Words only go so far. Book a session and let the space speak for itself.
            </p>
            <a
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Book a Session
              <ArrowRight size={14} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
