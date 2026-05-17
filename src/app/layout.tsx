import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavigationBusyIndicator from "@/components/NavigationBusyIndicator";

export const metadata: Metadata = {
  title: "Rigdash",
  description:
    "A personal hub for catalogs, tools, research notes, and future projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-white">
        <NavigationBusyIndicator />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
