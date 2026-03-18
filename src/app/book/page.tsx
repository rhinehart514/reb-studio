"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";

const services = [
  { value: "massage-60", label: "Therapeutic Massage — 60 min ($120)" },
  { value: "massage-90", label: "Therapeutic Massage — 90 min ($175)" },
  { value: "facial", label: "Signature Facial — 75 min ($150)" },
  { value: "body", label: "Body Treatment — 90 min ($195)" },
  { value: "aromatherapy", label: "Aromatherapy Session — 45 min ($85)" },
  { value: "meditation-30", label: "Guided Meditation — 30 min ($65)" },
  { value: "meditation-60", label: "Guided Meditation — 60 min ($95)" },
  { value: "iv-immunity", label: "IV Wellness — Immunity ($250)" },
  { value: "iv-recovery", label: "IV Wellness — Recovery ($300)" },
  { value: "iv-energy", label: "IV Wellness — Energy ($300)" },
  { value: "iv-beauty", label: "IV Wellness — Beauty ($350)" },
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <>
      <Nav />

      {/* Header */}
      <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.4em] text-[#888]">
            Book a Session
          </p>
          <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl font-serif-display">
            Your time to{" "}
            <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              restore.
            </span>
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#888] sm:text-lg">
            Select a service, choose your preferred time, and we&apos;ll confirm your appointment within 2 hours.
          </p>
        </div>
      </section>

      {/* Booking Form + Info */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="rounded-2xl border border-[#1e1e1e] bg-[#111111] p-8 sm:p-10">
                  {submitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                        <CheckCircle2
                          size={32}
                          className="text-emerald-400"
                        />
                      </div>
                      <h2 className="mt-6 text-2xl font-normal tracking-tight font-serif-display">
                        Booking received.
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#888]">
                        We&apos;ll confirm your appointment via email within 2 hours. If you need to make changes, call us at (716) 555-0199 or reply to the confirmation email.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-sm text-amber-400 transition-opacity duration-200 hover:opacity-80"
                      >
                        Book another session
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Service */}
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                        >
                          Service *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          className="mt-2 w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] outline-none transition-colors duration-200 focus:border-amber-600/50"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date & Time */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                          >
                            Preferred Date *
                          </label>
                          <input
                            id="date"
                            name="date"
                            type="date"
                            required
                            className="mt-2 w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] outline-none transition-colors duration-200 focus:border-amber-600/50"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="time"
                            className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                          >
                            Preferred Time *
                          </label>
                          <input
                            id="time"
                            name="time"
                            type="time"
                            required
                            className="mt-2 w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] outline-none transition-colors duration-200 focus:border-amber-600/50"
                          />
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="mt-2 w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] placeholder-[#555] outline-none transition-colors duration-200 focus:border-amber-600/50"
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                          >
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] placeholder-[#555] outline-none transition-colors duration-200 focus:border-amber-600/50"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                          >
                            Phone *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="(716) 555-0000"
                            className="mt-2 w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] placeholder-[#555] outline-none transition-colors duration-200 focus:border-amber-600/50"
                          />
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label
                          htmlFor="requests"
                          className="block text-xs font-medium uppercase tracking-wider text-[#888]"
                        >
                          Special Requests
                        </label>
                        <textarea
                          id="requests"
                          name="requests"
                          rows={4}
                          placeholder="Allergies, injuries, preferences, or anything we should know..."
                          className="mt-2 w-full resize-none rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-3 text-sm text-[#fafafa] placeholder-[#555] outline-none transition-colors duration-200 focus:border-amber-600/50"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                      >
                        {submitting ? "Submitting..." : "Request Appointment"}
                      </button>

                      <p className="text-xs text-[#555]">
                        * Required fields. We&apos;ll confirm your appointment within 2 hours via email.
                      </p>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={200}>
                <div className="space-y-6">
                  {/* Location */}
                  <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-amber-400/60" />
                      <h3 className="text-sm font-medium text-[#fafafa]">
                        Location
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#888]">
                      123 Wellness Way<br />
                      Buffalo, NY 14201
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-amber-400/60" />
                      <h3 className="text-sm font-medium text-[#fafafa]">
                        Hours
                      </h3>
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-[#888]">
                      <p>Monday — Saturday: 9am — 8pm</p>
                      <p>Sunday: 10am — 6pm</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6">
                    <h3 className="text-sm font-medium text-[#fafafa]">
                      Questions?
                    </h3>
                    <div className="mt-3 space-y-3">
                      <a
                        href="tel:+17165550199"
                        className="flex items-center gap-2 text-sm text-[#888] transition-colors duration-200 hover:text-amber-400"
                      >
                        <Phone size={14} />
                        (716) 555-0199
                      </a>
                      <a
                        href="mailto:hello@rohlax.com"
                        className="flex items-center gap-2 text-sm text-[#888] transition-colors duration-200 hover:text-amber-400"
                      >
                        <Mail size={14} />
                        hello@rohlax.com
                      </a>
                    </div>
                  </div>

                  {/* Cancellation */}
                  <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6">
                    <h3 className="text-sm font-medium text-[#fafafa]">
                      Cancellation Policy
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-[#888]">
                      We kindly ask for 24 hours notice for cancellations or rescheduling. Late cancellations may be subject to a 50% service fee.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
