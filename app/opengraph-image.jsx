import { ImageResponse } from "next/og";

// OG-Share-Bild im Look der Case-Seite (schwarz + Getsafe-Grün).
// Wird von Next automatisch als og:image und twitter:image registriert.

export const alt =
  "Growth-Case Krankenversicherung – Bewerbungsarbeit Norbert Sommer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#111210",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#7CE0B3",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#12B76A",
            }}
          />
          Bewerbungsarbeit · Growth Creative
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            marginBottom: 32,
          }}
        >
          Ich habe kein Anschreiben geschrieben. Ich habe euren Health-Funnel
          gebaut.
        </div>
        <div style={{ fontSize: 30, color: "#C9CCC9" }}>
          Zwei klickbare Kampagnen-Demos · Norbert Sommer
        </div>
      </div>
    ),
    size
  );
}
