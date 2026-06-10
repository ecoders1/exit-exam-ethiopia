import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookOpen, FileText, TrendingUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const recentExams = [
    { title: "Computer Science Exit Exam", university: "AAU", year: 2024, slug: "cs-aau-2024" },
    { title: "Civil Engineering Exit Exam", university: "JU", year: 2024, slug: "civil-ju-2024" },
    { title: "Medicine Exit Exam", university: "HU", year: 2023, slug: "med-hu-2023" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Continue your exam preparation.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { icon: FileText, label: "Exams Accessed", value: "12", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { icon: BookOpen, label: "Mock Exams Taken", value: "4", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { icon: TrendingUp, label: "Avg. Score", value: "74%", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
            { icon: Clock, label: "Study Hours", value: "28", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Recent Exams */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900 dark:text-white">Recent Exam Papers</h2>
            <Link href="/exams" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentExams.map((exam) => (
              <Link
                key={exam.slug}
                href={`/exams/${exam.slug}`}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{exam.title}</p>
                    <p className="text-xs text-gray-400">{exam.university} · {exam.year}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
