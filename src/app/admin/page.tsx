"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { University, BookOpen, FileText, Users, TrendingUp, Eye, Download } from "lucide-react";
import Link from "next/link";

interface Stats {
  universities: number;
  departments: number;
  exams: number;
  users: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ universities: 0, departments: 0, exams: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      const [uni, dept, exams, users] = await Promise.all([
        supabase.from("universities").select("*", { count: "exact", head: true }),
        supabase.from("departments").select("*", { count: "exact", head: true }),
        supabase.from("exams").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        universities: uni.count ?? 0,
        departments: dept.count ?? 0,
        exams: exams.count ?? 0,
        users: users.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Universities", value: stats.universities, icon: University, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", href: "/admin/universities" },
    { label: "Departments", value: stats.departments, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", href: "/admin/departments" },
    { label: "Exam Papers", value: stats.exams, icon: FileText, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20", href: "/admin/exams" },
    { label: "Students", value: stats.users, icon: Users, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", href: "/admin/users" },
  ];

  const quickActions = [
    { label: "Add University", href: "/admin/universities/new", icon: University },
    { label: "Add Department", href: "/admin/departments/new", icon: BookOpen },
    { label: "Upload Exam", href: "/admin/exams/new", icon: FileText },
    { label: "View Students", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of Exit Exam Ethiopia platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href}
            className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bg}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {loading ? <span className="animate-pulse">—</span> : value}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: "Platform Growth", value: "Active", color: "text-emerald-500" },
          { icon: Eye, label: "Public Exams", value: `${stats.exams} visible`, color: "text-blue-500" },
          { icon: Download, label: "Downloads", value: "Enabled", color: "text-violet-500" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <Icon className={`w-8 h-8 ${color}`} />
            <div>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
