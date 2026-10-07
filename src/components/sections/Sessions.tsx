import { Reveal } from "@/components/Reveal";
import { bookingHref, sessions } from "@/content/site";

export function Sessions() {
  return (
    <section id="sessions" className="border-y border-hairline bg-paper py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label text-stone">Sessions</p>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-light leading-[1.05]">
              Eleven ways to <em className="italic">arrive</em>.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-stone md:text-right">
              Mats, props and tea are always provided. All levels welcome — no experience
              required.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session, index) => (
            <Reveal key={session.number} delay={(index % 3) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-ivory p-7 transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_18px_40px_-24px_rgb(28_26_22/0.4)]">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label text-stone/60">{session.number}</span>
                  <span className="label text-right text-stone/70">{session.meta}</span>
                </div>
                <h3 className="mt-6 font-serif text-[1.65rem] leading-tight">{session.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{session.description}</p>
                <div className="mt-auto pt-8">
                  <a
                    href={bookingHref(`Booking — ${session.name}`)}
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink"
                  >
                    <span className="underline decoration-clay decoration-1 underline-offset-8 transition-colors group-hover/link:decoration-ink">
                      Reserve a spot
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
