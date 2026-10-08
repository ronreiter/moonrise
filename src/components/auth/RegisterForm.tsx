"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register, type AuthState } from "@/app/actions/auth";
import { TextField } from "@/components/ui/fields";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(register, {});

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-7">
      <TextField label="Name" name="name" autoComplete="name" required />
      <TextField label="Email" name="email" type="email" autoComplete="email" required />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
      />

      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="label mt-1 rounded-full bg-ink px-6 py-4 text-ivory transition-colors hover:bg-night disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-sm leading-relaxed text-stone">
        Teacher or studio admin? Create your account, then the studio will upgrade it — or ask
        us and we&rsquo;ll set it up for you. Already have an account?{" "}
        <Link href="/login" className="text-ink underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
