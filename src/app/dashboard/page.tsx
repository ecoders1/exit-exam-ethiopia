"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, FileText, TrendingUp, Clock, ArrowRight,
  Search, Bell, ChevronRight, Star, Download, Target,
  Flame, Award, Zap, BarChart3, BookMarked, GraduationCap,
  Bot, Home, Layers, User, CheckCircle2, Play,
  Trophy, Shield, Wifi, WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  { name: "Computer Science",       icon: "💻", slug: "cs",       exams: 45, color: "from-blue-500 to-blue-700",      category: "Technology" },
  { name: "Software Engineering",   icon: "🖥️", slug: "se",       exams: 38, color: "from-indigo-500 to-indigo-700",  category: "Technology" },
  { name: "Information Technology", icon: "🌐", slug: "it",       exams: 32, color: "from-cyan-500 to-cyan-700",      category: "Technology" },
  { name: "Nursing",                icon: "🩺", slug: "nursing",  exams: 42, color: "from-rose-500 to-rose-700",      category: "Health" },
  { name: "Midwifery",              icon: "👶", slug: "midwifery",exams: 30, color: "from-pink-500 to-pink-700",      category: "Health" },
  { name: "Public Health",          icon: "🏥", slug: "ph",       exams: 36, color: "from-teal-500 to-teal-700",      category: "Health" },
  { name: "Medicine",               icon: "⚕️", slug: "medicine", exams: 50, color: "from-emerald-500 to-emerald-700",category: "Health" },
  { name: "Pharmacy",               icon: "💊", slug: "pharmacy", exams: 28, color: "from-green-500 to-green-700",    category: "Health" },
  { name: "Economics",              icon: "📊", slug: "econ",     exams: 25, color: "from-amber-500 to-amber-700",    category: "Business" },
  { name: "Accounting & Finance",   icon: "💰", slug: "acct",     exams: 27, color: "from-yellow-500 to-yellow-700",  category: "Business" },
  { name: "Management",             icon: "📋", slug: "mgmt",     exams: 24, color: "from-orange-500 to-orange-700",  category: "Business" },
  { name: "Civil Engineering",      icon: "🏗️", slug: "civil",    exams: 38, color: "from-stone-500 to-stone-700",    category: "Engineering" },
  { name: "Electrical Engineering", icon: "⚡", slug: "elec",     exams: 35, color: "from-violet-500 to-violet-700",  category: "Engineering" },
  { name: "Mechanical Engineering", icon: "⚙️", slug: "mech",     exams: 32, color: "from-slate-500 to-slate-700",    category: "Engineering" },
  { name: "Architecture",           icon: "🏛️", slug: "arch",     exams: 18, color: "from-purple-500 to-purple-700",  category: "Engineering" },
  { name: "Law",                    icon: "⚖️", slug: "law",      exams: 30, color: "from-red-500 to-red-700",        category: "Social" },
  { name: "Agriculture",            icon: "🌾", slug: "agri",     exams: 22, color: "from-lime-500 to-lime-700",      category: "Agriculture" },
  { name: "Veterinary Medicine",    icon: "🐾", slug: "vet",      exams: 20, color: "from-fuchsia-500 to-fuchsia-700",category: "Agriculture" },
  { name: "Biology",                icon: "🔬", slug: "bio",      exams: 24, color: "from-emerald-400 to-emerald-600",category: "Science" },
  { name: "Chemistry",              icon: "⚗️", slug: "chem",     exams: 22, color: "from-blue-400 to-blue-600",      category: "Science" },
  { name: "Mathematics",            icon: "📐", slug: "math",     exams: 28, color: "from-indigo-400 to-indigo-600",  category: "Science" },
  { name: "Physics",                icon: "🔭", slug: "phys",     exams: 25, color: "from-sky-500 to-sky-700",        category: "Science" },
  { name: "English Language",       icon: "📝", slug: "eng",      exams: 20, color: "from-gray-500 to-gray-700",      category: "Arts" },
  { name: "Psychology",             icon: "🧠", slug: "psych",    exams: 18, color: "from-pink-400 to-pink-600",      category: "Social" },
  { name: "Sociology",              icon: "👥", slug: "socio",    exams: 16, color: "from-teal-400 to-teal-600",      category: "Social" },
  { name: "Geography",              icon: "🗺️", slug: "geo",      exams: 15, color: "from-green-400 to-green-600",    category: "Arts" },
  { name: "History",                icon: "📜", slug: "hist",     exams: 14, color: "from-amber-400 to-amber-600",    category: "Arts" },
];

const RECENT_EXAMS = [
  { title: "Computer Science Exit Exam 2024", university: "AAU", year: 2024, dept: "cs",     score: 82, slug: "cs-aau-2024",   status: "completed" },
  { title: "Civil Engineering Exit Exam 2024", university: "JU",  year: 2024, dept: "civil",  score: 74, slug: "civil-ju-2024", status: "completed" },
  { title: "Medicine Exit Exam 2023",           university: "HU",  year: 2023, dept: "med",    score: 90, slug: "med-hu-2023",   status: "completed" },
];

const NOTIFICATIONS = [
  { id: 1, text: "New exam uploaded: Electrical Engineering 2024", time: "2h ago", unread: true,  type: "exam" },
  { id: 2, text: "Your mock test result is ready — 82%",          time: "5h ago", unread: true,  type: "result" },
  { id: 3, text: "AI Study Assistant updated with new features",  time: "1d ago",  unread: false, type: "system" },
  { id: 4, text: "Medicine 2023 exam added by admin",              time: "2d ago",  unread: false, type: "exam" },
];

const QUICK_ACTIONS = [
  { label: "Mock Test",   href: "/mock-exam",     icon: Target,     color: "bg-blue-600 hover:bg-blue-700",    shadow: "shadow-blue-600/25" },
  { label: "AI Tutor",    href: "/ai-assistant",  icon: Bot,        color: "bg-violet-600 hover:bg-violet-700",shadow: "shadow-violet-600/25" },
  { label: "Downloads",   href: "/downloads",     icon: Download,   color: "bg-teal-600 hover:bg-teal-700",    shadow: "shadow-teal-600/25" },
  { label: "My Results",  href: "/results",       icon: BarChart3,  color: "bg-amber-500 hover:bg-amber-600",  shadow: "shadow-amber-500/25" },
];

// Bottom nav items for mobile
const BOTTOM_NAV = [
  { href: "/dashboard", label: "Home",     icon: Home },
  { href: "/departments", label: "Depts", icon: Layers },
  { href: "/mock-exam",  label: "Exams",   icon: Play },
  { href: "/results",    label: "Results", icon: BarChart3 },
  { href: "/dashboard",  label: "Profile", icon: User },
];

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [favDepts, setFavDepts] = useState<string[]>(["cs", "medicine"]);
  const [activeNav, setActiveNav] = useState("Home");
  const [isOnline] = useState(true);

  const filtered = DEPARTMENTS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleFav = (slug: string) =>
    setFavDepts((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] pb-20 lg:pb-0">

      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#0d1117]/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-1 shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/25 group-hover:shadow-blue-600/40 transition-shadow">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-black text-sm text-gray-900 dark:text-white">Exit Exam </span>
              <span className="font-black text-sm text-amber-500">Ethiopia</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search departments…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-400 dark:focus:border-blue-600 focus:bg-white dark:focus:bg-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            {/* Online indicator */}
            <div className={cn("hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
              isOnline ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-900/20 text-red-500"
            )}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isOnline ? "Online" : "Offline"}
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0d1117] animate-pulse" />
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Notifications</p>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-semibold">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className={cn(
                        "px-4 py-3.5 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0",
                        n.unread && "bg-blue-50/60 dark:bg-blue-900/10"
                      )}>
                        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                          n.type === "exam" ? "bg-blue-100 dark:bg-blue-900/30" :
                          n.type === "result" ? "bg-emerald-100 dark:bg-emerald-900/30" :
                          "bg-gray-100 dark:bg-gray-800"
                        )}>
                          {n.type === "exam" ? <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> :
                           n.type === "result" ? <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> :
                           <Bell className="w-4 h-4 text-gray-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{n.text}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                        {n.unread && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
                    <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-black shadow-md shadow-blue-600/25 cursor-pointer hover:shadow-blue-600/40 transition-shadow">
                A
              </div>
              {/* Premium badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Welcome Hero Banner ── */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a3580] via-[#1a56db] to-[#1e40af] p-5 sm:p-7 text-white shadow-xl shadow-blue-600/20 border border-blue-500/20">
          {/* BG accents */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(ellipse at 85% 15%, rgba(245,158,11,0.35) 0%, transparent 45%), radial-gradient(ellipse at 10% 85%, rgba(255,255,255,0.08) 0%, transparent 40%)",
          }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar with ring */}
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl font-black text-white shadow-lg backdrop-blur-sm">
                  A
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-blue-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
              <div>
                <p className="text-blue-200/80 text-xs font-medium">Welcome back,</p>
                <h1 className="text-xl sm:text-2xl font-black mt-0.5">Abebe Kebede 👋</h1>
                <p className="text-blue-100/60 text-xs mt-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-300 inline-block" />
                  Computer Science · Addis Ababa University · Year 4
                </p>
              </div>
            </div>

            {/* Streak & Rank cards */}
            <div className="flex items-center gap-3">
              <div className="glass rounded-xl px-4 py-3 text-center border border-white/20 shadow-sm">
                <div className="flex items-center gap-1.5 justify-center">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="text-xl font-black">7</span>
                </div>
                <p className="text-[10px] text-blue-200/60 mt-0.5 font-medium">Day Streak</p>
              </div>
              <div className="glass rounded-xl px-4 py-3 text-center border border-white/20 shadow-sm">
                <div className="flex items-center gap-1.5 justify-center">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xl font-black">#42</span>
                </div>
                <p className="text-[10px] text-blue-200/60 mt-0.5 font-medium">National Rank</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-100/80">Overall Progress — 68%</span>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Good progress!</span>
              </div>
            </div>
            <div className="h-2.5 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 bar-animate"
                style={{
                  width: "68%",
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b, #fcd34d)",
                  boxShadow: "0 0 12px rgba(245,158,11,0.5)",
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] text-blue-200/40">34 / 50 exams completed</span>
              <span className="text-[10px] text-blue-200/40">Target: 80%</span>
            </div>
          </div>
        </div>

        {/* ── Quick Actions (mobile-first row) ── */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {QUICK_ACTIONS.map(({ label, href, icon: Icon, color, shadow }) => (
            <Link key={label} href={href}
              className={cn("flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl text-white transition-all hover:scale-105 shadow-md", color, shadow)}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-bold leading-none">{label}</span>
            </Link>
          ))}
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: FileText,  label: "Exams Accessed",  value: "12",  color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-900/20",   ring: "ring-blue-100 dark:ring-blue-900/30",   delta: "+3 this week",  deltaColor: "text-emerald-600 dark:text-emerald-400" },
            { icon: BookOpen,  label: "Mock Tests",       value: "4",   color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", ring: "ring-emerald-100 dark:ring-emerald-900/30", delta: "+1 today",      deltaColor: "text-emerald-600 dark:text-emerald-400" },
            { icon: BarChart3, label: "Avg. Score",       value: "74%", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20",  ring: "ring-violet-100 dark:ring-violet-900/30",  delta: "+5% vs last",   deltaColor: "text-emerald-600 dark:text-emerald-400" },
            { icon: Clock,     label: "Study Hours",      value: "28h", color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-900/20",   ring: "ring-amber-100 dark:ring-amber-900/30",   delta: "Goal: 40h",     deltaColor: "text-amber-600 dark:text-amber-400" },
          ].map(({ icon: Icon, label, value, color, bg, ring, delta, deltaColor }) => (
            <div key={label} className="premium-card p-4 sm:p-5 flex flex-col gap-3 hover-lift">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center ring-4 shrink-0", bg, ring)}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
              <p className={cn("text-xs font-semibold", deltaColor)}>{delta}</p>
            </div>
          ))}
        </div>

        {/* ── Featured Content + Recent Exams ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Recent Exams */}
          <div className="lg:col-span-2 premium-card p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-500" /> Recent Exams
              </h2>
              <Link href="/exams" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {RECENT_EXAMS.map((exam) => (
                <Link key={exam.slug} href={`/exams/${exam.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{exam.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{exam.university} · {exam.year}</p>
                  </div>
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

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <Link href="/mock-exam"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Target className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">Mock Test</span>
              </Link>
              <Link href="/ai-assistant"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">AI Tutor</span>
              </Link>
            </div>
          </div>

          {/* Featured Departments */}
          <div className="lg:col-span-3 premium-card p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                <BookMarked className="w-4 h-4 text-amber-500" /> Featured Departments
              </h2>
              <Link href="/departments" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium">
                All {DEPARTMENTS.length} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {DEPARTMENTS.slice(0, 9).map((dept) => (
                <Link key={dept.slug} href={`/departments/${dept.slug}`}
                  className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group overflow-hidden"
                >
                  {/* Fav star */}
                  <button onClick={(e) => { e.preventDefault(); toggleFav(dept.slug); }}
                    className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Toggle favourite"
                  >
                    <Star className={cn("w-3 h-3", favDepts.includes(dept.slug) ? "fill-amber-400 text-amber-400" : "text-gray-300")} />
                  </button>
                  {favDepts.includes(dept.slug) && (
                    <Star className="absolute top-1.5 right-1.5 w-3 h-3 fill-amber-400 text-amber-400 z-10" />
                  )}
                  {/* Icon in gradient bg */}
                  <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg shadow-sm", dept.color)}>
                    {dept.icon}
                  </div>
                  <p className="text-[10px] font-semibold text-gray-800 dark:text-gray-200 text-center leading-tight">{dept.name}</p>
                  <p className="text-[9px] text-gray-400">{dept.exams} exams</p>
                </Link>
              ))}
            </div>

            {/* Premium CTA */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200 dark:border-amber-700/30 p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-300">Unlock Premium Access</p>
                <p className="text-[10px] text-amber-700/60 dark:text-amber-400/60">AI · Offline · Certificates · 150 ETB/mo</p>
              </div>
              <Link href="/pricing"
                className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-amber-500/30"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </div>

        {/* ── All Departments Grid ── */}
        <div className="premium-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-blue-500" /> All {DEPARTMENTS.length} Departments
            </h2>
            <span className="text-xs text-gray-400">{filtered.length} showing</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {filtered.map((dept) => (
              <Link key={dept.slug} href={`/departments/${dept.slug}`}
                className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer text-center"
              >
                <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg shadow-sm", dept.color)}>
                  {dept.icon}
                </div>
                <p className="text-[9px] font-semibold text-gray-600 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-tight">{dept.name}</p>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm text-gray-400">No departments found</p>
              <button onClick={() => setSearchQuery("")} className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">Clear search</button>
            </div>
          )}
        </div>

        {/* ── Download & Progress Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="premium-card p-4 flex items-center gap-4 hover-lift">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Offline Downloads</p>
              <p className="text-xs text-gray-400 mt-0.5">3 exams · PDF, DOCX, PPT supported</p>
            </div>
            <Link href="/downloads" className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors shrink-0">
              Manage
            </Link>
          </div>
          <div className="premium-card p-4 flex items-center gap-4 hover-lift">
            <div className="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Progress Report</p>
              <p className="text-xs text-gray-400 mt-0.5">4 subjects · 68% avg completion</p>
            </div>
            <Link href="/results" className="px-3 py-1.5 rounded-lg border border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400 text-xs font-semibold hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors shrink-0">
              View
            </Link>
          </div>
        </div>

        {/* ── AI Study Tip card ── */}
        <div className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-xl shadow-violet-600/20">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(ellipse at 90% 10%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          }} />
          <div className="relative flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-bold text-violet-200 uppercase tracking-wider">AI Study Tip</p>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-bold">PREMIUM</span>
              </div>
              <p className="text-sm font-semibold leading-relaxed">
                Focus on <strong className="text-yellow-300">Data Structures & Algorithms</strong> — your weakest area. Spend 2 hours on binary trees today.
              </p>
              <Link href="/ai-assistant" className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-violet-200 hover:text-white transition-colors">
                Chat with AI Tutor <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 nav-shadow">
        <div className="flex items-center justify-around px-2 py-2">
          {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
            const isActive = activeNav === label;
            return (
              <Link key={label} href={href}
                onClick={() => setActiveNav(label)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
                )}
              >
                {isActive ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg -m-1" />
                    <Icon className="relative w-5 h-5" />
                  </div>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                <span className={cn("text-[9px] font-semibold", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-600")}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
