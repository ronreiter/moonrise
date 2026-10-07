import { ImageResponse } from "next/og";
import { LOGO_LOCKUP_PATH, LOGO_LOCKUP_VIEWBOX } from "@/content/logoPaths";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Moonrise — Yoga, Pilates & Sound, Tel Aviv";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f6f2e9",
          color: "#1c1a16",
        }}
      >
        <svg viewBox={LOGO_LOCKUP_VIEWBOX} width={400} height={316}>
          <path d={LOGO_LOCKUP_PATH} fill="#1c1a16" fillRule="evenodd" />
        </svg>
        <div
          style={{
            marginTop: 56,
            fontSize: 24,
            letterSpacing: "0.32em",
            color: "#7d7466",
          }}
        >
          YOGA · PILATES · SOUND — TEL AVIV
        </div>
      </div>
    ),
    { ...size },
  );
}
