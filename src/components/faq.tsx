"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What kind of businesses is this for?",
    a: "Local businesses that need a real web presence: restaurants, salons, law firms, gyms, contractors, dental offices. If you serve customers in a specific area and want them to find you online, this is built for you.",
  },
  {
    q: "What if I need to change something?",
    a: "Just tell your AI assistant. Change your hours, add a new service, update photos, post an announcement. Describe what you want in plain English and it handles the rest. No tickets, no waiting.",
  },
  {
    q: "How long does the initial build take?",
    a: "Two weeks from kickoff to launch. We spend the first few days understanding your business, then build and refine until you love it.",
  },
  {
    q: "Can I use my own domain?",
    a: "Absolutely. Your domain, your brand. We handle DNS setup and SSL certificates as part of the build.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep your site and your domain. No hostage situations. We export everything you need to move to another host. Month-to-month, cancel anytime.",
  },
  {
    q: "Is the AI going to mess up my site?",
    a: "Every change the AI makes goes through a review step before going live. You approve major changes. Minor optimizations (SEO, meta tags, structured data) happen automatically because they only help.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#262626] bg-[#141414] transition-colors duration-200"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-sm font-medium text-[#fafafa] pr-4">
              {faq.q}
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-[#888] transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="animate-fade-in px-6 pb-5">
              <p className="text-sm leading-relaxed text-[#888]">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
