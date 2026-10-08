import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { RoleSelect } from "@/components/admin/RoleSelect";
import { requireAdmin } from "@/lib/auth";
import { listAllUsers } from "@/lib/data";

export const metadata: Metadata = {
  title: "People",
  robots: { index: false },
};

export default function AdminUsersPage() {
  return (
    <main className="container-x min-h-[70svh] py-36">
      <Suspense fallback={<p className="text-sm text-stone">Loading people…</p>}>
        <UsersContent />
      </Suspense>
    </main>
  );
}

async function UsersContent() {
  const admin = await requireAdmin();
  const users = await listAllUsers();

  return (
    <div className="max-w-3xl">
      <p className="label text-stone">Studio panel</p>
      <h1 className="mt-5 font-serif text-[clamp(2.25rem,4.6vw,3.25rem)] font-light leading-tight">
        People.
      </h1>
      <p className="mt-3 text-sm text-stone">
        Promote teachers and admins here. Students are created by signing up — the first
        account ever created is the studio admin.
      </p>

      <div className="mt-12 border-t border-hairline">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-hairline py-5"
          >
            <div>
              <p className="font-serif text-xl leading-tight">
                {user.name}
                {user.id === admin.id ? (
                  <span className="label ml-4 text-stone/70">You</span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-stone">{user.email}</p>
            </div>
            <RoleSelect userId={user.id} role={user.role} />
          </div>
        ))}
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
