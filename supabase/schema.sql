-- Exit Exam Ethiopia — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  university_id uuid,
  department_id uuid,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Universities table
create table if not exists public.universities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  short_name text,
  location text,
  logo_url text,
  website text,
  created_at timestamptz default now()
);

-- Departments table
create table if not exists public.departments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  icon text,
  description text,
  created_at timestamptz default now()
);

-- Exams table
create table if not exists public.exams (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  university_id uuid references public.universities(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,
  year integer not null,
  file_url text,
  pages integer,
  downloads integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User exam progress
create table if not exists public.user_exam_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  exam_id uuid references public.exams(id) on delete cascade,
  score integer,
  completed boolean default false,
  accessed_at timestamptz default now(),
  unique(user_id, exam_id)
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.universities enable row level security;
alter table public.departments enable row level security;
alter table public.exams enable row level security;
alter table public.user_exam_progress enable row level security;

-- Policies
create policy "Public universities are viewable by everyone"
  on public.universities for select using (true);

create policy "Public departments are viewable by everyone"
  on public.departments for select using (true);

create policy "Published exams are viewable by everyone"
  on public.exams for select using (is_published = true);

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can view own progress"
  on public.user_exam_progress for select using (auth.uid() = user_id);

create policy "Users can upsert own progress"
  on public.user_exam_progress for insert with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_exam_progress for update using (auth.uid() = user_id);

-- Auto-create profile on signup
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

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Sample data
insert into public.universities (name, short_name, location) values
  ('Addis Ababa University', 'AAU', 'Addis Ababa'),
  ('Jimma University', 'JU', 'Jimma'),
  ('Mekelle University', 'MU', 'Mekelle'),
  ('Hawassa University', 'HU', 'Hawassa'),
  ('Bahir Dar University', 'BDU', 'Bahir Dar')
on conflict do nothing;

insert into public.departments (name, icon) values
  ('Computer Science & IT', '💻'),
  ('Civil Engineering', '🏗️'),
  ('Medicine & Health Sciences', '🏥'),
  ('Law', '⚖️'),
  ('Accounting & Finance', '💰'),
  ('Electrical Engineering', '⚡'),
  ('Pharmacy', '💊'),
  ('Economics', '📊')
on conflict do nothing;
