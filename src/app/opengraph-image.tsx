import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "REB Studio — AI-Powered Websites for Local Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            REB
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 24,
            }}
          >
            Your site works while you sleep
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#a1a1aa",
              maxWidth: 600,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            AI-powered websites for local businesses. $49 to start.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 14, color: "#52525b" }}>
            Built in Buffalo, NY
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
