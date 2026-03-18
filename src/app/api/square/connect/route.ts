import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOAuthUrl } from "@/lib/square";

export async function GET() {
  try {
    // Generate random state for CSRF protection
    const state = crypto.randomUUID();

    // Store state in a cookie so we can verify on callback
    const cookieStore = await cookies();
    cookieStore.set("square_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    const authUrl = getOAuthUrl(state);
    return NextResponse.redirect(authUrl);
  } catch (err) {
    console.error("Square connect error:", err);
    return NextResponse.redirect(
      new URL("/dashboard?error=square_connect_failed", process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000")
    );
  }
}
