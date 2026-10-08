import type { Metadata } from "next";
import { SessionList } from "@/components/SessionList";
import { booking, schedule } from "@/content/site";
import { getUpcomingSessions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming yoga, pilates and sound sessions at Moonrise studio in Tel Aviv.",
};

export default async function SchedulePage() {
  const upcoming = await getUpcomingSessions(80);

  return (
    <main className="container-x min-h-[70svh] py-36">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label text-stone">{schedule.label}</p>
          <h1 className="mt-6 font-serif text-[clamp(2.5rem,5.5vw,3.75rem)] font-light leading-[1.05]">
            {schedule.title}
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-stone md:text-right">
          {schedule.note}
        </p>
      </div>

      <div className="mt-16">
        <SessionList
          sessions={upcoming}
          empty="No sessions are scheduled right now — check back soon."
        />
      </div>

      <div className="mt-14">
        <a
          href={booking.href}
          className="label inline-flex rounded-full bg-ink px-7 py-4 text-ivory transition-colors hover:bg-night"
        >
          {booking.label}
        </a>
      </div>
    </main>
  );
}
