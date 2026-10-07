import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { about } from "@/content/site";
import { rich } from "@/lib/rich";

export function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="label text-stone">{about.label}</p>
            <Logo variant="mark" className="mt-6 h-12 w-auto text-ink/80" />
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-light leading-[1.05]">
              {rich(about.title)}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 max-w-2xl space-y-6">
              <p className="text-xl font-light leading-relaxed text-ink md:text-2xl">
                {about.paragraphs[0]}
              </p>
              <p className="text-base leading-relaxed text-stone">{about.paragraphs[1]}</p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-3">
            {about.principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 100}>
                <p className="label text-stone/60">{principle.number}</p>
                <h3 className="mt-4 font-serif text-2xl">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
