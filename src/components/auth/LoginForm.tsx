"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthState } from "@/app/actions/auth";
import { TextField } from "@/components/ui/fields";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(login, {});

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-7">
      <TextField label="Email" name="email" type="email" autoComplete="email" required />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      {state.error ? <p className="text-sm text-red-800">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="label mt-1 rounded-full bg-ink px-6 py-4 text-ivory transition-colors hover:bg-night disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-sm text-stone">
        New here?{" "}
        <Link href="/register" className="text-ink underline underline-offset-4">
          Create a student account
        </Link>
      </p>
    </form>
  );
}
