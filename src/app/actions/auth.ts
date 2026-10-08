"use server";

import { redirect } from "next/navigation";
import { countUsers, findUserByEmail, insertUser } from "@/lib/data";
import { hashPassword, verifyPassword } from "@/lib/password";
import { clearSessionCookie, setSessionCookie } from "@/lib/session";

export type AuthState = { error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Incorrect email or password." };
  }

  await setSessionCookie(user.id);
  redirect(user.role === "student" ? "/account" : "/admin");
}

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !EMAIL_RE.test(email)) {
    return { error: "Enter your name and a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  // The first account created bootstraps the studio admin.
  const role = (await countUsers()) === 0 ? "admin" : "student";
  const passwordHash = await hashPassword(password);
  const userId = await insertUser(name, email, passwordHash, role);

  await setSessionCookie(userId);
  redirect(role === "student" ? "/account" : "/admin");
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect("/");
}
