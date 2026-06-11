"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Flag, Sparkles,
  Clock, BookOpen, CheckCircle2, XCircle, BarChart3,
  GraduationCap, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    id: 1,
    text: "Which of the following best describes the time complexity of binary search on a sorted array of n elements?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
    correct: 1,
    explanation: "Binary search divides the search space in half with each comparison, giving it a time complexity of O(log n). This is because the algorithm reduces the number of elements to check by half at each step.",
  },
  {
    id: 2,
    text: "In object-oriented programming, what is the concept of hiding the internal implementation details of an object from the outside world?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    correct: 2,
    explanation: "Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), while restricting access to some of the object's components. This is the principle of hiding internal implementation details.",
  },
  {
    id: 3,
    text: "Which SQL clause is used to filter results based on a condition applied to aggregated data?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correct: 1,
    explanation: "HAVING is used to filter groups after GROUP BY aggregation, similar to how WHERE filters individual rows. WHERE cannot be used with aggregate functions like COUNT(), SUM(), AVG(), etc.",
  },
  {
    id: 4,
    text: "In networking, which layer of the OSI model is responsible for end-to-end communication and data flow control?",
    options: ["Network Layer", "Data Link Layer", "Transport Layer", "Session Layer"],
    correct: 2,
    explanation: "The Transport Layer (Layer 4) of the OSI model is responsible for end-to-end communication, flow control, error detection, and correction. TCP and UDP operate at this layer.",
  },
  {
    id: 5,
    text: "Which data structure follows the Last In First Out (LIFO) principle?",
    options: ["Queue", "Stack", "Linked List", "Binary Tree"],
    correct: 1,
    explanation: "A Stack follows the Last In First Out (LIFO) principle — the last element pushed onto the stack is the first one to be popped off. Common uses include function call management, undo operations, and expression evaluation.",
  },
];

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function ExamPracticePage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // Timer
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const q = QUESTIONS[current];
  const isAnswered = selected[current] !== undefined;
  const isMarked = marked.has(current);
  const progress = (Object.keys(selected).length / QUESTIONS.length) * 100;
  const urgentTime = timeLeft < 120;

  const toggleMark = useCallback(() => {
    setMarked((prev) => {
      const next = new Set(prev);
      next.has(current) ? next.delete(current) : next.add(current);
      return next;
    });
  }, [current]);

  const score = QUESTIONS.reduce((acc, _, i) => acc + (selected[i] === QUESTIONS[i].correct ? 1 : 0), 0);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="premium-card p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Complete!</h2>
            <div className="text-5xl font-black text-gold-gradient">{Math.round((score / QUESTIONS.length) * 100)}%</div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {score} out of {QUESTIONS.length} questions correct
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <p className="text-emerald-600 dark:text-emerald-400 text-xl font-bold">{score}</p>
                <p className="text-xs text-emerald-600/60 dark:text-emerald-400/60">Correct</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <p className="text-red-500 dark:text-red-400 text-xl font-bold">{QUESTIONS.length - score}</p>
                <p className="text-xs text-red-500/60 dark:text-red-400/60">Incorrect</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <p className="text-blue-600 dark:text-blue-400 text-xl font-bold">{marked.size}</p>
                <p className="text-xs text-blue-600/60 dark:text-blue-400/60">Marked</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setCurrent(0); setSelected({}); setMarked(new Set()); setTimeLeft(TOTAL_TIME); setSubmitted(false); }}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm">
              Try Again
            </button>
            <Link href="/results" className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-center">
              View Full Results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] flex flex-col">

      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/exams" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-sm text-gray-900 dark:text-white">Computer Science — 2024</span>
          </div>

          {/* Timer */}
          <div className={cn(
            "ml-auto flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold transition-colors",
            urgentTime
              ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse"
              : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
          )}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-800">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-6">

        {/* ── Question number nav ── */}
        <div className="flex items-center gap-2 flex-wrap">
          {QUESTIONS.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); setShowExplanation(false); setShowAI(false); }}
              className={cn(
                "w-9 h-9 rounded-xl text-xs font-bold transition-all border",
                i === current
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 scale-110"
                  : selected[i] !== undefined
                    ? selected[i] === QUESTIONS[i].correct
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800"
                    : marked.has(i)
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                      : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-300"
              )}
            >
              {marked.has(i) && i !== current ? "⚑" : i + 1}
            </button>
          ))}
          <div className="ml-auto text-xs text-gray-400">
            {Object.keys(selected).length}/{QUESTIONS.length} answered
          </div>
        </div>

        {/* ── Question Card ── */}
        <div className="premium-card p-6 sm:p-8 space-y-6">
          {/* Q header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                Q{current + 1} of {QUESTIONS.length}
              </span>
              {isAnswered && (
                selected[current] === q.correct
                  ? <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium"><CheckCircle2 className="w-3.5 h-3.5" />Correct</span>
                  : <span className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 font-medium"><XCircle className="w-3.5 h-3.5" />Incorrect</span>
              )}
            </div>
            <button onClick={toggleMark}
              className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border",
                isMarked
                  ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700"
                  : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-amber-300"
              )}
            >
              <Flag className="w-3.5 h-3.5" />
              {isMarked ? "Marked" : "Mark"}
            </button>
          </div>

          {/* Question text */}
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-relaxed no-select">
            {q.text}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, oi) => {
              const isSelected = selected[current] === oi;
              const isCorrect = oi === q.correct;
              const showResult = isAnswered;

              return (
                <button key={oi}
                  onClick={() => { if (!isAnswered) setSelected((prev) => ({ ...prev, [current]: oi })); }}
                  disabled={isAnswered}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all text-sm font-medium",
                    !isAnswered && "hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer",
                    isAnswered && isCorrect && "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-600",
                    isAnswered && isSelected && !isCorrect && "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-600",
                    isAnswered && !isSelected && !isCorrect && "border-gray-100 dark:border-gray-700 opacity-60",
                    !isAnswered && !isSelected && "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50",
                    !isAnswered && isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                  )}
                >
                  {/* Option letter */}
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                    isAnswered && isCorrect ? "bg-emerald-500 text-white"
                    : isAnswered && isSelected && !isCorrect ? "bg-red-500 text-white"
                    : isSelected ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  )}>
                    {["A", "B", "C", "D"][oi]}
                  </div>
                  <span className={cn("flex-1 no-select",
                    isAnswered && isCorrect ? "text-emerald-800 dark:text-emerald-300"
                    : isAnswered && isSelected && !isCorrect ? "text-red-700 dark:text-red-300"
                    : "text-gray-800 dark:text-gray-200"
                  )}>
                    {opt}
                  </span>
                  {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* AI Explanation button */}
          {isAnswered && (
            <div className="space-y-3">
              <button onClick={() => setShowAI(!showAI)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md shadow-violet-500/25"
              >
                <AIIcon className="w-4 h-4" />
                {showAI ? "Hide" : "Show"} AI Explanation
              </button>
              {showAI && (
                <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">AI Explanation</p>
                  </div>
                  <p className="text-sm text-violet-800 dark:text-violet-200 leading-relaxed no-select">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => { setCurrent(Math.max(0, current - 1)); setShowExplanation(false); setShowAI(false); }}
            disabled={current === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {current === QUESTIONS.length - 1 ? (
            <button onClick={() => setSubmitted(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm shadow-md shadow-emerald-600/25"
            >
              <CheckCircle2 className="w-4 h-4" /> Submit Exam
            </button>
          ) : (
            <button onClick={() => { setCurrent(Math.min(QUESTIONS.length - 1, current + 1)); setShowExplanation(false); setShowAI(false); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm shadow-md shadow-blue-600/25"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      <path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>
    </svg>
  );
}
