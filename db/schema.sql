create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  type_id text not null,
  starts_at timestamptz not null,
  duration_minutes integer not null default 60,
  teacher_id uuid references users(id) on delete set null,
  note text,
  status text not null default 'scheduled' check (status in ('scheduled', 'cancelled')),
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sessions_starts_at_idx on sessions (starts_at);
