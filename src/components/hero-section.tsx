import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Zap, Shield, Users, Play, Sparkles } from "lucide-react";

const FLOATING_TAGS = [
  { text: "Computer Science",   top: "15%", left: "5%",   delay: "0s" },
  { text: "Medicine",           top: "25%", right: "4%",  delay: "0.3s" },
  { text: "Civil Engineering",  top: "65%", left: "3%",   delay: "0.6s" },
  { text: "Law",                top: "72%", right: "6%",  delay: "0.9s" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080e1f]">

      {/* ── Layered backgrounds ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f55] to-[#0a1628]" />
      <div className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,86,219,0.30) 0%, transparent 70%)" }}
      />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />
      {/* Orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-700/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />

      {/* ── Floating department tags (desktop only) ── */}
      {FLOATING_TAGS.map((tag) => (
        <div key={tag.text}
          className="hidden lg:flex absolute glass border border-white/10 rounded-full px-4 py-2 text-xs text-white/60 items-center gap-2 animate-pulse"
          style={{ top: tag.top, left: tag.left, right: tag.right, animationDelay: tag.delay, animationDuration: "3s" } as React.CSSProperties}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          {tag.text}
        </div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-32 text-center space-y-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-medium backdrop-blur-sm">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>#1 Exit Exam Platform in Ethiopia</span>
          <span className="hidden sm:inline text-amber-400/50">·</span>
          <span className="hidden sm:inline">25,000+ Students</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
            Pass Your
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight text-blue-gradient">
            Exit Exam
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight text-gold-gradient">
            Ethiopia
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          Access 500+ past exam papers from 45+ Ethiopian universities. Take timed mock exams, get AI explanations, and track your progress to exam day.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register"
            className="group flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold hover:from-blue-500 hover:to-blue-600 transition-all shadow-2xl shadow-blue-600/30 text-sm"
          >
            <GraduationCap className="w-5 h-5" />
            Start Free — No Card Needed
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/exams"
            className="group flex items-center gap-2.5 px-7 py-4 rounded-2xl glass border border-white/15 text-white font-semibold hover:bg-white/10 transition-all text-sm"
          >
            <BookOpen className="w-5 h-5 text-blue-300" />
            Browse 500+ Exams
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          {[
            { icon: Shield,  text: "100% Free to Start" },
            { icon: Zap,     text: "AI Study Assistant" },
            { icon: Users,   text: "25,000+ Students" },
            { icon: BookOpen,text: "500+ Exam Papers" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
              <Icon className="w-4 h-4 text-blue-400/60" />
              {text}
            </div>
          ))}
        </div>

        {/* Social proof avatars */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex -space-x-2">
            {["A", "B", "D", "H", "Y"].map((initial, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d1f55] flex items-center justify-center text-xs font-bold text-white"
                style={{ background: `hsl(${210 + i * 30}, 70%, 50%)` }}
              >
                {initial}
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm">
            Joined by <strong className="text-white/70">25,000+</strong> students this year
          </p>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/30 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
