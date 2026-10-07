import { Logo } from "@/components/Logo";
import { MoonPhases } from "@/components/MoonPhases";
import { Reveal } from "@/components/Reveal";
import { evenings } from "@/content/site";
import { rich } from "@/lib/rich";

export function Evenings() {
  return (
    <section id="evenings" className="relative overflow-hidden bg-night text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_20%,rgb(124_133_112/0.22),transparent_70%)]"
      />

      <div className="container-x relative grid gap-16 py-24 md:grid-cols-2 md:items-center md:py-36">
        <div>
          <Reveal>
            <p className="label text-ivory/50">{evenings.label}</p>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-light leading-[1.05]">
              {rich(evenings.title)}
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ivory/65">
              {evenings.intro}
            </p>
          </Reveal>

          <ul className="mt-12 max-w-md">
            {evenings.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 90}>
                <li className="flex items-baseline justify-between gap-6 border-t border-ivory/15 py-5">
                  <span className="font-serif text-xl">{item.name}</span>
                  <span className="text-right text-sm text-ivory/55">{item.note}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={280}>
            <a
              href={evenings.cta.href}
              className="label mt-10 inline-flex rounded-full border border-ivory/30 px-6 py-3.5 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-night"
            >
              {evenings.cta.label}
            </a>
          </Reveal>
        </div>

        <Reveal delay={150} className="hidden md:block">
          <div className="relative flex h-[26rem] items-center justify-center">
            <Logo variant="mark" className="h-[24rem] w-auto text-ivory/[0.08]" />
            <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-6">
              <MoonPhases size={22} className="text-ivory" />
              <p className="label text-ivory/40">Sound · Ceremony · Rest</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
