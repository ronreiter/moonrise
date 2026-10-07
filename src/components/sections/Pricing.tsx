import { Reveal } from "@/components/Reveal";
import { bookingHref, pricing } from "@/content/site";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-y border-hairline bg-sand/40 py-24 md:py-36"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label text-stone">{pricing.label}</p>
            <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-light leading-[1.05]">
              {pricing.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-stone md:text-right">
              {pricing.note}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pricing.options.map((option, index) => (
            <Reveal key={option.name} delay={index * 90} className="h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border p-8 ${
                  option.featured
                    ? "border-ink bg-ink text-ivory"
                    : "border-hairline bg-ivory"
                }`}
              >
                <p className={`label ${option.featured ? "text-ivory/60" : "text-stone"}`}>
                  {option.name}
                </p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-sans text-4xl font-medium tracking-tight">
                    {option.price}
                  </span>
                  {option.per ? (
                    <span
                      className={`text-sm ${option.featured ? "text-ivory/60" : "text-stone"}`}
                    >
                      {option.per}
                    </span>
                  ) : null}
                </p>
                <p
                  className={`mt-5 text-sm leading-relaxed ${
                    option.featured ? "text-ivory/70" : "text-stone"
                  }`}
                >
                  {option.description}
                </p>
                <div className="mt-auto pt-8">
                  <a
                    href={bookingHref(`${option.name} — Moonrise`)}
                    className={`label inline-flex rounded-full px-6 py-3.5 transition-colors duration-300 ${
                      option.featured
                        ? "bg-ivory text-night hover:bg-sand"
                        : "border border-ink text-ink hover:bg-ink hover:text-ivory"
                    }`}
                  >
                    {option.cta}
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
