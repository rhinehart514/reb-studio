import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForToken, performSquareSync } from "@/lib/square";
import { setSquareTokenData, logActivity } from "@/lib/storage";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  try {
    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      console.error("Square OAuth error:", error);
      return NextResponse.redirect(
        new URL(`/dashboard?error=square_denied`, baseUrl)
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL(`/dashboard?error=square_missing_params`, baseUrl)
      );
    }

    // Verify CSRF state
    const cookieStore = await cookies();
    const savedState = cookieStore.get("square_oauth_state")?.value;
    cookieStore.delete("square_oauth_state");

    if (!savedState || savedState !== state) {
      console.error("Square OAuth state mismatch");
      return NextResponse.redirect(
        new URL(`/dashboard?error=square_state_mismatch`, baseUrl)
      );
    }

    // Exchange code for tokens (access + refresh + expiry)
    const tokenData = await exchangeCodeForToken(code);
    await setSquareTokenData({
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresAt: tokenData.expiresAt,
    });

    // Trigger initial sync (merge, don't overwrite)
    try {
      const syncResult = await performSquareSync(tokenData.accessToken);

      await logActivity({
        text: `Square connected — ${syncResult.results.join(", ") || "no services found"}`,
        time: new Date().toISOString(),
        type: "integration",
      });
    } catch (syncErr) {
      console.error("Initial Square sync failed:", syncErr);
      // Connection succeeded even if sync partially failed
    }

    // Check if user came from onboarding flow (state cookie includes origin)
    const fromOnboarding = savedState?.startsWith("onboard_");
    const redirectPath = fromOnboarding
      ? "/get-started?success=square_connected"
      : "/dashboard?success=square_connected";

    return NextResponse.redirect(new URL(redirectPath, baseUrl));
  } catch (err) {
    console.error("Square callback error:", err);
    return NextResponse.redirect(
      new URL(`/dashboard?error=square_callback_failed`, baseUrl)
    );
  }
}
