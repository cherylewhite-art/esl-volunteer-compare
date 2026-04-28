import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "ESLVolunteerFinder";
  const sub =
    searchParams.get("sub") ??
    "Compare ESL volunteer programs abroad — independent, no paid placements";

  const titleSize = title.length > 45 ? "48px" : title.length > 30 ? "54px" : "62px";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f766e",
          padding: "60px 64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: "800",
              color: "#0f766e",
              letterSpacing: "-0.5px",
            }}
          >
            ESL
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            ESLVolunteerFinder
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: "700",
              color: "white",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.72)",
              fontWeight: "400",
              lineHeight: "1.4",
              maxWidth: "900px",
            }}
          >
            {sub}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "18px" }}>
            eslvolunteerfinder.com
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.12)",
              padding: "8px 18px",
              borderRadius: "100px",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "15px",
              }}
            >
              Independent · Zero paid placements
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
