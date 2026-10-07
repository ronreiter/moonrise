import { Reveal } from "@/components/Reveal";
import { bookingHref, schedule } from "@/content/site";

export function Schedule() {
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
          <div className="mt-16 border-t border-hairline">
            {schedule.days.map((day) => (
              <div
                key={day.day}
                className="grid gap-x-10 border-b border-hairline py-8 md:grid-cols-[9rem_1fr] md:py-10"
              >
                <p className="label pt-1 text-stone">{day.day}</p>
                <div className="mt-5 md:mt-0">
                  {day.classes.length > 0 ? (
                    day.classes.map((item) => (
                      <div
                        key={`${item.time}-${item.name}`}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-3 first:pt-0 last:border-none last:pb-0"
                      >
                        <div className="flex items-baseline gap-5">
                          <span className="w-12 shrink-0 text-sm tabular-nums text-stone">
                            {item.time}
                          </span>
                          <span className="font-serif text-xl leading-snug">{item.name}</span>
                          {item.note ? (
                            <span className="label text-stone/60">{item.note}</span>
                          ) : null}
                        </div>
                        <a
                          href={bookingHref(`Booking — ${item.name}, ${day.day} ${item.time}`)}
                          className="label text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
                        >
                          Reserve
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone">{day.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
