import Link from "next/link";
import { BookOpen, UserPlus, ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-6 uppercase tracking-wider">
          Get Started Today
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          Start Your Exam Preparation{" "}
          <span className="text-yellow-300">Today</span>
        </h2>
        <p className="mt-5 text-lg text-blue-100 max-w-2xl mx-auto">
          Join over 25,000 students already using Exit Exam Ethiopia. Access hundreds of past papers and AI study tools — completely free.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/exams"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold text-base hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
          >
            <BookOpen className="w-5 h-5" />
            Browse Exams
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/register"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/50 text-white font-semibold text-base hover:bg-white/10 transition-all"
          >
            <UserPlus className="w-5 h-5" />
            Create Account
          </Link>
        </div>

        <p className="mt-6 text-blue-200 text-sm">
          No credit card required · Free forever · 500+ exam papers
        </p>
      </div>
    </section>
  );
}
