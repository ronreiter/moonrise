import { bookingHref } from "@/content/site";
import type { ScheduledSession } from "@/lib/data";
import { getSessionType } from "@/lib/session-types";
import { formatStudioDay, formatStudioTime, studioDayKey } from "@/lib/time";

export function SessionList({
  sessions,
  empty,
  showReserve = true,
}: {
  sessions: ScheduledSession[];
  empty: string;
  showReserve?: boolean;
}) {
  if (sessions.length === 0) {
    return <p className="py-10 text-sm text-stone">{empty}</p>;
  }

  const groups = new Map<string, ScheduledSession[]>();
  for (const session of sessions) {
    const key = studioDayKey(session.startsAt);
    const list = groups.get(key);
    if (list) {
      list.push(session);
    } else {
      groups.set(key, [session]);
    }
  }

  return (
    <div className="border-t border-hairline">
      {[...groups.values()].map((day) => (
        <div
          key={studioDayKey(day[0].startsAt)}
          className="grid gap-x-10 border-b border-hairline py-8 md:grid-cols-[9rem_1fr] md:py-10"
        >
          <p className="label pt-1 text-stone">{formatStudioDay(day[0].startsAt)}</p>
          <div className="mt-5 md:mt-0">
            {day.map((session) => {
              const type = getSessionType(session.typeId);
              const name = type?.name ?? session.typeId;
              return (
                <div
                  key={session.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-3 first:pt-0 last:border-none last:pb-0"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="w-12 shrink-0 text-sm tabular-nums text-stone">
                      {formatStudioTime(session.startsAt)}
                    </span>
                    <span
                      className={`font-serif text-xl leading-snug ${
                        session.status === "cancelled" ? "text-stone/60 line-through" : ""
                      }`}
                    >
                      {name}
                    </span>
                    {session.note ? <span className="label text-stone/60">{session.note}</span> : null}
                  </div>
                  <div className="flex items-baseline gap-6">
                    {session.teacherName ? (
                      <span className="text-sm text-stone">{session.teacherName}</span>
                    ) : null}
                    {showReserve && session.status === "scheduled" ? (
                      <a
                        href={bookingHref(`Booking — ${name}, ${formatStudioDay(session.startsAt)}`)}
                        className="label text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        Reserve
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
