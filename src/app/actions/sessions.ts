"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteSessionDb,
  findUserById,
  insertSession,
  isRoleValue,
  setSessionStatusDb,
  setUserRoleDb,
  updateSessionDb,
} from "@/lib/data";
import { isStaff, requireAdmin, requireStaff } from "@/lib/auth";
import { getSessionType } from "@/lib/session-types";
import { studioDateToUtc } from "@/lib/time";

export type SessionFormState = { error?: string };

const DURATIONS = new Set([30, 45, 60, 75, 90]);

type ParsedSession = {
  typeId: string;
  startsAt: Date;
  durationMinutes: number;
  teacherId: string | null;
  note: string | null;
};

async function parseSessionForm(formData: FormData): Promise<ParsedSession | string> {
  const typeId = String(formData.get("typeId") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const duration = Number(formData.get("durationMinutes") ?? 60);
  const teacherId = String(formData.get("teacherId") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!getSessionType(typeId)) {
    return "Choose a session type.";
  }

  const startsAt = studioDateToUtc(date, time);
  if (!startsAt) {
    return "Pick a valid date and time.";
  }

  let resolvedTeacherId: string | null = null;
  if (teacherId) {
    const teacher = await findUserById(teacherId);
    if (!teacher || !isStaff(teacher.role)) {
      return "Choose a valid teacher.";
    }
    resolvedTeacherId = teacher.id;
  }

  return {
    typeId,
    startsAt,
    durationMinutes: DURATIONS.has(duration) ? duration : 60,
    teacherId: resolvedTeacherId,
    note: note || null,
  };
}

export async function createSession(
  _prev: SessionFormState,
  formData: FormData,
): Promise<SessionFormState> {
  const user = await requireStaff();
  const parsed = await parseSessionForm(formData);
  if (typeof parsed === "string") return { error: parsed };

  await insertSession({ ...parsed, createdBy: user.id });
  updateTag("sessions");
  redirect("/admin");
}

export async function updateSession(
  id: string,
  _prev: SessionFormState,
  formData: FormData,
): Promise<SessionFormState> {
  await requireStaff();
  const parsed = await parseSessionForm(formData);
  if (typeof parsed === "string") return { error: parsed };

  await updateSessionDb(id, parsed);
  updateTag("sessions");
  redirect("/admin");
}

export async function setSessionStatus(
  id: string,
  status: "scheduled" | "cancelled",
): Promise<void> {
  await requireStaff();
  await setSessionStatusDb(id, status);
  updateTag("sessions");
}

export async function deleteSessionAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteSessionDb(id);
  updateTag("sessions");
}

export async function setUserRole(userId: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const role = String(formData.get("role") ?? "");
  if (!isRoleValue(role)) return;
  await setUserRoleDb(userId, role);
}
