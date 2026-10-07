type MoonPhasesProps = {
  className?: string;
  size?: number;
};

const PHASES = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];

function moonPath(cx: number, cy: number, r: number, phase: number) {
  const illuminated = phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
  if (illuminated <= 0.02) return null;
  if (illuminated >= 0.98) return undefined;

  const a = r * (2 * illuminated - 1);
  const litRight = phase < 0.5;
  const outerSweep = litRight ? 1 : 0;
  const innerSweep = litRight ? (a > 0 ? 1 : 0) : a > 0 ? 0 : 1;

  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
    `A ${Math.abs(a)} ${r} 0 0 ${innerSweep} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

function Moon({ size, phase }: { size: number; phase: number }) {
  const r = size / 2 - 1;
  const c = size / 2;
  const path = moonPath(c, c, r, phase);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={c} cy={c} r={r} fill="currentColor" opacity={0.14} />
      {path ? <path d={path} fill="currentColor" opacity={0.85} /> : null}
      {path === undefined ? <circle cx={c} cy={c} r={r} fill="currentColor" opacity={0.85} /> : null}
    </svg>
  );
}

export function MoonPhases({ className, size = 16 }: MoonPhasesProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`} aria-hidden="true">
      {PHASES.map((phase) => (
        <Moon key={phase} size={size} phase={phase} />
      ))}
    </div>
  );
}
