import { cacheLife, cacheTag } from "next/cache";
import { query } from "./db";

export type Role = "student" | "teacher" | "admin";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type UserWithHash = UserRecord & { passwordHash: string };

export function isRoleValue(value: string): value is Role {
  return value === "student" || value === "teacher" || value === "admin";
}

export type ScheduledSession = {
  id: string;
  typeId: string;
  startsAt: string;
  durationMinutes: number;
  teacherId: string | null;
  teacherName: string | null;
  note: string | null;
  status: "scheduled" | "cancelled";
};

type Row = Record<string, unknown>;

function toRole(value: unknown): Role {
  return value === "admin" || value === "teacher" ? value : "student";
}

function toUser(row: Row): UserRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    role: toRole(row.role),
  };
}

function toSession(row: Row): ScheduledSession {
  return {
    id: String(row.id),
    typeId: String(row.type_id),
    startsAt: new Date(row.starts_at as string | Date).toISOString(),
    durationMinutes: Number(row.duration_minutes),
    teacherId: row.teacher_id ? String(row.teacher_id) : null,
    teacherName: row.teacher_name ? String(row.teacher_name) : null,
    note: row.note ? String(row.note) : null,
    status: row.status === "cancelled" ? "cancelled" : "scheduled",
  };
}

const SESSION_SELECT = `
  select s.id, s.type_id, s.starts_at, s.duration_minutes, s.teacher_id,
         u.name as teacher_name, s.note, s.status
  from sessions s
  left join users u on u.id = s.teacher_id
`;

/* ------------------------------- users ------------------------------- */

export async function findUserById(id: string): Promise<UserRecord | null> {
  const rows = await query("select id, name, email, role from users where id = $1", [id]);
  return rows[0] ? toUser(rows[0]) : null;
}

export async function findUserByEmail(email: string): Promise<UserWithHash | null> {
  const rows = await query(
    "select id, name, email, role, password_hash from users where lower(email) = lower($1)",
    [email],
  );
  const row = rows[0];
  return row ? { ...toUser(row), passwordHash: String(row.password_hash) } : null;
}

export async function countUsers(): Promise<number> {
  const rows = await query<{ count: string }>("select count(*)::text as count from users");
  return Number(rows[0]?.count ?? 0);
}

export async function insertUser(
  name: string,
  email: string,
  passwordHash: string,
  role: Role,
): Promise<string> {
  const rows = await query<{ id: string }>(
    "insert into users (name, email, password_hash, role) values ($1, $2, $3, $4) returning id",
    [name, email.toLowerCase(), passwordHash, role],
  );
  return String(rows[0].id);
}

export async function listStaffUsers(): Promise<UserRecord[]> {
  const rows = await query(
    "select id, name, email, role from users where role in ('teacher', 'admin') order by role desc, name asc",
  );
  return rows.map(toUser);
}

export async function listAllUsers(): Promise<UserRecord[]> {
  const rows = await query("select id, name, email, role from users order by name asc");
  return rows.map(toUser);
}

export async function setUserRoleDb(id: string, role: Role): Promise<void> {
  await query("update users set role = $2 where id = $1", [id, role]);
}

/* ------------------------------ sessions ------------------------------ */

export async function getUpcomingSessions(limit = 60): Promise<ScheduledSession[]> {
  "use cache";
  cacheTag("sessions");
  cacheLife("minutes");

  try {
    const rows = await query(
      `${SESSION_SELECT}
       where s.status = 'scheduled'
         and s.starts_at > now() - interval '1 hour'
       order by s.starts_at asc
       limit $1`,
      [limit],
    );
    return rows.map(toSession);
  } catch {
    return [];
  }
}

export async function listSessionsForStaff(): Promise<ScheduledSession[]> {
  const rows = await query(
    `${SESSION_SELECT}
     where s.starts_at > now() - interval '7 days'
     order by s.starts_at asc
     limit 300`,
  );
  return rows.map(toSession);
}

export async function getSessionById(id: string): Promise<ScheduledSession | null> {
  const rows = await query(`${SESSION_SELECT} where s.id = $1`, [id]);
  return rows[0] ? toSession(rows[0]) : null;
}

export async function insertSession(input: {
  typeId: string;
  startsAt: Date;
  durationMinutes: number;
  teacherId: string | null;
  note: string | null;
  createdBy: string;
}): Promise<void> {
  await query(
    `insert into sessions (type_id, starts_at, duration_minutes, teacher_id, note, created_by)
     values ($1, $2, $3, $4, $5, $6)`,
    [
      input.typeId,
      input.startsAt.toISOString(),
      input.durationMinutes,
      input.teacherId,
      input.note,
      input.createdBy,
    ],
  );
}

export async function updateSessionDb(
  id: string,
  input: {
    typeId: string;
    startsAt: Date;
    durationMinutes: number;
    teacherId: string | null;
    note: string | null;
  },
): Promise<void> {
  await query(
    `update sessions
     set type_id = $2, starts_at = $3, duration_minutes = $4, teacher_id = $5, note = $6, updated_at = now()
     where id = $1`,
    [
      id,
      input.typeId,
      input.startsAt.toISOString(),
      input.durationMinutes,
      input.teacherId,
      input.note,
    ],
  );
}

export async function setSessionStatusDb(
  id: string,
  status: "scheduled" | "cancelled",
): Promise<void> {
  await query("update sessions set status = $2, updated_at = now() where id = $1", [id, status]);
}

export async function deleteSessionDb(id: string): Promise<void> {
  await query("delete from sessions where id = $1", [id]);
}
