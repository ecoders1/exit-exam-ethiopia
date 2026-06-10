"use client";

import { useEffect, useRef, useState } from "react";
import { University, BookOpen, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: University,
    value: 45,
    suffix: "+",
    label: "Total Universities",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: BookOpen,
    value: 120,
    suffix: "+",
    label: "Total Departments",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: FileText,
    value: 500,
    suffix: "+",
    label: "Total Exams",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    icon: Users,
    value: 25000,
    suffix: "+",
    label: "Total Students",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  color,
  bg,
  animate,
}: (typeof stats)[0] & { animate: boolean }) {
  const count = useCountUp(value, 2000, animate);

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", bg)}>
        <Icon className={cn("w-7 h-7", color)} />
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {count.toLocaleString()}
        <span className={cn("ml-0.5", color)}>{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trusted by Students Across Ethiopia
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Join thousands of students who use Exit Exam Ethiopia to prepare for their national examinations.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
