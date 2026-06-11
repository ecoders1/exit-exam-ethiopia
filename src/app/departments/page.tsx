"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Search, Star, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const UNIVERSITIES = [
  "All Universities", "Addis Ababa University", "Jimma University", "Mekelle University",
  "Hawassa University", "Bahir Dar University", "University of Gondar",
  "Haramaya University", "Arba Minch University",
];

const YEARS = ["All Years", "2024", "2023", "2022", "2021", "2020"];

const DEPARTMENTS = [
  { name: "Computer Science",       icon: "💻", slug: "cs",       exams: 45, category: "Technology",  color: "from-blue-500/20 to-blue-600/10",   border: "border-blue-200 dark:border-blue-800",   badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" },
  { name: "Software Engineering",   icon: "🖥️", slug: "se",       exams: 38, category: "Technology",  color: "from-indigo-500/20 to-indigo-600/10", border: "border-indigo-200 dark:border-indigo-800", badge: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" },
  { name: "Information Technology", icon: "🌐", slug: "it",       exams: 32, category: "Technology",  color: "from-cyan-500/20 to-cyan-600/10",    border: "border-cyan-200 dark:border-cyan-800",   badge: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300" },
  { name: "Nursing",                icon: "🩺", slug: "nursing",  exams: 42, category: "Health",      color: "from-rose-500/20 to-rose-600/10",    border: "border-rose-200 dark:border-rose-800",   badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300" },
  { name: "Midwifery",              icon: "👶", slug: "midwifery",exams: 30, category: "Health",      color: "from-pink-500/20 to-pink-600/10",    border: "border-pink-200 dark:border-pink-800",   badge: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300" },
  { name: "Public Health",          icon: "🏥", slug: "ph",       exams: 36, category: "Health",      color: "from-teal-500/20 to-teal-600/10",    border: "border-teal-200 dark:border-teal-800",   badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" },
  { name: "Medicine",               icon: "⚕️", slug: "medicine", exams: 50, category: "Health",      color: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-200 dark:border-emerald-800", badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" },
  { name: "Pharmacy",               icon: "💊", slug: "pharmacy", exams: 28, category: "Health",      color: "from-green-500/20 to-green-600/10",  border: "border-green-200 dark:border-green-800",  badge: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" },
  { name: "Economics",              icon: "📊", slug: "econ",     exams: 25, category: "Business",    color: "from-amber-500/20 to-amber-600/10",  border: "border-amber-200 dark:border-amber-800",  badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" },
  { name: "Accounting & Finance",   icon: "💰", slug: "acct",     exams: 27, category: "Business",    color: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-200 dark:border-yellow-800", badge: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" },
  { name: "Management",             icon: "📋", slug: "mgmt",     exams: 24, category: "Business",    color: "from-orange-500/20 to-orange-600/10", border: "border-orange-200 dark:border-orange-800", badge: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300" },
  { name: "Civil Engineering",      icon: "🏗️", slug: "civil",    exams: 38, category: "Engineering", color: "from-stone-500/20 to-stone-600/10",  border: "border-stone-200 dark:border-stone-800",  badge: "bg-stone-100 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300" },
  { name: "Electrical Engineering", icon: "⚡", slug: "elec",     exams: 35, category: "Engineering", color: "from-violet-500/20 to-violet-600/10", border: "border-violet-200 dark:border-violet-800", badge: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" },
  { name: "Mechanical Engineering", icon: "⚙️", slug: "mech",     exams: 32, category: "Engineering", color: "from-slate-500/20 to-slate-600/10",  border: "border-slate-200 dark:border-slate-800",  badge: "bg-slate-100 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300" },
  { name: "Architecture",           icon: "🏛️", slug: "arch",     exams: 18, category: "Engineering", color: "from-purple-500/20 to-purple-600/10", border: "border-purple-200 dark:border-purple-800", badge: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" },
  { name: "Law",                    icon: "⚖️", slug: "law",      exams: 30, category: "Social",      color: "from-red-500/20 to-red-600/10",      border: "border-red-200 dark:border-red-800",     badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" },
  { name: "Agriculture",            icon: "🌾", slug: "agri",     exams: 22, category: "Agriculture", color: "from-lime-500/20 to-lime-600/10",    border: "border-lime-200 dark:border-lime-800",   badge: "bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-300" },
  { name: "Veterinary Medicine",    icon: "🐾", slug: "vet",      exams: 20, category: "Agriculture", color: "from-fuchsia-500/20 to-fuchsia-600/10", border: "border-fuchsia-200 dark:border-fuchsia-800", badge: "bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300" },
  { name: "Biology",                icon: "🔬", slug: "bio",      exams: 24, category: "Science",     color: "from-emerald-400/20 to-emerald-500/10", border: "border-emerald-200 dark:border-emerald-800", badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" },
  { name: "Chemistry",              icon: "⚗️", slug: "chem",     exams: 22, category: "Science",     color: "from-blue-400/20 to-blue-500/10",    border: "border-blue-200 dark:border-blue-800",   badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" },
  { name: "Mathematics",            icon: "📐", slug: "math",     exams: 28, category: "Science",     color: "from-indigo-400/20 to-indigo-500/10", border: "border-indigo-200 dark:border-indigo-800", badge: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" },
  { name: "Physics",                icon: "🔭", slug: "phys",     exams: 25, category: "Science",     color: "from-sky-500/20 to-sky-600/10",      border: "border-sky-200 dark:border-sky-800",     badge: "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300" },
  { name: "English Language",       icon: "📝", slug: "eng",      exams: 20, category: "Arts",        color: "from-gray-400/20 to-gray-500/10",    border: "border-gray-200 dark:border-gray-800",   badge: "bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300" },
  { name: "Psychology",             icon: "🧠", slug: "psych",    exams: 18, category: "Social",      color: "from-pink-400/20 to-pink-500/10",    border: "border-pink-200 dark:border-pink-800",   badge: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300" },
  { name: "Sociology",              icon: "👥", slug: "socio",    exams: 16, category: "Social",      color: "from-teal-400/20 to-teal-500/10",    border: "border-teal-200 dark:border-teal-800",   badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300" },
  { name: "Geography",              icon: "🗺️", slug: "geo",      exams: 15, category: "Arts",        color: "from-green-400/20 to-green-500/10",  border: "border-green-200 dark:border-green-800",  badge: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" },
  { name: "History",                icon: "📜", slug: "hist",     exams: 14, category: "Arts",        color: "from-amber-400/20 to-amber-500/10",  border: "border-amber-200 dark:border-amber-800",  badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" },
];

const CATEGORIES = ["All", "Technology", "Health", "Engineering", "Business", "Science", "Social", "Agriculture", "Arts"];

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [university, setUniversity] = useState("All Universities");
  const [year, setYear] = useState("All Years");
  const [favs, setFavs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const toggleFav = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavs((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
  };

  const filtered = DEPARTMENTS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || d.category === category;
    const matchFav = !showFavsOnly || favs.includes(d.slug);
    return matchSearch && matchCat && matchFav;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b4b] via-[#1a3580] to-[#1e3a8a]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 60%, rgba(245,158,11,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.2) 0%, transparent 40%)" }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {DEPARTMENTS.length} departments across all universities
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Find Your <span className="text-gold-gradient">Department</span>
          </h1>
          <p className="text-blue-100/70 text-lg max-w-xl mx-auto mb-8">
            Browse exit exam papers organized by field of study, university, and year.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search department name…"
              className="w-full pl-12 pr-14 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm shadow-xl shadow-black/10 border border-white/20"
            />
            <button onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Filters bar ── */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category pills */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                  category === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                )}
              >
                {cat}
              </button>
            ))}
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1 shrink-0" />
            {/* Favorites toggle */}
            <button onClick={() => setShowFavsOnly(!showFavsOnly)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all",
                showFavsOnly
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
              )}
            >
              <Star className={cn("w-3.5 h-3.5", showFavsOnly ? "fill-white" : "")} />
              Favourites {favs.length > 0 && `(${favs.length})`}
            </button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="py-3 flex flex-wrap gap-3 border-t border-gray-100 dark:border-gray-800">
              {/* University select */}
              <div className="relative">
                <select value={university} onChange={(e) => setUniversity(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {UNIVERSITIES.map((u) => <option key={u}>{u}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              {/* Year select */}
              <div className="relative">
                <select value={year} onChange={(e) => setYear(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Departments Grid ── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> of {DEPARTMENTS.length} departments
            {category !== "All" && <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">{category}</span>}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 dark:text-gray-400">No departments match your search.</p>
              <button onClick={() => { setSearch(""); setCategory("All"); setShowFavsOnly(false); }}
                className="mt-4 text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((dept) => (
                <Link key={dept.slug} href={`/departments/${dept.slug}`}
                  className={cn(
                    "group relative flex items-center gap-4 p-5 rounded-2xl border bg-white dark:bg-gray-900/50 hover:shadow-lg transition-all duration-200",
                    dept.border
                  )}
                >
                  {/* Gradient bg */}
                  <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", dept.color)} />

                  {/* Fav button */}
                  <button onClick={(e) => toggleFav(dept.slug, e)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle favourite"
                  >
                    <Star className={cn("w-4 h-4 transition-colors", favs.includes(dept.slug) ? "fill-amber-400 text-amber-400" : "text-gray-300 group-hover:text-gray-400")} />
                  </button>

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-700/80 dark:to-gray-800/40 flex items-center justify-center text-3xl shadow-sm shrink-0 border border-white/60 dark:border-gray-600/40">
                    {dept.icon}
                  </div>

                  <div className="relative flex-1 min-w-0 pr-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug truncate">{dept.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", dept.badge)}>{dept.category}</span>
                      <span className="text-xs text-gray-400">{dept.exams} exams</span>
                    </div>
                  </div>

                  <ArrowRight className="relative w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
