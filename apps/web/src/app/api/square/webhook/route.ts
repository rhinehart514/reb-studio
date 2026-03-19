import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, isTokenExpired, refreshAccessToken, performSquareSync } from "@/lib/square";
import { getSquareTokenData, setSquareTokenData, logActivity } from "@/lib/storage";

const SYNC_EVENT_TYPES = [
  "catalog.version.updated",
  "location.updated",
];

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";
  // Use configured URL for signature verification — request.url may differ behind reverse proxy
  const url = `${process.env.NEXT_PUBLIC_URL || request.url.split("/api/")[0]}/api/square/webhook`;

  // Verify webhook signature
  if (!(await verifyWebhookSignature(body, signature, url))) {
    console.error("Square webhook: invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { type?: string };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.type ?? "";
  console.log(`Square webhook received: ${eventType}`);

  // Only re-sync for relevant event types
  if (!SYNC_EVENT_TYPES.includes(eventType)) {
    return NextResponse.json({ received: true });
  }

  // Get token data
  const tokenData = await getSquareTokenData();
  if (!tokenData?.accessToken) {
    console.error("Square webhook: no access token stored, skipping sync");
    return NextResponse.json({ received: true, synced: false });
  }

  let { accessToken } = tokenData;

  // Refresh token if expired
  if (tokenData.expiresAt && isTokenExpired(tokenData.expiresAt)) {
    if (!tokenData.refreshToken) {
      console.error("Square webhook: token expired and no refresh token available");
      return NextResponse.json({ received: true, synced: false });
    }

    try {
      const refreshed = await refreshAccessToken(tokenData.refreshToken);
      await setSquareTokenData({
        accessToken: refreshed.accessToken,
        refreshToken: refreshed.refreshToken,
        expiresAt: refreshed.expiresAt,
      });
      accessToken = refreshed.accessToken;
    } catch (err) {
      console.error("Square webhook: token refresh failed:", err);
      return NextResponse.json({ received: true, synced: false });
    }
  }

  try {
    await performSquareSync(accessToken);

    await logActivity({
      text: `Square auto-sync triggered by ${eventType}`,
      time: new Date().toISOString(),
      type: "integration",
    });

    return NextResponse.json({ received: true, synced: true });
  } catch (err) {
    console.error("Square webhook sync error:", err);
    return NextResponse.json({ received: true, synced: false, error: "sync_failed" });
  }
}
