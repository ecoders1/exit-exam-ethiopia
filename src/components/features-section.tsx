import {
  FileText,
  Bot,
  ShieldCheck,
  Download,
  Smartphone,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FileText,
    title: "Previous Exit Exams",
    description:
      "Access a comprehensive library of past exit exam papers for all departments and universities across Ethiopia.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-100 dark:border-blue-800",
  },
  {
    icon: Bot,
    title: "AI Study Assistant",
    description:
      "Get instant explanations, study tips, and personalized guidance from our intelligent AI-powered study companion.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-100 dark:border-violet-800",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Your data and progress are protected with enterprise-grade security powered by Supabase authentication.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
  },
  {
    icon: Download,
    title: "Exam Downloads",
    description:
      "Download exam papers in PDF format for offline study, anytime and anywhere, even without internet access.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-100 dark:border-amber-800",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Fully responsive design works seamlessly on mobile phones, tablets, and desktop computers.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-100 dark:border-rose-800",
  },
  {
    icon: Search,
    title: "Fast Search",
    description:
      "Instantly find exams by university, department, year, or subject with our powerful search engine.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-100 dark:border-cyan-800",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 mb-4 uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
            A complete toolkit designed specifically for Ethiopian university students preparing for exit exams.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "group p-7 rounded-2xl border bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                  feature.border
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
                    feature.bg
                  )}
                >
                  <Icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
