# Exit Exam Ethiopia

**Prepare, Practice, and Succeed** — A modern web application helping Ethiopian university students prepare for national exit examinations.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel
- **Source**: GitHub

## ✨ Features

- 🎓 Browse universities and departments
- 📄 Download past exit exam papers
- 🤖 AI Study Assistant
- 🔐 Secure authentication (Supabase Auth)
- 🌙 Dark / Light mode
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast search
- 📊 Progress tracking dashboard

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/exit-exam-ethiopia.git
cd exit-exam-ethiopia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in your Supabase SQL Editor
3. Copy your project URL and anon key

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── departments/          # Departments listing
│   ├── universities/         # Universities listing
│   ├── exams/                # Exam papers
│   ├── dashboard/            # Student dashboard
│   ├── login/                # Login page
│   └── register/             # Register page
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── stats-section.tsx
│   ├── features-section.tsx
│   ├── cta-section.tsx
│   └── theme-provider.tsx
└── lib/
    ├── utils.ts
    └── supabase/
        ├── client.ts
        └── server.ts
supabase/
└── schema.sql                # Database schema + seed data
```

## 📄 License

MIT © 2026 Exit Exam Ethiopia
