"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, FileText, TrendingUp, Clock, ArrowRight,
  Search, Bell, ChevronRight, Star, Download, Target,
  Flame, Award, Zap, BarChart3, BookMarked, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  { name: "Computer Science",       icon: "💻", slug: "cs",       exams: 45, color: "from-blue-500 to-blue-700" },
  { name: "Software Engineering",   icon: "🖥️", slug: "se",       exams: 38, color: "from-indigo-500 to-indigo-700" },
  { name: "Information Technology", icon: "🌐", slug: "it",       exams: 32, color: "from-cyan-500 to-cyan-700" },
  { name: "Nursing",                icon: "🩺", slug: "nursing",  exams: 42, color: "from-rose-500 to-rose-700" },
  { name: "Midwifery",              icon: "👶", slug: "midwifery",exams: 30, color: "from-pink-500 to-pink-700" },
  { name: "Public Health",          icon: "🏥", slug: "ph",       exams: 36, color: "from-teal-500 to-teal-700" },
  { name: "Medicine",               icon: "⚕️", slug: "medicine", exams: 50, color: "from-emerald-500 to-emerald-700" },
  { name: "Pharmacy",               icon: "💊", slug: "pharmacy", exams: 28, color: "from-green-500 to-green-700" },
  { name: "Economics",              icon: "📊", slug: "econ",     exams: 25, color: "from-amber-500 to-amber-700" },
  { name: "Accounting & Finance",   icon: "💰", slug: "acct",     exams: 27, color: "from-yellow-500 to-yellow-700" },
  { name: "Management",             icon: "📋", slug: "mgmt",     exams: 24, color: "from-orange-500 to-orange-700" },
  { name: "Civil Engineering",      icon: "🏗️", slug: "civil",    exams: 38, color: "from-stone-500 to-stone-700" },
  { name: "Electrical Engineering", icon: "⚡", slug: "elec",     exams: 35, color: "from-violet-500 to-violet-700" },
  { name: "Mechanical Engineering", icon: "⚙️", slug: "mech",     exams: 32, color: "from-slate-500 to-slate-700" },
  { name: "Architecture",           icon: "🏛️", slug: "arch",     exams: 18, color: "from-purple-500 to-purple-700" },
  { name: "Law",                    icon: "⚖️", slug: "law",      exams: 30, color: "from-red-500 to-red-700" },
  { name: "Agriculture",            icon: "🌾", slug: "agri",     exams: 22, color: "from-lime-500 to-lime-700" },
  { name: "Veterinary Medicine",    icon: "🐾", slug: "vet",      exams: 20, color: "from-fuchsia-500 to-fuchsia-700" },
  { name: "Biology",                icon: "🔬", slug: "bio",      exams: 24, color: "from-emerald-400 to-emerald-600" },
  { name: "Chemistry",              icon: "⚗️", slug: "chem",     exams: 22, color: "from-blue-400 to-blue-600" },
  { name: "Mathematics",            icon: "📐", slug: "math",     exams: 28, color: "from-indigo-400 to-indigo-600" },
  { name: "Physics",                icon: "🔭", slug: "phys",     exams: 25, color: "from-sky-500 to-sky-700" },
  { name: "English Language",       icon: "📝", slug: "eng",      exams: 20, color: "from-gray-500 to-gray-700" },
  { name: "Psychology",             icon: "🧠", slug: "psych",    exams: 18, color: "from-pink-400 to-pink-600" },
  { name: "Sociology",              icon: "👥", slug: "socio",    exams: 16, color: "from-teal-400 to-teal-600" },
  { name: "Geography",              icon: "🗺️", slug: "geo",      exams: 15, color: "from-green-400 to-green-600" },
  { name: "History",                icon: "📜", slug: "hist",     exams: 14, color: "from-amber-400 to-amber-600" },
];

const RECENT_EXAMS = [
  { title: "Computer Science Exit Exam 2024", university: "AAU", year: 2024, dept: "Computer Science", score: 82, slug: "cs-aau-2024" },
  { title: "Civil Engineering Exit Exam 2024", university: "JU", year: 2024, dept: "Civil Engineering", score: 74, slug: "civil-ju-2024" },
  { title: "Medicine Exit Exam 2023", university: "HU", year: 2023, dept: "Medicine", score: 90, slug: "med-hu-2023" },
];

const NOTIFICATIONS = [
  { id: 1, text: "New exam uploaded: Electrical Engineering 2024", time: "2h ago", unread: true },
  { id: 2, text: "Your mock test result is ready", time: "5h ago", unread: true },
  { id: 3, text: "AI Study Assistant updated", time: "1d ago", unread: false },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [favDepts, setFavDepts] = useState<string[]>(["cs", "medicine"]);

  const filtered = DEPARTMENTS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFav = (slug: string) =>
    setFavDepts((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">

      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d1117]/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block font-bold text-gray-900 dark:text-white text-sm">Exit Exam <span className="text-amber-500">Ethiopia</span></span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search department…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Right: notifications + avatar */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Notification bell */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900" />
                )}
              </button>
              {/* Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</p>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  </div>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={cn("px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors", n.unread && "bg-blue-50/50 dark:bg-blue-900/10")}>
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", n.unread ? "bg-blue-500" : "bg-gray-300")} />
                      <div>
                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-md">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7 space-y-8">

        {/* ── Welcome + Profile Summary ── */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a3580] via-[#1a56db] to-[#1e40af] p-6 sm:p-8 text-white shadow-xl shadow-blue-600/20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(245,158,11,0.6) 0%, transparent 40%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.3) 0%, transparent 40%)" }}
          />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium">Welcome back,</p>
              <h1 className="text-2xl sm:text-3xl font-bold mt-0.5">Abebe Kebede 👋</h1>
              <p className="text-blue-100/70 text-sm mt-1.5">Computer Science · Addis Ababa University · Year 4</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="glass rounded-xl px-4 py-3 text-center border border-white/20">
                <div className="flex items-center gap-1.5 justify-center">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span className="text-xl font-bold">7</span>
                </div>
                <p className="text-xs text-blue-200/70 mt-0.5">Day Streak</p>
              </div>
              {/* Rank */}
              <div className="glass rounded-xl px-4 py-3 text-center border border-white/20">
                <div className="flex items-center gap-1.5 justify-center">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xl font-bold">#42</span>
                </div>
                <p className="text-xs text-blue-200/70 mt-0.5">Rank</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-100">Overall Progress</span>
              <span className="text-sm font-bold text-amber-400">68%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-1000" style={{ width: "68%" }} />
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FileText,  label: "Exams Accessed", value: "12",  color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-900/20",   ring: "ring-blue-100 dark:ring-blue-900/30",   delta: "+3 this week" },
            { icon: BookOpen,  label: "Mock Tests Taken", value: "4", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", ring: "ring-emerald-100 dark:ring-emerald-900/30", delta: "+1 today" },
            { icon: BarChart3, label: "Avg. Score",     value: "74%", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20",  ring: "ring-violet-100 dark:ring-violet-900/30",  delta: "+5% vs last" },
            { icon: Clock,     label: "Study Hours",    value: "28",  color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-900/20",   ring: "ring-amber-100 dark:ring-amber-900/30",   delta: "Goal: 40h" },
          ].map(({ icon: Icon, label, value, color, bg, ring, delta }) => (
            <div key={label} className="premium-card p-5 flex flex-col gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center ring-4", bg, ring)}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
              </div>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{delta}</p>
            </div>
          ))}
        </div>

        {/* ── Featured Departments + Recent Exams (side by side) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Recent Exams */}
          <div className="lg:col-span-2 premium-card p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" /> Recent Exams
              </h2>
              <Link href="/exams" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_EXAMS.map((exam) => (
                <Link key={exam.slug} href={`/exams/${exam.slug}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{exam.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{exam.university} · {exam.year}</p>
                  </div>
                  {/* Score badge */}
                  <div className={cn("px-2 py-0.5 rounded-full text-xs font-bold shrink-0",
                    exam.score >= 80 ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : exam.score >= 60 ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  )}>
                    {exam.score}%
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link href="/mock-exam"
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span className="text-xs font-semibold">Mock Test</span>
              </Link>
              <Link href="/ai-assistant"
                className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold">AI Assistant</span>
              </Link>
            </div>
          </div>

          {/* Featured Departments */}
          <div className="lg:col-span-3 premium-card p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-amber-500" /> Featured Departments
              </h2>
              <Link href="/departments" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                All {DEPARTMENTS.length} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <Link key={dept.slug} href={`/departments/${dept.slug}`}
                  className="relative flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group overflow-hidden"
                >
                  {/* Fav star */}
                  <button onClick={(e) => { e.preventDefault(); toggleFav(dept.slug); }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Toggle favourite"
                  >
                    <Star className={cn("w-3.5 h-3.5", favDepts.includes(dept.slug) ? "fill-amber-400 text-amber-400" : "text-gray-400")} />
                  </button>
                  {favDepts.includes(dept.slug) && (
                    <Star className="absolute top-2 right-2 w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  )}
                  <span className="text-3xl leading-none">{dept.icon}</span>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center leading-snug">{dept.name}</p>
                  <p className="text-xs text-gray-400">{dept.exams} exams</p>
                </Link>
              ))}
            </div>
            {/* Subscription CTA */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200 dark:border-amber-700/30 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-300">Unlock Premium Access</p>
                <p className="text-xs text-amber-700/60 dark:text-amber-400/60 mt-0.5">AI explanations, offline exams, certificates</p>
              </div>
              <Link href="/pricing"
                className="shrink-0 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-md shadow-amber-500/30"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </div>

        {/* ── All Departments Grid ── */}
        <div className="premium-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" /> All Departments
            </h2>
            <span className="text-xs text-gray-400">{filtered.length} departments</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map((dept) => (
              <Link key={dept.slug} href={`/departments/${dept.slug}`}
                className="group flex flex-col items-center gap-2 p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer text-center"
              >
                <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl shadow-sm", dept.color)}>
                  <span>{dept.icon}</span>
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{dept.name}</p>
                <p className="text-[10px] text-gray-400">{dept.exams} exams</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Download & Progress ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="premium-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Offline Downloads</p>
              <p className="text-xs text-gray-400 mt-0.5">3 exams downloaded · PDF, DOCX, PPT supported</p>
            </div>
            <Link href="/downloads" className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors shrink-0">
              Manage
            </Link>
          </div>
          <div className="premium-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Progress Report</p>
              <p className="text-xs text-gray-400 mt-0.5">4 subjects · 68% avg completion</p>
            </div>
            <Link href="/results" className="px-3 py-1.5 rounded-lg border border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400 text-xs font-medium hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors shrink-0">
              View
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
