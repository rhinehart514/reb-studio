"use client";

import { useState } from "react";
import { Store, MessageCircle, ArrowRight } from "lucide-react";
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
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-600/10 flex items-center justify-center mx-auto mb-6">
            <Store className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Connect Square
          </h1>
          <p className="text-sm text-zinc-400 mb-8 max-w-sm mx-auto">
            We&apos;ll pull your business name, services, hours, and location
            automatically. Your website will be ready in minutes.
          </p>
          <a
            href="/api/square/connect"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-medium text-white transition-colors"
          >
            <Store className="w-4 h-4" />
            Connect with Square
          </a>
          <button
            onClick={() => setMode("choose")}
            className="block mx-auto mt-4 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // Email capture step
  if (mode === "email") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-3">
              One quick thing
            </h1>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto">
              Enter your email so we can save your progress and send you your
              login details when your site is ready.
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEmailError("");
              if (!email.includes("@") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailError("Please enter a valid email address.");
                return;
              }
              setSaving(true);
              try {
                await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, path: `/${nextPath}` }),
                });
              } catch {
                // Non-blocking — continue even if lead save fails
              }
              setSaving(false);
              setMode(nextPath);
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="you@yourbusiness.com"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#262626] text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-600/50 transition-colors"
              />
              {emailError && (
                <p className="text-xs text-red-400 mt-1.5">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!email.includes("@") || saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-sm font-medium text-white transition-colors"
            >
              {saving ? "Saving..." : "Continue"}
              {!saving && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <button
            onClick={() => setMode("choose")}
            className="block mx-auto mt-4 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Let&apos;s build your website
          </h1>
          <p className="text-zinc-400 text-base max-w-md mx-auto">
            Choose how you&apos;d like to get started. Either way, you&apos;ll
            have a site in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Square path */}
          <button
            onClick={() => {
              setNextPath("square");
              setMode("email");
            }}
            className="group relative overflow-hidden bg-[#141414] border border-[#262626] rounded-xl p-8 text-left hover:border-violet-600/50 transition-all duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center mb-5">
                <Store className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Connect Square</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Already use Square? We&apos;ll import your business info, services,
                hours, and location automatically.
              </p>
              <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                Fastest — 2 minutes
              </span>
            </div>
          </button>

          {/* Chat path */}
          <button
            onClick={() => {
              setNextPath("chat");
              setMode("email");
            }}
            className="group relative overflow-hidden bg-[#141414] border border-[#262626] rounded-xl p-8 text-left hover:border-violet-600/50 transition-all duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-lg font-semibold mb-2">
                Tell us about your business
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                No Square? No problem. Chat with our AI and we&apos;ll build your
                site from what you tell us.
              </p>
              <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                5 minute conversation
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
