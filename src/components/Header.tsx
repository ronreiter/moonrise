"use client";

import { Suspense, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { UiIcon } from "@/components/icons";
import { HeaderAuth } from "@/components/auth/HeaderAuth";
import { booking, nav, studio } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-hairline bg-ivory/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            aria-label="Moonrise — home"
            className="relative z-50 text-ink"
            onClick={() => setOpen(false)}
          >
            <Logo className="h-9 w-auto md:h-11" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
<Suspense fallback={null}>
            <HeaderAuth />
          </Suspense>
            <a
              href={booking.href}
              className="label rounded-full border border-ink px-5 py-2.5 text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              Book
            </a>
          </nav>

          <button
            type="button"
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ivory transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex min-h-full flex-col justify-between pb-10 pt-10">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-baseline gap-5 border-b border-hairline py-5 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
              >
                <span className="label text-stone/70">0{index + 1}</span>
                <span className="font-serif text-3xl">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-12 flex flex-col gap-5">
            <a
              href={booking.href}
              onClick={() => setOpen(false)}
              className="label inline-flex w-fit rounded-full bg-ink px-6 py-3.5 text-ivory"
            >
              {booking.label}
            </a>
<div className="mt-8 border-t border-hairline pt-8">
              <Suspense fallback={null}>
                <HeaderAuth variant="mobile" />
              </Suspense>
            </div>
                        <div className="flex flex-col gap-2.5 text-sm text-stone">
              <a href={`mailto:${studio.email}`} className="flex items-center gap-2.5 hover:text-ink">
                <UiIcon name="mail" className="h-4 w-4" />
                {studio.email}
              </a>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-ink"
              >
                <UiIcon name="instagram" className="h-4 w-4" />
                {studio.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
