import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { philosophy } from "@/content/site";

export function Philosophy() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Logo variant="mark" className="h-10 w-auto text-ink/70" />
          <blockquote className="mt-10 font-serif text-[clamp(1.75rem,3.8vw,2.9rem)] font-light leading-[1.25]">
            “{philosophy.quote}”
          </blockquote>
          <p className="label mt-8 text-stone">{philosophy.attribution}</p>
        </Reveal>
      </div>
    </section>
  );
}
