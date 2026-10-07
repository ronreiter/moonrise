import { Logo } from "@/components/Logo";
import { MoonPhases } from "@/components/MoonPhases";
import { hero } from "@/content/site";
import { rich } from "@/lib/rich";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_82%_8%,rgb(183_165_140/0.22),transparent_70%),radial-gradient(55%_45%_at_10%_90%,rgb(124_133_112/0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 -z-10 text-ink/[0.05] md:-right-10 md:top-16"
      >
        <Logo variant="mark" className="animate-drift h-[22rem] w-auto md:h-[34rem]" />
      </div>

      <div className="container-x flex min-h-[92svh] flex-col justify-center pb-16 pt-36 md:pb-24 md:pt-48">
        <p className="label flex items-center gap-4 text-stone">
          <span className="h-px w-8 bg-clay" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-8 max-w-4xl font-serif text-[clamp(3rem,9vw,6.75rem)] font-light leading-[0.98] tracking-[-0.01em]">
          {rich(hero.title)}
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
          {hero.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={hero.primaryCta.href}
            className="label rounded-full bg-ink px-7 py-4 text-ivory transition-colors duration-300 hover:bg-night"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            <span className="underline decoration-clay decoration-1 underline-offset-8 transition-colors group-hover/link:decoration-ink">
              {hero.secondaryCta.label}
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div className="mt-16 flex items-center justify-between md:mt-24">
          <MoonPhases size={16} className="text-ink" />
          <p className="label hidden text-stone/60 sm:block">Scroll</p>
        </div>
      </div>
    </section>
  );
}
