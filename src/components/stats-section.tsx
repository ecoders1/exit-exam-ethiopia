"use client";

import { useEffect, useRef, useState } from "react";
import { University, BookOpen, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { icon: University, value: 45,    suffix: "+", label: "Universities",  color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-50 dark:bg-blue-900/20",    ring: "ring-blue-100 dark:ring-blue-900/30",    accent: "#1a56db" },
  { icon: BookOpen,   value: 27,    suffix: "+", label: "Departments",   color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-900/20",   ring: "ring-amber-100 dark:ring-amber-900/30",   accent: "#f59e0b" },
  { icon: FileText,   value: 500,   suffix: "+", label: "Exam Papers",   color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20", ring: "ring-violet-100 dark:ring-violet-900/30", accent: "#7c3aed" },
  { icon: Users,      value: 25000, suffix: "+", label: "Students",      color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", ring: "ring-emerald-100 dark:ring-emerald-900/30", accent: "#059669" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ icon: Icon, value, suffix, label, color, bg, ring, animate }: (typeof stats)[0] & { animate: boolean }) {
  const count = useCountUp(value, 2200, animate);

  return (
    <div className="group relative premium-card p-7 flex flex-col items-center text-center overflow-hidden transition-all hover:-translate-y-1">
      {/* Glow effect on hover */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl", bg)} style={{ filter: "blur(20px)" }} />
      
      <div className={cn("relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ring-4 transition-all group-hover:scale-110", bg, ring)}>
        <Icon className={cn("w-7 h-7", color)} />
      </div>
      
      <div className="relative">
        <div className="text-4xl font-black text-gray-900 dark:text-white">
          {count.toLocaleString()}
          <span className={cn("ml-1 text-3xl", color)}>{suffix}</span>
        </div>
        <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
