import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SessionList } from "@/components/SessionList";
import { booking, schedule } from "@/content/site";
import { getUpcomingSessions } from "@/lib/data";

export async function Schedule() {
  const sessions = await getUpcomingSessions(6);

  return (
    <section id="schedule" className="py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label text-stone">{schedule.label}</p>
            <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-light leading-[1.05]">
              {schedule.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-sm text-sm leading-relaxed text-stone md:text-right">
              {schedule.note}
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-16" id="upcoming">
            <SessionList
              sessions={sessions}
              empty="No sessions are scheduled right now — check back soon."
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link
              href="/schedule"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="underline decoration-clay decoration-1 underline-offset-8 transition-colors group-hover/link:decoration-ink">
                See the full schedule
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href={booking.href}
              className="label rounded-full bg-ink px-7 py-4 text-ivory transition-colors hover:bg-night"
            >
              {booking.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
