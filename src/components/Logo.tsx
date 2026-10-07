import {
  LOGO_LOCKUP_PATH,
  LOGO_LOCKUP_VIEWBOX,
  LOGO_MARK_PATH,
  LOGO_MARK_VIEWBOX,
} from "@/content/logoPaths";

type LogoProps = {
  className?: string;
  variant?: "lockup" | "mark";
};

export function Logo({ className, variant = "lockup" }: LogoProps) {
  const isMark = variant === "mark";

  return (
    <svg
      viewBox={isMark ? LOGO_MARK_VIEWBOX : LOGO_LOCKUP_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={isMark ? LOGO_MARK_PATH : LOGO_LOCKUP_PATH}
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
