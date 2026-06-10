import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exit Exam Ethiopia — Prepare, Practice, and Succeed",
  description:
    "Prepare for your university exit examination with confidence. Access past exam papers, mock tests, and AI-powered study assistance.",
  keywords: [
    "Exit Exam Ethiopia",
    "University Exit Exam",
    "Ethiopian University",
    "Exam Preparation",
    "Mock Exam",
  ],
  openGraph: {
    title: "Exit Exam Ethiopia",
    description: "Prepare for your university exit examination with confidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
