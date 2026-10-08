"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/app/actions/auth";

type Me = {
  id: string;
  name: string;
  role: "student" | "teacher" | "admin";
};

export function HeaderAuth({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const pathname = usePathname();
  const [me, setMe] = useState<Me | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { user: Me | null }) => {
        if (!cancelled) setMe(data.user);
      })
      .catch(() => {
        if (!cancelled) setMe(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (me === undefined) return null;

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-3">
        {me ? (
          <>
            <Link href="/account" className="label text-ink">
              Account — {me.name}
            </Link>
            {me.role !== "student" ? (
              <Link href="/admin" className="label text-stone">
                Studio panel
              </Link>
            ) : null}
            <form action={logout}>
              <button type="submit" className="label cursor-pointer text-stone">
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="label text-ink">
              Sign in
            </Link>
            <Link href="/register" className="label text-stone">
              Create an account
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-8">
      {me ? (
        <>
          {me.role !== "student" ? (
            <Link href="/admin" className="label text-ink/70 transition-colors hover:text-ink">
              Studio
            </Link>
          ) : null}
          <Link href="/account" className="label text-ink/70 transition-colors hover:text-ink">
            {me.name.split(" ")[0]}
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="label cursor-pointer text-stone transition-colors hover:text-ink"
            >
              Log out
            </button>
          </form>
        </>
      ) : (
        <Link href="/login" className="label text-ink/70 transition-colors hover:text-ink">
          Sign in
        </Link>
      )}
    </div>
  );
}
