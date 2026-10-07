import { Reveal } from "@/components/Reveal";
import { UiIcon } from "@/components/icons";
import { studio, visit } from "@/content/site";
import { rich } from "@/lib/rich";

export function Visit() {
  return (
    <section id="visit" className="border-t border-hairline bg-paper py-24 md:py-36">
      <div className="container-x grid gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="label text-stone">{visit.label}</p>
            <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-light leading-[1.05]">
              {rich(visit.title)}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-8 flex items-center gap-3 font-serif text-2xl">
  <UiIcon name="pin" className="h-5 w-5 text-stone" />
  {visit.area}
</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
              {visit.addressNote}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="label mt-12 text-stone/60">{visit.contactLabel}</p>
            <ul className="mt-2">
              {visit.rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <span className="flex items-center gap-2.5 text-stone">
  <UiIcon name={row.icon} className="h-4 w-4" />
  <span className="label">{row.label}</span>
</span>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                      className="font-serif text-lg underline-offset-4 transition-colors hover:underline"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="font-serif text-lg">{row.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <p className="label mt-12 flex items-center gap-2.5 text-stone/60">
  <UiIcon name="clock" className="h-4 w-4" />
  {visit.hoursLabel}
</p>
            <ul className="mt-2">
              {studio.hours.map((row) => (
                <li
                  key={row.days}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <span className="label text-stone">{row.days}</span>
                  <span className="text-sm text-ink">{row.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative h-full min-h-[26rem] overflow-hidden rounded-2xl border border-hairline bg-ivory">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full text-ink/[0.08]"
              viewBox="0 0 400 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((radius) => (
                  <circle key={radius} cx="200" cy="250" r={radius / 2} />
                ))}
                <line x1="200" y1="0" x2="200" y2="500" />
                <line x1="0" y1="250" x2="400" y2="250" />
              </g>
              <g fill="currentColor">
                <circle cx="200" cy="250" r="4" opacity="0.9" />
                <circle cx="260" cy="180" r="2" />
                <circle cx="140" cy="320" r="2" />
                <circle cx="300" cy="300" r="1.5" />
              </g>
            </svg>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
              <div>
                <p className="label text-stone/70">Studio</p>
                <p className="mt-2 font-serif text-2xl">{studio.area}</p>
              </div>
              <p className="label text-right text-stone/60">
                Directions
                <br />
                on booking
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
