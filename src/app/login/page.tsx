"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap, Mail, Lock, Eye, EyeOff, Loader2,
  Phone, ChevronRight, Sparkles, Sun, Moon, KeyRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type AuthTab = "email" | "phone";

const DEPARTMENTS = [
  "Computer Science",
  "Civil Engineering",
  "Medicine",
  "Pharmacy",
];

const STATS = [
  { value: "500+", label: "Exam Papers" },
  { value: "45+",  label: "Universities" },
  { value: "25K+", label: "Students" },
];

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // ── tab state ──
  const [tab, setTab] = useState<AuthTab>("email");

  // ── email fields ──
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ── phone / OTP fields ──
  const [phone, setPhone]             = useState("");
  const [otpSent, setOtpSent]         = useState(false);
  const [otpCode, setOtpCode]         = useState("");
  const phoneInputRef                 = useRef<HTMLInputElement>(null);

  // ── shared ──
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // ──────────────────────────────────────────────
  //  Handlers
  // ──────────────────────────────────────────────

  /** Determine post-login destination based on role */
  const getRedirectUrl = async (): Promise<string> => {
    // Honour `?next=` param if present (e.g. middleware bounce)
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) return next;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return "/dashboard";
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    return profile?.role === "admin" ? "/admin" : "/dashboard";
  };

  /** Email + password sign-in */
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      const dest = await getRedirectUrl();
      router.push(dest);
      router.refresh();
    }
  };

  /** Phone OTP — step 1: request OTP */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    // Normalise: strip leading zeros / spaces, prepend +251
    const normalised = "+251" + phone.replace(/^0/, "").replace(/\s+/g, "");
    const { error: otpError } = await supabase.auth.signInWithOtp({ phone: normalised });
    if (otpError) {
      setError(otpError.message);
    } else {
      setOtpSent(true);
    }
    setLoading(false);
  };

  /** Phone OTP — step 2: verify code */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const normalised = "+251" + phone.replace(/^0/, "").replace(/\s+/g, "");
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: normalised,
      token: otpCode,
      type: "sms",
    });
    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  /** Google OAuth */
  const handleGoogleLogin = async () => {
    setError("");
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) setError(oauthError.message);
  };

  /** Telegram OTP button — switch to phone tab or focus input */
  const handleTelegramOtpBtn = () => {
    if (tab !== "phone") {
      setTab("phone");
      // focus after state update
      setTimeout(() => phoneInputRef.current?.focus(), 50);
    } else {
      phoneInputRef.current?.focus();
    }
  };

  /** Guest access */
  const handleGuestAccess = () => router.push("/exams");

  // ──────────────────────────────────────────────
  //  Render
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#0a0f1e] overflow-hidden">

      {/* ═══════════════════════════════════════════
          LEFT — Illustration Panel
      ═══════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden">

        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b4b] via-[#1a3580] to-[#0d1b4b]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(26,86,219,0.25) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.15) 0%, transparent 50%)",
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative z-10 flex flex-col h-full p-12">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">Exit Exam</p>
              <p className="text-amber-400 text-xs font-medium tracking-wide">ETHIOPIA</p>
            </div>
          </div>

          {/* Central illustration */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <div className="relative">
              {/* Outer glass ring */}
              <div className="w-48 h-48 bg-gradient-to-br from-blue-600/30 to-indigo-700/30 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
                {/* Inner glass ring */}
                <div className="w-36 h-36 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 rounded-full flex items-center justify-center border border-white/15 backdrop-blur-md">
                  <GraduationCap className="w-20 h-20 text-white/90" />
                </div>
              </div>

              {/* Department pills orbiting the illustration */}
              {DEPARTMENTS.map((dept, i) => {
                const angle = (i / DEPARTMENTS.length) * 360;
                const rad   = (angle * Math.PI) / 180;
                const x     = 50 + 47 * Math.cos(rad - Math.PI / 2);
                const y     = 50 + 47 * Math.sin(rad - Math.PI / 2);
                return (
                  <div
                    key={dept}
                    className="absolute glass rounded-full px-3 py-1 text-xs text-white/80 whitespace-nowrap"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    {dept}
                  </div>
                );
              })}

              {/* Slow-spinning gold dashed ring */}
              <div
                className="absolute -inset-4 rounded-full border border-amber-400/25 border-dashed animate-spin pointer-events-none"
                style={{ animationDuration: "22s" }}
              />
            </div>

            {/* Headline */}
            <div className="text-center space-y-3 max-w-sm">
              <h2 className="text-3xl font-bold text-white leading-snug">
                Ace Your{" "}
                <span className="text-gold-gradient">Exit Exam</span>
                <br />with Confidence
              </h2>
              <p className="text-blue-200/70 text-sm leading-relaxed">
                Access 500+ past papers from 45+ Ethiopian universities. AI-powered study tools, mock exams, and real-time analytics.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-amber-400">{value}</p>
                  <p className="text-xs text-blue-200/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-blue-300/40 text-xs">© 2026 Exit Exam Ethiopia</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          RIGHT — Auth Panel
      ═══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white dark:bg-[#0d1117] relative">

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-6 right-6 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="w-full max-w-[400px] space-y-7">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-900 dark:text-white font-bold text-base">Exit Exam Ethiopia</p>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back 👋</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to continue your preparation</p>
          </div>

          {/* ── Auth method tabs ── */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
            {(["email", "phone"] as AuthTab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setOtpSent(false); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                  tab === t
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                )}
              >
                {t === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                {t === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* ── Email / Password form ── */}
          {tab === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/25 text-sm"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Signing in…</>
                ) : (
                  <>Sign In <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}

          {/* ── Phone / OTP form ── */}
          {tab === "phone" && !otpSent && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none">
                    <span className="text-sm">🇪🇹</span>
                    <span className="text-xs text-gray-400 font-medium">+251</span>
                  </div>
                  <input
                    id="phone"
                    ref={phoneInputRef}
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9X XXX XXXX"
                    className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  We&apos;ll send a one-time code to your Telegram account.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/25 text-sm"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Sending OTP…</>
                ) : (
                  <>Send OTP Code <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}

          {/* ── OTP verification form ── */}
          {tab === "phone" && otpSent && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Success hint */}
              <div className="px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm">
                OTP sent! Check your Telegram for the verification code.
              </div>

              <div className="space-y-1.5">
                <label htmlFor="otpCode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="otpCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="6-digit code"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm tracking-widest transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/25 text-sm"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Verifying…</>
                ) : (
                  <>Verify &amp; Sign In <ChevronRight className="w-4 h-4" /></>
                )}
              </button>

              {/* Back to phone number */}
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtpCode(""); setError(""); }}
                className="w-full text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline-offset-2 hover:underline"
              >
                Change phone number
              </button>
            </form>
          )}

          {/* ── Divider ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* ── Social buttons ── */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
              aria-label="Sign in with Google"
            >
              {/* Google coloured logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            {/* Telegram OTP */}
            <button
              type="button"
              onClick={handleTelegramOtpBtn}
              className="flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
              aria-label="Sign in with Telegram OTP"
            >
              {/* Telegram icon */}
              <svg className="w-4 h-4 text-[#26A5E4]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.008 9.461c-.147.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.566-4.461c.537-.194 1.006.131.875.76z" />
              </svg>
              Telegram OTP
            </button>
          </div>

          {/* ── Guest access ── */}
          <button
            type="button"
            onClick={handleGuestAccess}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-amber-300 dark:border-amber-600/50 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Continue as Guest — Browse Free
          </button>

          {/* ── Sign up link ── */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Create one free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
