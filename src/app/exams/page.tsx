import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Download, Eye, FileText, Calendar, Search } from "lucide-react";
import Link from "next/link";

const exams = [
  { id: 1, title: "Computer Science Exit Exam", university: "Addis Ababa University", department: "Computer Science & IT", year: 2024, pages: 12, slug: "cs-aau-2024" },
  { id: 2, title: "Civil Engineering Exit Exam", university: "Jimma University", department: "Civil Engineering", year: 2024, pages: 16, slug: "civil-ju-2024" },
  { id: 3, title: "Medicine Exit Exam", university: "Hawassa University", department: "Medicine", year: 2023, pages: 20, slug: "med-hu-2023" },
  { id: 4, title: "Law Exit Exam", university: "Mekelle University", department: "Law", year: 2024, pages: 14, slug: "law-mu-2024" },
  { id: 5, title: "Accounting & Finance Exit Exam", university: "Bahir Dar University", department: "Accounting & Finance", year: 2023, pages: 10, slug: "acct-bdu-2023" },
  { id: 6, title: "Electrical Engineering Exit Exam", university: "Gondar University", department: "Electrical Engineering", year: 2023, pages: 18, slug: "ee-uog-2023" },
  { id: 7, title: "Pharmacy Exit Exam", university: "Haramaya University", department: "Pharmacy", year: 2024, pages: 15, slug: "pharm-haru-2024" },
  { id: 8, title: "Economics Exit Exam", university: "Arba Minch University", department: "Economics", year: 2022, pages: 11, slug: "econ-amu-2022" },
  { id: 9, title: "Mechanical Engineering Exit Exam", university: "Jimma University", department: "Mechanical Engineering", year: 2024, pages: 17, slug: "me-ju-2024" },
];

export default function ExamsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <section className="pt-28 pb-14 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Exam Papers</h1>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            Access past exit exam papers from all Ethiopian universities and departments.
          </p>
          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search by university, department, or year…"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-white/20 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{exams.length}</span> exam papers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="flex flex-col p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{exam.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{exam.university}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {exam.department}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {exam.year}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    {exam.pages} pages
                  </span>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </Link>
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
