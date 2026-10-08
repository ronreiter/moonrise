# Moonrise — moonrisetlv.com

Website and studio system for **Moonrise**, a yoga, pilates and sound studio in Tel Aviv.

- **Public site** — hero, studio, sessions, evenings, live schedule, pricing, visit.
- **Accounts** — students sign up; teachers and admins manage the studio.
- **Scheduling** — one-time sessions created from the studio's session types, shown
  in Tel Aviv time on the homepage, the schedule page and in accounts.

Built with Next.js (App Router, Cache Components) and Tailwind CSS v4, Postgres.

## Roles

| Role | Can do |
| --- | --- |
| Student | Sign up, sign in, see the schedule and what's coming up |
| Teacher | Everything students can, plus the studio panel: create sessions, edit any session (including taking over another teacher's — substitution), cancel/restore |
| Admin | Everything teachers can, plus delete sessions and manage people (promote/demote roles) |

**Bootstrap:** the first account ever created becomes the studio admin. Register, then
promote teachers from **Studio panel → Manage people**.

## Session types

The eleven session types live in [`src/content/session-types.json`](src/content/session-types.json).
They drive both the marketing cards on the homepage and the type dropdown in the
studio panel. Add a new type there and it appears everywhere.

## Local development

1. Start a local Postgres (Docker):

   ```bash
   docker run -d --name moonrise-pg \
     -e POSTGRES_USER=moonrise -e POSTGRES_PASSWORD=moonrise -e POSTGRES_DB=moonrise \
     -p 5433:5432 postgres:17
   ```

2. Create `.env.local` from `.env.example` and set `AUTH_SECRET`
   (`openssl rand -base64 48`).

3. Apply the schema (safe to re-run):

   ```bash
   npm install
   npm run db:setup
   ```

4. Run it:

   ```bash
   npm run dev
   ```

Open http://localhost:3000, register — you're the admin — and schedule a session.

## Editing content

Marketing copy and contact details live in [`src/content/site.ts`](src/content/site.ts).
Placeholders to replace before launch: email, Instagram, WhatsApp, area/address,
prices. Booking buttons are still `mailto:` links (`bookingHref()` in `site.ts`) —
point them at a booking URL when you have one.

## Database

`db/schema.sql` defines `users` and `sessions`; `scripts/db-setup.mjs` applies it and
can optionally seed an admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Times are stored
UTC and displayed in `Asia/Jerusalem` (see `src/lib/time.ts`).

## Deploy — Vercel + Neon + GoDaddy

1. Push this repo to GitHub (done) and import it at https://vercel.com/new.
2. Add a database: **Vercel → Storage → Create Database → Neon (Postgres)** and
   connect it to the project — this sets `DATABASE_URL` automatically.
3. Add **`AUTH_SECRET`** in **Project → Settings → Environment Variables**
   (`openssl rand -base64 48`).
4. Apply the schema to Neon — either run:
   `DATABASE_URL="<neon-connection-string>" npm run db:setup`
   or paste `db/schema.sql` into the Neon SQL editor.
5. Deploy, register the first account (that's your admin), and add sessions.
6. Domain: **Settings → Domains** → add `moonrisetlv.com` + `www`, then at GoDaddy:
   delete the parked A record for `@`, add **A** `@ → 76.76.21.21` (or the value
   Vercel shows) and the **CNAME** for `www` that Vercel shows.

## Good to know

- Sessions quietly change on the public pages via `updateTag("sessions")` when staff
  edit the schedule — no redeploy needed.
- No email verification yet; passwords are hashed with scrypt.
- Booking/RSVP is not built yet (students see the schedule; reserving is by message).
- The site is English-only for now — a Hebrew version can be added under `src/app/he`.
