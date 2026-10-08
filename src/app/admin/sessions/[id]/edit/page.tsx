import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { updateSession } from "@/app/actions/sessions";
import { SessionForm } from "@/components/admin/SessionForm";
import { requireStaff } from "@/lib/auth";
import { getSessionById, listStaffUsers } from "@/lib/data";
import { studioDateInput, studioTimeInput } from "@/lib/time";

export const metadata: Metadata = {
  title: "Edit session",
  robots: { index: false },
};

export default function EditSessionPage(props: PageProps<"/admin/sessions/[id]/edit">) {
  return (
    <main className="container-x min-h-[70svh] py-36">
      <Suspense fallback={<p className="text-sm text-stone">Loading the session…</p>}>
        <EditSessionContent {...props} />
      </Suspense>
    </main>
  );
}

async function EditSessionContent({ params }: PageProps<"/admin/sessions/[id]/edit">) {
  await requireStaff();
  const { id } = await params;
  const [session, staff] = await Promise.all([getSessionById(id), listStaffUsers()]);

  if (!session) notFound();

  return (
    <div className="max-w-3xl">
      <p className="label text-stone">Edit session</p>
      <h1 className="mt-5 font-serif text-[clamp(2.25rem,4.6vw,3.25rem)] font-light leading-tight">
        Adjust the details.
      </h1>
      <p className="mt-3 text-sm text-stone">
        Substituting for another teacher? Choose yourself here — any teacher can take over
        any session.
      </p>

      <div className="mt-12 rounded-2xl border border-hairline bg-paper p-8 md:p-10">
        <SessionForm
          action={updateSession.bind(null, session.id)}
          staff={staff.map((member) => ({
            id: member.id,
            name: member.name,
            role: member.role,
          }))}
          submitLabel="Save changes"
          defaults={{
            typeId: session.typeId,
            date: studioDateInput(session.startsAt),
            time: studioTimeInput(session.startsAt),
            durationMinutes: session.durationMinutes,
            teacherId: session.teacherId ?? "",
            note: session.note ?? "",
          }}
        />
      </div>

      <p className="mt-8">
        <Link
          href="/admin"
          className="label text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          Back to the studio panel
        </Link>
      </p>
    </div>
  );
}
