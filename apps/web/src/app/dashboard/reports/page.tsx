import { getClickStats, getActivity, getContent } from "@/lib/storage";
import { defaults } from "@/lib/defaults";
import {
  MousePointerClick,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

export default async function ReportsPage() {
  const [clicks, activity, services, testimonials, events, hero, story, contact, settings] =
    await Promise.all([
      getClickStats(30),
      getActivity(),
      getContent("services"),
      getContent("testimonials"),
      getContent("events"),
      getContent("hero"),
      getContent("story"),
      getContent("contact"),
      getContent("settings"),
    ]);

  const last7 = clicks.byDay.filter((d) => {
    const diff = (Date.now() - new Date(d.date).getTime()) / 86400000;
    return diff <= 7;
  });
  const weekClicks = last7.reduce((sum, d) => sum + d.count, 0);
  const monthClicks = clicks.total;

  // Content freshness + completeness checks
  const suggestions: Array<{ text: string; type: "warning" | "tip" | "good" }> = [];

  if (testimonials.testimonials.length === 0) {
    suggestions.push({
      text: "You have no testimonials yet. Ask your 3 best clients for a quick review — social proof is the #1 trust signal for new clients.",
      type: "warning",
    });
  }

  if (!hero.backgroundImageUrl || hero.backgroundImageUrl.includes("unsplash.com")) {
    suggestions.push({
      text: "Your hero image is a stock photo. A real photo of your space or you working would build more trust.",
      type: "tip",
    });
  }

  if (!story.imageUrl) {
    suggestions.push({
      text: "Your About section has no photo. Add a headshot — clients want to see who they're booking with.",
      type: "tip",
    });
  }

  if (!contact.phone) {
    suggestions.push({
      text: "No phone number listed. Some clients prefer to call, especially first-timers.",
      type: "warning",
    });
  }

  if (events.events.length === 0) {
    suggestions.push({
      text: "No upcoming events. If you host workshops or community events, adding them brings return visitors.",
      type: "tip",
    });
  }

  if (JSON.stringify(settings) === JSON.stringify(defaults.settings)) {
    suggestions.push({
      text: "Site settings are still defaults. Update your site name and description for better search results.",
      type: "warning",
    });
  }

  if (services.services.length >= 3 && testimonials.testimonials.length >= 1 && contact.phone && contact.address) {
    suggestions.push({
      text: "Your site has real services, contact info, and testimonials. You're ready to share it!",
      type: "good",
    });
  }

  // Most clicked service
  const topService = Object.entries(clicks.byEvent)
    .filter(([key]) => key === "booking_click")
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-zinc-500">REPORTS</span>
        <h1 className="text-2xl font-semibold tracking-tight text-white mt-1">
          How your site is doing
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Real numbers from real visitors. No fake data.
        </p>
      </div>

      {/* Booking clicks — the money metric */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-[#141414] border border-[#262626] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <MousePointerClick className="w-4 h-4 text-violet-400" />
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              BOOKING CLICKS — THIS WEEK
            </span>
          </div>
          <p className="text-3xl font-semibold font-mono tabular-nums text-white">
            {weekClicks}
          </p>
          <p className="text-xs font-mono text-zinc-600 mt-1">
            {weekClicks === 0
              ? "No clicks yet — share your site to start tracking"
              : `People who clicked Book Now on your site`}
          </p>
        </div>
        <div className="bg-[#141414] border border-[#262626] rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              BOOKING CLICKS — THIS MONTH
            </span>
          </div>
          <p className="text-3xl font-semibold font-mono tabular-nums text-white">
            {monthClicks}
          </p>
          <p className="text-xs font-mono text-zinc-600 mt-1">
            {monthClicks === 0
              ? "Your site is ready — deploy to start tracking"
              : `Total booking link clicks in the last 30 days`}
          </p>
        </div>
      </div>

      {/* Daily breakdown */}
      {clicks.byDay.length > 0 && (
        <div className="bg-[#141414] border border-[#262626] rounded-lg p-5 mb-6">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
            DAILY CLICKS (LAST 30 DAYS)
          </h2>
          <div className="flex items-end gap-1 h-24">
            {Array.from({ length: 30 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (29 - i));
              const day = d.toISOString().split("T")[0];
              const count = clicks.byDay.find((b) => b.date === day)?.count ?? 0;
              const maxCount = Math.max(...clicks.byDay.map((b) => b.count), 1);
              const height = count > 0 ? Math.max(4, (count / maxCount) * 96) : 2;
              return (
                <div
                  key={day}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${height}px`,
                    backgroundColor: count > 0 ? "#7c3aed" : "#1c1c1c",
                  }}
                  title={`${day}: ${count} click${count !== 1 ? "s" : ""}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-mono text-zinc-600">30d ago</span>
            <span className="text-[10px] font-mono text-zinc-600">Today</span>
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div className="bg-[#141414] border border-[#262626] rounded-lg p-5 mb-6">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
          RECENT AI ACTIVITY
        </h2>
        {activity.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No activity yet. Updates will appear here when you use the AI chat to make changes.
          </p>
        ) : (
          <div className="space-y-0">
            {activity.slice(0, 10).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 border-b border-[#1c1c1c] last:border-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                <p className="text-sm text-zinc-300 flex-1">{item.text}</p>
                <span className="text-[10px] font-mono text-zinc-600 shrink-0">
                  {new Date(item.time).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content suggestions — proactive */}
      <div className="bg-[#141414] border border-[#262626] rounded-lg p-5">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
          SUGGESTIONS
        </h2>
        {suggestions.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Looking good! No suggestions right now.
          </p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                {s.type === "warning" ? (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : s.type === "good" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                )}
                <p className="text-sm text-zinc-300">{s.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
