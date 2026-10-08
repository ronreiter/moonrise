"use client";

import { setUserRole } from "@/app/actions/sessions";

type Role = "student" | "teacher" | "admin";

export function RoleSelect({ userId, role }: { userId: string; role: Role }) {
  return (
    <form action={setUserRole.bind(null, userId)}>
      <select
        name="role"
        defaultValue={role}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="cursor-pointer appearance-none rounded-full border border-hairline bg-transparent px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink outline-none transition-colors hover:border-ink/40 focus:border-ink"
        aria-label="Change role"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
    </form>
  );
}
