import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";

// Placeholder client data — will be replaced with real data from a clients store
const DEMO_CLIENTS = [
  {
    id: "rohlax",
    name: "Rohlax Wellness",
    site: "rohlaxwellness.com",
    status: "active" as const,
    mrr: 199,
    lastActive: "2 hours ago",
  },
];

function StatusBadge({ status }: { status: "active" | "building" | "inactive" }) {
  const styles = {
    active: { bg: "rgba(124,154,142,0.1)", color: "var(--sage)", label: "Active" },
    building: { bg: "rgba(124,58,237,0.1)", color: "#7c3aed", label: "Building" },
    inactive: { bg: "rgba(138,125,110,0.1)", color: "var(--bark-faded)", label: "Inactive" },
  };
  const s = styles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.625rem] font-bold uppercase tracking-wider"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}

export default function ClientsPage() {
  return (
    <div className="p-6 md:p-8" style={{ background: "var(--cream)" }}>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display tracking-tight" style={{ color: "var(--bark)" }}>
              Clients
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--bark-faded)" }}>
              {DEMO_CLIENTS.length} active {DEMO_CLIENTS.length === 1 ? "client" : "clients"}
            </p>
          </div>
        </div>

        {/* Client table */}
        <div className="bg-white rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--cream-dark)" }}>
                  <th className="text-left px-5 py-3 text-[0.625rem] font-bold uppercase tracking-wider" style={{ color: "var(--bark-faded)" }}>
                    Business
                  </th>
                  <th className="text-left px-5 py-3 text-[0.625rem] font-bold uppercase tracking-wider" style={{ color: "var(--bark-faded)" }}>
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-[0.625rem] font-bold uppercase tracking-wider" style={{ color: "var(--bark-faded)" }}>
                    MRR
                  </th>
                  <th className="text-left px-5 py-3 text-[0.625rem] font-bold uppercase tracking-wider" style={{ color: "var(--bark-faded)" }}>
                    Last Active
                  </th>
                  <th className="text-right px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {DEMO_CLIENTS.map((client) => (
                  <tr
                    key={client.id}
                    className="group hover:bg-[var(--cream-dark)]/30 transition-colors"
                    style={{ borderBottom: "1px solid var(--cream-dark)" }}
                  >
                    <td className="px-5 py-4">
                      <div>
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="font-medium hover:opacity-70 transition-opacity"
                          style={{ color: "var(--bark)" }}
                        >
                          {client.name}
                        </Link>
                        <p className="text-xs mt-0.5" style={{ color: "var(--bark-faded)" }}>
                          {client.site}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-5 py-4 font-mono" style={{ color: "var(--bark)" }}>
                      ${client.mrr}/mo
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--bark-faded)" }}>
                      {client.lastActive}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-60"
                        style={{ color: "var(--sage)" }}
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state hint */}
        {DEMO_CLIENTS.length <= 1 && (
          <div
            className="mt-6 rounded-xl p-6 text-center"
            style={{ background: "var(--cream-dark)" }}
          >
            <Users className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--bark-faded)" }} />
            <p className="text-sm font-medium" style={{ color: "var(--bark)" }}>
              Growing your client list
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--bark-faded)" }}>
              New clients who sign up through the landing page will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
