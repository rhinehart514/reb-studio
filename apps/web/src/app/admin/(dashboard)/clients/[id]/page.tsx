import Link from "next/link";
import { ArrowLeft, Globe, MessageCircle, Settings } from "lucide-react";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6 md:p-8" style={{ background: "var(--cream)" }}>
      <div className="max-w-5xl">
        {/* Back link */}
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-1.5 text-sm mb-4 transition-opacity hover:opacity-60"
          style={{ color: "var(--bark-faded)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Clients
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display tracking-tight" style={{ color: "var(--bark)" }}>
              Client: {id}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--bark-faded)" }}>
              Manage this client&apos;s site, content, and settings.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono" style={{ color: "var(--bark-faded)" }}>Active</span>
          </div>
        </div>

        {/* Quick actions grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-xl p-6 flex flex-col items-start gap-3"
            style={{ background: "white", border: "1px solid var(--cream-dark)" }}
          >
            <Globe className="w-5 h-5" style={{ color: "var(--sage)" }} />
            <div>
              <h3 className="text-sm font-medium" style={{ color: "var(--bark)" }}>Site Preview</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--bark-faded)" }}>View the live client site</p>
            </div>
            <Link
              href="/preview"
              target="_blank"
              className="text-[0.625rem] font-bold uppercase tracking-wider mt-auto"
              style={{ color: "var(--sage)" }}
            >
              Open Site &rarr;
            </Link>
          </div>

          <div
            className="rounded-xl p-6 flex flex-col items-start gap-3"
            style={{ background: "white", border: "1px solid var(--cream-dark)" }}
          >
            <MessageCircle className="w-5 h-5" style={{ color: "var(--sage)" }} />
            <div>
              <h3 className="text-sm font-medium" style={{ color: "var(--bark)" }}>Chat History</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--bark-faded)" }}>View AI conversation log</p>
            </div>
            <Link
              href="/dashboard/chat"
              className="text-[0.625rem] font-bold uppercase tracking-wider mt-auto"
              style={{ color: "var(--sage)" }}
            >
              View Chat &rarr;
            </Link>
          </div>

          <div
            className="rounded-xl p-6 flex flex-col items-start gap-3"
            style={{ background: "white", border: "1px solid var(--cream-dark)" }}
          >
            <Settings className="w-5 h-5" style={{ color: "var(--sage)" }} />
            <div>
              <h3 className="text-sm font-medium" style={{ color: "var(--bark)" }}>Square Status</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--bark-faded)" }}>Connection and sync status</p>
            </div>
            <span className="text-[0.625rem] font-bold uppercase tracking-wider mt-auto" style={{ color: "var(--bark-faded)" }}>
              Not Connected
            </span>
          </div>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: "var(--cream-dark)" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--bark-faded)" }}>
            Site Content
          </h2>
          <p className="text-sm" style={{ color: "var(--bark-light)" }}>
            Content management for this client is available through the admin section editors
            and the client&apos;s AI chat dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
