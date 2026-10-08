import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/actions/auth";
import { SessionList } from "@/components/SessionList";
import { requireUser } from "@/lib/auth";
import { getUpcomingSessions } from "@/lib/data";
import { booking } from "@/content/site";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <main className="container-x min-h-[70svh] py-36">
      <Suspense fallback={<p className="text-sm text-stone">Loading your account…</p>}>
        <AccountContent />
      </Suspense>
    </main>
  );
}

async function AccountContent() {
  const user = await requireUser();
  const upcoming = await getUpcomingSessions(6);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="label text-stone">Account</p>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,4.6vw,3.25rem)] font-light leading-tight">
            {user.name}
          </h1>
          <p className="mt-3 text-sm text-stone">
            {user.email}
            {user.role !== "student" ? (
              <span className="label ml-4 rounded-full border border-hairline px-3 py-1 text-stone">
                {user.role}
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex items-center gap-6">
          {user.role !== "student" ? (
            <Link
              href="/admin"
              className="label rounded-full border border-ink px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-ivory"
            >
              Studio panel
            </Link>
          ) : null}
          <form action={logout}>
            <button
              type="submit"
              className="label cursor-pointer text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-3xl font-light">Coming up at the studio.</h2>
          <a href={booking.href} className="label text-stone underline-offset-4 hover:text-ink hover:underline">
            {booking.label}
          </a>
        </div>
        <div className="mt-10">
          <SessionList
            sessions={upcoming}
            empty="No sessions are scheduled right now — check back soon."
          />
        </div>
        <p className="mt-8 text-sm text-stone">
          <Link href="/schedule" className="text-ink underline underline-offset-4">
            See the full schedule
          </Link>
        </p>
      </section>
    </>
  );
}
