import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const departments = [
  { name: "Computer Science & IT", exams: 45, icon: "💻", slug: "cs-it" },
  { name: "Civil Engineering", exams: 38, icon: "🏗️", slug: "civil-engineering" },
  { name: "Electrical Engineering", exams: 35, icon: "⚡", slug: "electrical-engineering" },
  { name: "Mechanical Engineering", exams: 32, icon: "⚙️", slug: "mechanical-engineering" },
  { name: "Medicine & Health Sciences", exams: 50, icon: "🏥", slug: "medicine" },
  { name: "Pharmacy", exams: 28, icon: "💊", slug: "pharmacy" },
  { name: "Law", exams: 30, icon: "⚖️", slug: "law" },
  { name: "Economics", exams: 25, icon: "📊", slug: "economics" },
  { name: "Accounting & Finance", exams: 27, icon: "💰", slug: "accounting-finance" },
  { name: "Management", exams: 24, icon: "📋", slug: "management" },
  { name: "Agricultural Science", exams: 22, icon: "🌾", slug: "agriculture" },
  { name: "Natural Science", exams: 20, icon: "🔬", slug: "natural-science" },
  { name: "Architecture", exams: 18, icon: "🏛️", slug: "architecture" },
  { name: "Chemical Engineering", exams: 20, icon: "⚗️", slug: "chemical-engineering" },
  { name: "Environmental Science", exams: 16, icon: "🌿", slug: "environmental-science" },
  { name: "Social Work", exams: 14, icon: "🤝", slug: "social-work" },
  { name: "Psychology", exams: 15, icon: "🧠", slug: "psychology" },
  { name: "Journalism & Communication", exams: 12, icon: "📰", slug: "journalism" },
];

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <section className="pt-28 pb-14 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Departments</h1>
          <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
            Find exit exam papers organized by department and field of study.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{departments.length}</span> departments
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  {dept.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{dept.name}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{dept.exams} exam papers</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
