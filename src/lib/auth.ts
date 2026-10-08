import { redirect } from "next/navigation";
import { findUserById, type Role, type UserRecord } from "./data";
import { readSessionUserId } from "./session";

export type SessionUser = UserRecord;

export async function getCurrentUser(): Promise<SessionUser | null> {
  const userId = await readSessionUserId();
  if (!userId) return null;
  return findUserById(userId);
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireStaff(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role === "student") redirect("/account");
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/admin");
  return user;
}

export function isStaff(role: Role): boolean {
  return role === "teacher" || role === "admin";
}
