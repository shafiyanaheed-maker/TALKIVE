import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talkive - Smart Adaptive Real-Time Meetings",
  description: "Production-grade real-time video meetings for education, business, paired engineering, and AI-assisted learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#090d16] text-slate-100 selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
