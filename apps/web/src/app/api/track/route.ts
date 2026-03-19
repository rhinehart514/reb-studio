import { NextResponse } from "next/server";

// Simple click tracking — no auth required (public site fires these)
// Stores daily counts in Redis or dev file

export async function POST(req: Request) {
  let event: string, label: string;
  try {
    ({ event, label } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!event) {
    return NextResponse.json({ error: "event required" }, { status: 400 });
  }

  const { trackClick } = await import("@/lib/storage");
  await trackClick(event, label || "");

  return NextResponse.json({ tracked: true });
}

export async function GET() {
  const { getClickStats } = await import("@/lib/storage");
  const stats = await getClickStats(30); // last 30 days
  return NextResponse.json(stats);
}
