# Exit Exam Ethiopia

A production-ready exit exam preparation platform for Ethiopian university students.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Auth + PostgreSQL + Storage)
- **Framer Motion**
- **Recharts**
- **Vercel** (deployment)

## Features

### Students
- Landing page with hero, features, and department overview
- Sign up / Sign in with email & password
- Dashboard with stats, quick actions, announcements, recent activity
- **Practice Mode** — filter by department, subject, topic, question type; multiple choice, true/false, fill-in-blank; explanations; progress saved
- **Mock Exam** — timed exam simulation with anti-cheat (right-click disabled, copy/paste disabled, tab-switch warnings); question navigator; auto-graded
- **Results** — history, charts, score trend, pass/fail breakdown
- **Resources** — download PDFs, DOCX, PPTX, XLSX, images uploaded by admin
- **Profile** — edit info, update avatar, change password, sign out
- Dark mode / Light mode

### Admin (iyasu4313@gmail.com)
- Admin dashboard with platform stats and charts
- User management — view, edit, activate/suspend, delete
- Department management — add, edit, delete
- Exam management — create mock tests, add/edit/delete questions
- Resource management — upload files to Supabase Storage
- Announcement management — create, publish, hide, delete

## Quick Start

### 1. Clone and install
```bash
git clone <repo-url>
cd exit-exam-ethiopia
npm install
```

### 2. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Go to **Storage** → create two buckets: `avatars` (public) and `resources` (public)
4. Create the admin user:
   - Authentication → Users → Add User → `iyasu4313@gmail.com`
   - After creation, run: `UPDATE profiles SET role = 'admin' WHERE email = 'iyasu4313@gmail.com';`

### 3. Configure environment
```bash
cp .env.example .env.local
```
Fill in your Supabase URL and anon key from **Project Settings → API**.

### 4. Run locally
```bash
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional, for admin operations)
   - `NEXT_PUBLIC_APP_URL` (your Vercel domain)
4. Deploy

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/auth/signin` | Sign in |
| `/auth/signup` | Sign up |
| `/auth/forgot-password` | Password reset |
| `/dashboard` | Student home |
| `/dashboard/practice` | Practice questions |
| `/dashboard/mock-test` | Mock exam |
| `/dashboard/results` | Results history |
| `/dashboard/resources` | Study resources |
| `/dashboard/profile` | User profile |
| `/admin` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/departments` | Department management |
| `/admin/exams` | Exam & question management |
| `/admin/resources` | Resource management |
| `/admin/announcements` | Announcement management |
