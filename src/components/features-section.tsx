import { FileText, Bot, ShieldCheck, Download, Smartphone, BarChart3, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FileText,
    title: "500+ Past Exam Papers",
    description: "Comprehensive library of past exit exam papers from all departments and universities across Ethiopia.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-100 dark:border-blue-800",
    tag: "FREE",
    tagColor: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Bot,
    title: "AI Study Assistant",
    description: "Get instant explanations, personalized study tips, and intelligent guidance for every question.",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    border: "border-violet-100 dark:border-violet-800",
    tag: "AI",
    tagColor: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Clock,
    title: "Timed Mock Exams",
    description: "Full-length, timed exit exam simulations that mirror the real exam experience with instant scoring.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
    tag: "POPULAR",
    tagColor: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download exams in PDF, DOCX, and PPT formats. Study anywhere, anytime — even without internet.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-100 dark:border-amber-800",
    tag: "PREMIUM",
    tagColor: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your performance across subjects, view score trends, and get smart study recommendations.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-100 dark:border-rose-800",
    tag: "NEW",
    tagColor: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn shareable achievement certificates when you pass mock exams. Share on LinkedIn & Telegram.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-100 dark:border-cyan-800",
    tag: "PREMIUM",
    tagColor: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Fully responsive on mobile, tablet, and desktop. Study on any device with the same premium experience.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-100 dark:border-indigo-800",
    tag: "FREE",
    tagColor: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Enterprise-grade security via Supabase. Your data and exam progress are always safe and private.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-100 dark:border-teal-800",
    tag: "FREE",
    tagColor: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0a0f1e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title}
                className={cn("group premium-card p-6 hover:-translate-y-1 cursor-default", feature.border)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", feature.bg)}>
                    <Icon className={cn("w-5 h-5", feature.color)} />
                  </div>
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", feature.tagColor)}>
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1.5 leading-snug">{feature.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
