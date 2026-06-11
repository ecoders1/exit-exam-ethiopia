-- Exit Exam Ethiopia — Supabase Schema
-- Run this in your Supabase SQL Editor

-- ============================================================
-- Extensions
-- ============================================================
create extension if not exists "uuid-ossp";

-- Drop helper function early so it can be cleanly recreated later
-- (prevents stale definitions that reference wrong columns)
-- CASCADE drops dependent policies, which are all recreated below.
drop function if exists public.is_admin() cascade;

-- ============================================================
-- Tables
-- ============================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  full_name     text,
  avatar_url    text,
  university_id uuid,
  department_id uuid,
  role          text not null default 'student' check (role in ('student', 'admin')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Universities
create table if not exists public.universities (
  id         uuid not null default uuid_generate_v4() primary key,
  name       text not null unique,
  short_name text,
  location   text,
  logo_url   text,
  website    text,
  created_at timestamptz not null default now()
);

-- Departments
create table if not exists public.departments (
  id          uuid not null default uuid_generate_v4() primary key,
  name        text not null unique,
  icon        text,
  description text,
  created_at  timestamptz not null default now()
);

-- Ensure role column exists (guards against schemas created before this column was added)
alter table public.profiles
  add column if not exists role text not null default 'student';

do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('student', 'admin'));
  end if;
end $$;

-- Ensure unique constraints exist (guards against tables created before these were added)
do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'universities_name_key'
      and conrelid = 'public.universities'::regclass
  ) then
    alter table public.universities add constraint universities_name_key unique (name);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'departments_name_key'
      and conrelid = 'public.departments'::regclass
  ) then
    alter table public.departments add constraint departments_name_key unique (name);
  end if;
end $$;

-- Add FK constraints on profiles after universities/departments exist
do $$ begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_university_id_fkey'
  ) then
    alter table public.profiles
      add constraint profiles_university_id_fkey
      foreign key (university_id) references public.universities(id) on delete set null;
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_department_id_fkey'
  ) then
    alter table public.profiles
      add constraint profiles_department_id_fkey
      foreign key (department_id) references public.departments(id) on delete set null;
  end if;
end $$;

-- Exams
create table if not exists public.exams (
  id            uuid not null default uuid_generate_v4() primary key,
  title         text not null,
  university_id uuid references public.universities(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,
  year          integer not null,
  file_url      text,
  pages         integer,
  downloads     integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- User exam progress
create table if not exists public.user_exam_progress (
  id          uuid not null default uuid_generate_v4() primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  exam_id     uuid references public.exams(id) on delete cascade,
  score       integer,
  completed   boolean not null default false,
  accessed_at timestamptz not null default now(),
  unique(user_id, exam_id)
);

-- ============================================================
-- updated_at trigger
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create or replace trigger trg_exams_updated_at
  before update on public.exams
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles           enable row level security;
alter table public.universities       enable row level security;
alter table public.departments        enable row level security;
alter table public.exams              enable row level security;
alter table public.user_exam_progress enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- ============================================================
-- Policies — universities
-- ============================================================
drop policy if exists "Public universities are viewable by everyone" on public.universities;
drop policy if exists "Universities: public read"   on public.universities;
drop policy if exists "Universities: admin insert"  on public.universities;
drop policy if exists "Universities: admin update"  on public.universities;
drop policy if exists "Universities: admin delete"  on public.universities;

create policy "Universities: public read"
  on public.universities for select using (true);

create policy "Universities: admin insert"
  on public.universities for insert
  with check (public.is_admin());

create policy "Universities: admin update"
  on public.universities for update
  using (public.is_admin());

create policy "Universities: admin delete"
  on public.universities for delete
  using (public.is_admin());

-- ============================================================
-- Policies — departments
-- ============================================================
drop policy if exists "Public departments are viewable by everyone" on public.departments;
drop policy if exists "Departments: public read"   on public.departments;
drop policy if exists "Departments: admin insert"  on public.departments;
drop policy if exists "Departments: admin update"  on public.departments;
drop policy if exists "Departments: admin delete"  on public.departments;

create policy "Departments: public read"
  on public.departments for select using (true);

create policy "Departments: admin insert"
  on public.departments for insert
  with check (public.is_admin());

create policy "Departments: admin update"
  on public.departments for update
  using (public.is_admin());

create policy "Departments: admin delete"
  on public.departments for delete
  using (public.is_admin());

-- ============================================================
-- Policies — exams
-- ============================================================
drop policy if exists "Published exams are viewable by everyone" on public.exams;
drop policy if exists "Exams: public read published" on public.exams;
drop policy if exists "Exams: admin read all"        on public.exams;
drop policy if exists "Exams: admin insert"          on public.exams;
drop policy if exists "Exams: admin update"          on public.exams;
drop policy if exists "Exams: admin delete"          on public.exams;

create policy "Exams: public read published"
  on public.exams for select using (is_published = true);

create policy "Exams: admin read all"
  on public.exams for select
  using (public.is_admin());

create policy "Exams: admin insert"
  on public.exams for insert
  with check (public.is_admin());

create policy "Exams: admin update"
  on public.exams for update
  using (public.is_admin());

create policy "Exams: admin delete"
  on public.exams for delete
  using (public.is_admin());

-- ============================================================
-- Policies — profiles
-- ============================================================
drop policy if exists "Users can view own profile"   on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Profiles: own read"           on public.profiles;
drop policy if exists "Profiles: own update"         on public.profiles;
drop policy if exists "Profiles: admin read all"     on public.profiles;

create policy "Profiles: own read"
  on public.profiles for select using (auth.uid() = id);

create policy "Profiles: own update"
  on public.profiles for update using (auth.uid() = id);

-- Admins can read all profiles (needed for the Users admin page)
create policy "Profiles: admin read all"
  on public.profiles for select using (public.is_admin());

-- ============================================================
-- Policies — user_exam_progress
-- ============================================================
drop policy if exists "Users can view own progress"   on public.user_exam_progress;
drop policy if exists "Users can upsert own progress" on public.user_exam_progress;
drop policy if exists "Users can update own progress" on public.user_exam_progress;
drop policy if exists "Progress: own read"            on public.user_exam_progress;
drop policy if exists "Progress: own insert"          on public.user_exam_progress;
drop policy if exists "Progress: own update"          on public.user_exam_progress;

create policy "Progress: own read"
  on public.user_exam_progress for select using (auth.uid() = user_id);

create policy "Progress: own insert"
  on public.user_exam_progress for insert with check (auth.uid() = user_id);

create policy "Progress: own update"
  on public.user_exam_progress for update using (auth.uid() = user_id);

-- ============================================================
-- RPC: increment download counter (avoids needing a broad write policy)
-- ============================================================
create or replace function public.increment_exam_downloads(exam_id uuid)
returns void as $$
  update public.exams
  set downloads = downloads + 1
  where id = exam_id and is_published = true;
$$ language sql security definer;

-- ============================================================
-- Auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Sample data
-- ============================================================
insert into public.universities (name, short_name, location) values
  ('Addis Ababa University',  'AAU',  'Addis Ababa'),
  ('Jimma University',        'JU',   'Jimma'),
  ('Mekelle University',      'MU',   'Mekelle'),
  ('Hawassa University',      'HU',   'Hawassa'),
  ('Bahir Dar University',    'BDU',  'Bahir Dar'),
  ('University of Gondar',   'UOG',  'Gondar'),
  ('Haramaya University',    'HARU', 'Haramaya'),
  ('Arba Minch University',  'AMU',  'Arba Minch')
on conflict (name) do nothing;

insert into public.departments (name, icon) values
  ('Computer Science & IT',       '💻'),
  ('Civil Engineering',           '🏗️'),
  ('Medicine & Health Sciences',  '🏥'),
  ('Law',                         '⚖️'),
  ('Accounting & Finance',        '💰'),
  ('Electrical Engineering',      '⚡'),
  ('Pharmacy',                    '💊'),
  ('Economics',                   '📊'),
  ('Mechanical Engineering',      '⚙️'),
  ('Architecture',                '🏛️'),
  ('Agriculture',                 '🌾'),
  ('Nursing',                     '🩺')
on conflict (name) do nothing;
