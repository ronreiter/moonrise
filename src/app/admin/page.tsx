import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createSession, deleteSessionAction, setSessionStatus } from "@/app/actions/sessions";
import { SessionForm } from "@/components/admin/SessionForm";
import { requireStaff } from "@/lib/auth";
import { listSessionsForStaff, listStaffUsers } from "@/lib/data";
import { getSessionType } from "@/lib/session-types";
import { formatStudioDay, formatStudioTime } from "@/lib/time";

export const metadata: Metadata = {
  title: "Studio panel",
  robots: { index: false },
};

export default function AdminPage() {
  return (
    <main className="container-x min-h-[70svh] py-36">
      <Suspense fallback={<p className="text-sm text-stone">Loading the studio panel…</p>}>
        <AdminContent />
      </Suspense>
    </main>
  );
}

async function AdminContent() {
  const user = await requireStaff();
  const [sessions, staff] = await Promise.all([listSessionsForStaff(), listStaffUsers()]);

  const staffOptions = staff.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
  }));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="label text-stone">Studio panel</p>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,4.6vw,3.25rem)] font-light leading-tight">
            Sessions.
          </h1>
          <p className="mt-3 text-sm text-stone">
            Signed in as {user.name} — {user.role}
          </p>
        </div>
        {user.role === "admin" ? (
          <Link
            href="/admin/users"
            className="label rounded-full border border-ink px-6 py-3.5 text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            Manage people
          </Link>
        ) : null}
      </div>

      <section className="mt-16 rounded-2xl border border-hairline bg-paper p-8 md:p-10">
        <h2 className="font-serif text-2xl font-light">Schedule a session</h2>
        <p className="mt-2 text-sm text-stone">
          One-time sessions, shown in Tel Aviv time. Teachers can later take over any session
          by editing it and choosing themselves as the teacher.
        </p>
        <div className="mt-9">
          <SessionForm action={createSession} staff={staffOptions} submitLabel="Schedule session" />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-serif text-3xl font-light">Upcoming &amp; recent.</h2>
        {sessions.length === 0 ? (
          <p className="mt-8 text-sm text-stone">
            Nothing scheduled yet — create the first session above.
          </p>
        ) : (
          <div className="mt-8 border-t border-hairline">
            {sessions.map((session) => {
              const type = getSessionType(session.typeId);
              return (
                <div
                  key={session.id}
                  className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-hairline py-5"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="w-12 shrink-0 text-sm tabular-nums text-stone">
                      {formatStudioTime(session.startsAt)}
                    </span>
                    <div>
                      <p className="font-serif text-xl leading-tight">
                        {type?.name ?? session.typeId}
                        {session.status === "cancelled" ? (
                          <span className="label ml-4 text-stone/70">Cancelled</span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-sm text-stone">
                        {formatStudioDay(session.startsAt)}
                        {session.teacherName ? ` · ${session.teacherName}` : " · unassigned"}
                        {session.note ? ` — ${session.note}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Link
                      href={`/admin/sessions/${session.id}/edit`}
                      className="label text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      Edit
                    </Link>
                    <form
                      action={setSessionStatus.bind(
                        null,
                        session.id,
                        session.status === "scheduled" ? "cancelled" : "scheduled",
                      )}
                    >
                      <button
                        type="submit"
                        className="label cursor-pointer text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        {session.status === "scheduled" ? "Cancel" : "Restore"}
                      </button>
                    </form>
                    {user.role === "admin" ? (
                      <form action={deleteSessionAction.bind(null, session.id)}>
                        <button
                          type="submit"
                          className="label cursor-pointer text-stone/70 underline-offset-4 transition-colors hover:text-red-800 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
