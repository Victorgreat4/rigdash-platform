import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RigDash Platform",
  description: "Tools, quizzes, and leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <header className="border-b border-zinc-800">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold">
              RigDash
            </Link>

            <nav className="flex gap-6 text-sm text-zinc-300">
              <Link href="/quiz" className="hover:text-white">
                Quiz
              </Link>
              <Link href="/leaderboard" className="hover:text-white">
                Leaderboard
              </Link>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}