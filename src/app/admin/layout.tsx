import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/components/admin/auth-provider";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "greek"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Admin | Apostolidis CMS",
  description: "Content Management System for Apostolidis portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} min-h-screen bg-zinc-950 font-sans antialiased text-white selection:bg-zinc-700 selection:text-white`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
