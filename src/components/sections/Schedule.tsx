import { Reveal } from "@/components/Reveal";
import { booking, schedule, studio } from "@/content/site";

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
          <div className="mt-16 flex flex-col gap-8 rounded-2xl border border-hairline bg-paper p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <p className="font-serif text-2xl leading-snug md:text-3xl">
                The live schedule lives on Arbox.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
                Every class and every evening — with booking and waitlists handled there.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={booking.href}
                target="_blank"
                rel="noreferrer"
                className="label rounded-full bg-ink px-7 py-4 text-ivory transition-colors hover:bg-night"
              >
                {booking.label}
              </a>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="label text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {studio.instagram}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
