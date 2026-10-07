import { Logo } from "@/components/Logo";
import { UiIcon } from "@/components/icons";
import { booking, footer, nav, studio } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-night text-ivory/75">
      <div className="container-x pb-10 pt-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label="Moonrise — home" className="inline-block text-ivory">
              <Logo className="h-12 w-auto" />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">{footer.tagline}</p>
            <a
              href={booking.href}
              className="label mt-8 inline-flex rounded-full border border-ivory/30 px-5 py-2.5 text-ivory transition-colors hover:bg-ivory hover:text-night"
            >
              {booking.label}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="label text-ivory/50">{footer.exploreLabel}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-ivory">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-ivory/50">{footer.contactLabel}</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <UiIcon name="mail" className="h-3.5 w-3.5 shrink-0 text-ivory/50" />
                <a href={`mailto:${studio.email}`} className="transition-colors hover:text-ivory">
                  {studio.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <UiIcon name="instagram" className="h-3.5 w-3.5 shrink-0 text-ivory/50" />
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ivory"
                >
                  {studio.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <UiIcon name="phone" className="h-3.5 w-3.5 shrink-0 text-ivory/50" />
                {studio.whatsapp}
              </li>
              <li className="flex items-center gap-2.5">
                <UiIcon name="pin" className="h-3.5 w-3.5 shrink-0 text-ivory/50" />
                {studio.area}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Moonrise TLV</p>
          <p>{footer.note}</p>
          <a href="#top" className="transition-colors hover:text-ivory">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
