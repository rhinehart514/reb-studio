import {
  Clock,
  DollarSign,
  TrendingDown,
  Paintbrush,
  MessageSquare,
  Search,
  BarChart3,
  RefreshCw,
  Unlock,
} from "lucide-react";
import Nav from "@/components/nav";
import ScrollReveal from "@/components/scroll-reveal";
import ContactForm from "@/components/contact-form";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in-up text-4xl font-normal leading-tight tracking-tight sm:text-5xl md:text-7xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            We don&apos;t build websites.
          </h1>
          <h1 className="animate-fade-in-up delay-200 mt-2 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-4xl font-normal leading-tight tracking-tight text-transparent sm:text-5xl md:text-7xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            We build marketing machines.
          </h1>
          <p className="animate-fade-in-up delay-300 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#888] sm:text-xl">
            Custom-built sites with an AI assistant that handles content, SEO, and updates. You describe your business. Your site works while you sleep.
          </p>
          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#how-it-works"
              className="rounded-lg border border-[#262626] px-6 py-3 text-sm font-medium text-[#fafafa] transition-all duration-200 hover:border-[#888] hover:bg-[#141414]"
            >
              See it in action
            </a>
            <a
              href="#contact"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Get started
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Your website is{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                dead weight.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "You built it once. Never touched it again.",
                desc: "Your site is a time capsule from 2021. Outdated info, broken links, zero momentum.",
              },
              {
                icon: DollarSign,
                title: "Your agency charges $3K/mo for basic updates.",
                desc: "Change a phone number? That'll be a ticket, a meeting, and a $200 invoice.",
              },
              {
                icon: TrendingDown,
                title: "Your competitors rank above you on Google.",
                desc: "They're not better. They just have a site that actually gets updated.",
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group rounded-xl border border-[#262626] bg-[#141414] p-8 transition-all duration-200 hover:border-violet-600/30 hover:shadow-[0_0_30px_-10px_rgba(124,58,237,0.15)]">
                  <card.icon size={24} className="text-[#888] transition-colors duration-200 group-hover:text-violet-400" />
                  <h3 className="mt-4 text-base font-medium text-[#fafafa]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#888]">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              From handshake to autopilot in{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                2 weeks.
              </span>
            </h2>
          </ScrollReveal>

          <div className="relative mt-20">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-violet-600 via-indigo-600 to-transparent sm:left-8 md:block" />

            <div className="flex flex-col gap-16">
              {[
                {
                  num: "01",
                  title: "We Build It",
                  desc: "A custom site. Not a template. Designed for YOUR business, YOUR customers, YOUR city.",
                },
                {
                  num: "02",
                  title: "You Get an AI",
                  desc: "A chat assistant that knows your business. Change hours, add events, update services — just tell it.",
                },
                {
                  num: "03",
                  title: "It Runs Itself",
                  desc: "SEO optimizes automatically. Content stays fresh. You get a weekly report: here's what your site did for you.",
                },
              ].map((step, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="flex gap-6 sm:gap-8">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#262626] bg-[#141414] text-sm font-bold text-violet-400 sm:h-16 sm:w-16 sm:text-base">
                      {step.num}
                    </div>
                    <div className="pt-1 sm:pt-3">
                      <h3 className="text-xl font-medium text-[#fafafa] sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#888] sm:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                business OS.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="animate-float mt-16">
              {/* Browser chrome */}
              <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#141414] shadow-2xl shadow-violet-600/5">
                {/* Title bar */}
                <div className="flex items-center gap-3 border-b border-[#262626] px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-[#0a0a0a] px-4 py-1.5 text-xs text-[#888]">
                    chelsea.reb.studio/dashboard
                  </div>
                </div>

                {/* Dashboard mockup content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#888]">Good morning,</p>
                      <p className="text-lg font-medium text-[#fafafa]">Chelsea</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      All systems live
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-4">
                      <p className="text-xs text-[#888]">Visitors this week</p>
                      <p className="mt-1 text-2xl font-semibold text-[#fafafa]">1,247</p>
                      <p className="mt-1 text-xs text-emerald-400">+23% vs last week</p>
                    </div>
                    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-4">
                      <p className="text-xs text-[#888]">AI actions</p>
                      <p className="mt-1 text-2xl font-semibold text-[#fafafa]">18</p>
                      <p className="mt-1 text-xs text-[#888]">SEO, content, updates</p>
                    </div>
                    <div className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-4">
                      <p className="text-xs text-[#888]">Google ranking</p>
                      <p className="mt-1 text-2xl font-semibold text-[#fafafa]">#3</p>
                      <p className="mt-1 text-xs text-emerald-400">Up from #11</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-[#262626] bg-[#0a0a0a] p-4">
                    <p className="text-xs text-[#888]">Recent AI activity</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {[
                        "Updated holiday hours across all pages",
                        "Added schema markup for local business",
                        "Optimized 4 images for page speed",
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#fafafa]">
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="mt-8 text-center text-sm leading-relaxed text-[#888] sm:text-base">
              This is what Chelsea sees every morning. Her site&apos;s performance, AI activity, one-click actions. No CMS. No code. Just results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              What you{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                get.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Paintbrush,
                title: "Custom Design",
                desc: "Hand-built for your brand. Not a template.",
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                desc: "Chat to update anything. It reads your site, makes changes, confirms.",
              },
              {
                icon: Search,
                title: "Auto-SEO",
                desc: "Structured data, meta tags, sitemap. Automatic.",
              },
              {
                icon: BarChart3,
                title: "Weekly Reports",
                desc: "Plain English: here's who found you, here's what we did.",
              },
              {
                icon: RefreshCw,
                title: "24/7 Updates",
                desc: "Your AI doesn't sleep. Neither does your site.",
              },
              {
                icon: Unlock,
                title: "No Lock-In",
                desc: "Month-to-month. Your site, your domain, your data.",
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="gradient-border-hover group rounded-xl p-8 transition-all duration-200 hover:-translate-y-1">
                  <feature.icon
                    size={24}
                    className="text-[#888] transition-colors duration-200 group-hover:text-violet-400"
                  />
                  <h3 className="mt-4 text-base font-medium text-[#fafafa]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#888]">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Simple{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                pricing.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-16 overflow-hidden rounded-2xl border border-[#262626] bg-[#141414]">
              <div className="p-8 sm:p-12">
                <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
                  <div className="flex-1">
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      <div>
                        <span className="text-5xl font-semibold text-[#fafafa] sm:text-6xl">$3,000</span>
                        <span className="ml-2 text-sm text-[#888]">one-time build</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                      <div>
                        <span className="text-5xl font-semibold text-[#fafafa] sm:text-6xl">$199</span>
                        <span className="ml-2 text-sm text-[#888]">/mo — AI + hosting + updates + SEO</span>
                      </div>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-[#888]">
                      That&apos;s less than what you&apos;re paying your agency. And your site actually improves.
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "vs Agency", value: "$1,500-5,000/mo" },
                    { label: "vs DIY", value: "40hrs/mo of your time" },
                    { label: "vs Nothing", value: "Invisible on Google" },
                  ].map((comp, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-[#262626] bg-[#0a0a0a] p-4 text-center"
                    >
                      <p className="text-xs text-[#888]">{comp.label}</p>
                      <p className="mt-1 text-sm font-medium text-[#fafafa]">
                        {comp.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <a
                    href="#contact"
                    className="inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Questions.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-12">
              <FAQ />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-xl">
          <ScrollReveal>
            <h2 className="text-center text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Ready to stop thinking about{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                your website?
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-12">
              <ContactForm />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="mt-8 text-center text-sm text-[#888]">
              Or just email us:{" "}
              <a
                href="mailto:hello@reb.studio"
                className="text-[#fafafa] underline decoration-[#262626] underline-offset-4 transition-colors duration-200 hover:decoration-violet-400"
              >
                hello@reb.studio
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#262626] px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-lg font-bold tracking-tight text-[#fafafa]">
              REB
            </span>
            <span className="text-xs text-[#888]">
              Built in Buffalo, NY &middot; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#888] transition-colors duration-200 hover:text-[#fafafa]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-[#888]">
            Powered by AI. Built by hand.
          </p>
        </div>
      </footer>
    </>
  );
}
