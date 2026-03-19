"use client";

import { useReveal } from "@/hooks/useReveal";

interface BookingProps {
  bookingUrl: string;
}

export function Booking({ bookingUrl }: BookingProps) {
  const sectionRef = useReveal();

  if (!bookingUrl) return null;

  return (
    <section
      id="booking"
      className="py-14 md:py-20"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="container-main">
        <div ref={sectionRef} className="reveal text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            Ready to Book?
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10"
            style={{ color: "var(--bark-light)" }}
          >
            Book your session online — choose a time that works for you, and let&apos;s get you feeling better.
          </p>

          <div
            className="max-w-xl mx-auto p-10 md:p-14"
            style={{ background: "var(--pure-white)", border: "1px solid var(--cream-mid)" }}
          >
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => {
                fetch("/api/track", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ event: "booking_click", label: "main_cta" }),
                }).catch(() => {});
              }}
            >
              Book Online
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
