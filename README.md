# Moonrise — moonrisetlv.com

Static brochure site for **Moonrise**, a yoga, pilates and sound studio in Tel Aviv.
It sends visitors to the studio's Instagram ([@moonrisetlv](https://instagram.com/moonrisetlv))
and to booking on [Arbox](https://moonrisetlv.arboxapp.com).

Built with Next.js (App Router, static export) and Tailwind CSS v4. Deployed to
GitHub Pages by `.github/workflows/deploy-pages.yml` on every push to `main`.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces the static site in `out/` — HTML, CSS, JS and assets, no server needed.

## Editing content

- Marketing copy and all links (Instagram, Arbox, nav, pricing) live in
  [`src/content/site.ts`](src/content/site.ts).
- The session cards on the homepage are driven by
  [`src/content/session-types.json`](src/content/session-types.json).

## Deploy

Pushing to `main` builds and deploys via GitHub Actions. The custom domain is
configured in the repo's Pages settings (and `public/CNAME`). DNS at GoDaddy:

- **A** records for `@` → `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`
- **CNAME** for `www` → `ronreiter.github.io`

## Interactive version

The accounts + scheduling version (Postgres, auth, teacher/admin panel) is parked
on the `interactive` branch — not part of the live static site for now.
