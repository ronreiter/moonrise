import type { ComponentType } from "react";
import {
  AudioWaveform,
  Baby,
  Bell,
  Clock,
  Coffee,
  Flame,
  Mail,
  MapPin,
  Moon,
  MoonStar,
  PersonStanding,
  Phone,
  StretchHorizontal,
  Waves,
  Wind,
} from "lucide-react";
import type { SessionIconName, UiIconName } from "@/content/site";

type GlyphProps = {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
};

function InstagramGlyph({ className, strokeWidth = 1.5 }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const sessionIcons: Record<SessionIconName, ComponentType<GlyphProps>> = {
  wind: Wind,
  stretch: StretchHorizontal,
  standing: PersonStanding,
  waves: Waves,
  flame: Flame,
  moon: Moon,
  moonStar: MoonStar,
  bell: Bell,
  waveform: AudioWaveform,
  coffee: Coffee,
  baby: Baby,
};

const uiIcons: Record<UiIconName, ComponentType<GlyphProps>> = {
  mail: Mail,
  instagram: InstagramGlyph,
  phone: Phone,
  pin: MapPin,
  clock: Clock,
};

export function SessionIcon({
  name,
  className,
  strokeWidth = 1.5,
}: GlyphProps & { name: SessionIconName }) {
  const Glyph = sessionIcons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function UiIcon({
  name,
  className,
  strokeWidth = 1.5,
}: GlyphProps & { name: UiIconName }) {
  const Glyph = uiIcons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
