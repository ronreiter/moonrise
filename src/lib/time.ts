export const STUDIO_TIME_ZONE = "Asia/Jerusalem";

function tzOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) {
    parts[part.type] = part.value;
  }
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return asUTC - date.getTime();
}

/** Converts studio-local date (YYYY-MM-DD) and time (HH:mm) to a UTC instant. */
export function studioDateToUtc(date: string, time: string): Date | null {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null;
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const offset = tzOffsetMs(new Date(guess), STUDIO_TIME_ZONE);
  return new Date(guess - offset);
}

function partsInStudio(iso: string, options: Intl.DateTimeFormatOptions) {
  const parts: Record<string, string> = {};
  for (const part of new Intl.DateTimeFormat("en-GB", {
    timeZone: STUDIO_TIME_ZONE,
    ...options,
  }).formatToParts(new Date(iso))) {
    parts[part.type] = part.value;
  }
  return parts;
}

export function formatStudioDay(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: STUDIO_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(iso));
}

export function formatStudioTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: STUDIO_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export function studioDayKey(iso: string): string {
  const parts = partsInStudio(iso, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function studioDateInput(iso: string): string {
  return studioDayKey(iso);
}

export function studioTimeInput(iso: string): string {
  const parts = partsInStudio(iso, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${parts.hour}:${parts.minute}`;
}
