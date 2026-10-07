# Moonrise — moonrisetlv.com

Website for **Moonrise**, a yoga, pilates and sound studio in Tel Aviv.
Single, elegant page: hero, studio, sessions, evenings, schedule, pricing, visit.

Built with Next.js (App Router, Turbopack) and Tailwind CSS v4. All content is
in one file, static-first, no trackers, no cookie banners.

## Editing content

Everything the visitor reads lives in `src/content/site.ts` —
session names and descriptions, the weekly schedule, prices, contact details and
footer copy. Edit the file, save, and the site updates. No component changes needed.

**Placeholders to replace before launch:**

| Where | Current placeholder |
| --- | --- |
| `studio.email` | `hello@moonrisetlv.com` |
| `studio.instagram` / `studio.instagramUrl` | `@moonrisetlv` |
| `studio.whatsapp` | `+972 50-000-0000` |
| `studio.area` + `visit.addressNote` | "Florentin, Tel Aviv" |
| `schedule.days` | sample week |
| `pricing.options` | sample prices (40 / 75 / 520 ILS) |

**Booking:** `bookingHref()` currently opens a prefilled email draft. When a
booking system is ready (Calendly, Mindbody, a simple form), point
`booking.href` in `site.ts` at that URL — every Book / Reserve button follows it.

## Logo

The vector logo was converted to clean SVG. Files:

- `public/moonrise-logo.svg` — full lockup (crescent + wordmark), dark
- `public/moonrise-logo-light.svg` — full lockup, light (for dark backgrounds)
- `public/moonrise-mark.svg` — crescent mark only
- `src/app/icon.svg` — favicon (crescent tile)
- `src/content/logoPaths.ts` — generated path data used inline by `src/components/Logo.tsx`
  (this is why the logo always inherits `currentColor` and stays crisp at any size)

## Structure

```
src/app/page.tsx                 section order
src/app/layout.tsx               fonts, metadata, header/footer
src/app/opengraph-image.tsx      social share image (generated at build)
src/app/icon.svg                 favicon
src/components/Header.tsx        fixed header + mobile menu
src/components/Footer.tsx
src/components/Logo.tsx          inline SVG logo
src/components/MoonPhases.tsx    decorative moon phases
src/components/Reveal.tsx        scroll-in animation (skipped without JS)
src/components/sections/*        hero, marquee, about, sessions, evenings, schedule, pricing, philosophy, visit
src/content/site.ts              <-- all copy/data
```

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy — Vercel + GoDaddy

The domain stays at GoDaddy; only DNS records change.

1. Push this repo to GitHub.
2. Go to https://vercel.com/new, import the repo, click **Deploy**
   (everything is auto-detected; no settings to change).
3. In Vercel: **Project -> Settings -> Domains**, add `moonrisetlv.com` and
   `www.moonrisetlv.com`, and set one to redirect to the other.
4. Vercel will show you the exact DNS values to add. Go to
   **GoDaddy -> My Products -> your domain -> DNS**:
   - delete the default parked/website-builder A record for `@` (if present)
   - add **A**, name `@`, value `76.76.21.21` (use the value Vercel shows on your domain card)
   - add **CNAME**, name `www`, value the unique `...vercel-dns...` hostname Vercel shows
5. Save, then wait for DNS to propagate (usually minutes). Vercel provisions SSL
   automatically, and `www` + apex both work.

> Alternative: switch GoDaddy nameservers to `ns1.vercel-dns.com` and
> `ns2.vercel-dns.com` to let Vercel manage all DNS. Copy your MX/email records
> first if the domain receives mail.

## Later upgrades (easy to add)

- Photography: swap the typographic panels for real images (hero, studio, sessions).
- A booking form: a small route in `src/app/api/` can send email or write to a sheet.
- Hebrew version: duplicate `page.tsx` under `src/app/he/` with RTL styles.
