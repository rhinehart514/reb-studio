"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in-up rounded-2xl border border-[#262626] bg-[#141414] p-8 text-center">
        <p className="text-lg font-medium text-[#fafafa]">
          We&apos;ll be in touch within 24 hours.
        </p>
        <p className="mt-2 text-sm text-[#888]">
          Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg border border-[#262626] bg-[#141414] px-4 py-3 text-sm text-[#fafafa] placeholder-[#888] outline-none transition-colors duration-200 focus:border-violet-600"
      />
      <input
        type="email"
        placeholder="Email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg border border-[#262626] bg-[#141414] px-4 py-3 text-sm text-[#fafafa] placeholder-[#888] outline-none transition-colors duration-200 focus:border-violet-600"
      />
      <input
        type="text"
        placeholder="Business name"
        required
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        className="rounded-lg border border-[#262626] bg-[#141414] px-4 py-3 text-sm text-[#fafafa] placeholder-[#888] outline-none transition-colors duration-200 focus:border-violet-600"
      />
      <button
        type="submit"
        disabled={!name || !email || !business}
        className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Get Started
      </button>
    </form>
  );
}
