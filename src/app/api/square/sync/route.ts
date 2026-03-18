import { NextResponse } from "next/server";
import { getAuthToken, verifyToken } from "@/lib/auth";
import { getSquareTokenData, setSquareTokenData, logActivity } from "@/lib/storage";
import { isTokenExpired, refreshAccessToken, performSquareSync } from "@/lib/square";

export async function POST() {
  // Auth check
  const token = await getAuthToken();
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tokenData = await getSquareTokenData();
  if (!tokenData?.accessToken) {
    return NextResponse.json(
      { error: "Square not connected. Visit /api/square/connect to authorize." },
      { status: 400 }
    );
  }

  let { accessToken } = tokenData;

  // Refresh token if expired (or about to expire)
  if (tokenData.expiresAt && isTokenExpired(tokenData.expiresAt)) {
    if (!tokenData.refreshToken) {
      return NextResponse.json(
        { error: "Square token expired and no refresh token available. Please reconnect." },
        { status: 401 }
      );
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
      console.error("Square token refresh failed:", err);
      return NextResponse.json(
        { error: "Square token refresh failed. Please reconnect." },
        { status: 401 }
      );
    }
  }

  try {
    const syncResult = await performSquareSync(accessToken);

    await logActivity({
      text: `Square sync: ${syncResult.results.join(", ") || "no changes"}`,
      time: new Date().toISOString(),
      type: "integration",
    });

    return NextResponse.json({
      success: true,
      synced: syncResult.results,
      itemCount: syncResult.itemCount,
      locationCount: syncResult.locationCount,
    });
  } catch (err) {
    console.error("Square sync error:", err);
    return NextResponse.json(
      { error: "Sync failed. Check server logs." },
      { status: 500 }
    );
  }
}
