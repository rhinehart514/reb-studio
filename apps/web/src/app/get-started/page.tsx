"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { OnboardingChat } from "@/components/onboarding/OnboardingChat";

export default function GetStartedPage() {
  const [mode, setMode] = useState<"choose" | "email" | "square" | "chat">("choose");
  const [email, setEmail] = useState("");
  const [nextPath, setNextPath] = useState<"square" | "chat">("chat");
  const [saving, setSaving] = useState(false);
  const [emailError, setEmailError] = useState("");

  if (mode === "chat") {
    return <OnboardingChat />;
  }

  if (mode === "square") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
        <div className="max-w-md w-full">
          <p className="text-xs text-amber-400 font-medium tracking-wider uppercase mb-6">
            Square Integration
          </p>
          <h1 className="font-display text-3xl text-white tracking-tight mb-3">
            Connect your Square account
          </h1>
          <p className="text-sm text-zinc-500 mb-10 leading-relaxed">
            We pull your services, hours, and location. Your site will be live
            in under two minutes.
          </p>
          <a
            href="/api/square/connect"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            Connect with Square
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMode("choose")}
            className="block mt-6 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            &larr; Go back
          </button>
        </div>
      </div>
    );
  }

  // Email capture step
  if (mode === "email") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
        <div className="max-w-sm w-full">
          <h1 className="font-display text-2xl text-white tracking-tight mb-2">
            What&apos;s your email?
          </h1>
          <p className="text-sm text-zinc-500 mb-8">
            So we can save your site and send you login details.
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEmailError("");
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailError("Enter a valid email.");
                return;
              }
              setSaving(true);
              try {
                await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, path: `/${nextPath}` }),
                });
              } catch {}
              setSaving(false);
              setMode(nextPath);
            }}
            className="space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              placeholder="you@business.com"
              required
              autoFocus
              className="w-full px-4 py-3 bg-transparent border-b border-zinc-700 text-sm text-white placeholder-zinc-600 outline-none focus:border-white transition-colors"
            />
            {emailError && (
              <p className="text-xs text-red-400">{emailError}</p>
            )}
            <button
              type="submit"
              disabled={!email.includes("@") || saving}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black text-sm font-medium hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors"
            >
              {saving ? "Saving..." : "Continue"}
              {!saving && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <button
            onClick={() => setMode("choose")}
            className="block mt-6 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            &larr; Back
          </button>
        </div>
      </div>
    );
  }

  // Path selection — NOT the icon-in-box card pattern
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="max-w-lg w-full">
        <h1 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-3">
          How do you want to start?
        </h1>
        <p className="text-sm text-zinc-500 mb-12">
          Both paths get you a live website. Pick what fits.
        </p>

        <div className="space-y-4">
          {/* Square path */}
          <button
            onClick={() => {
              setNextPath("square");
              setMode("email");
            }}
            className="w-full flex items-center justify-between px-6 py-5 border-b border-zinc-800 text-left group hover:border-zinc-600 transition-colors"
          >
            <div>
              <h2 className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">
                I use Square
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                We import everything. Two minutes.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
          </button>

          {/* Chat path */}
          <button
            onClick={() => {
              setNextPath("chat");
              setMode("email");
            }}
            className="w-full flex items-center justify-between px-6 py-5 border-b border-zinc-800 text-left group hover:border-zinc-600 transition-colors"
          >
            <div>
              <h2 className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">
                I don&apos;t use Square
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Tell us about your business in a quick chat.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
