import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ReduxProvider } from "@/lib/redux/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BootRocket | Creative Courses & Tutorials",
  description:
    "Learn design, development, and digital creativity from industry experts. Step-by-step tutorials with practical examples to master creative skills.",
  keywords: [
    "design courses",
    "web design",
    "photoshop tutorial",
    "illustrator course",
    "digital design",
    "creative skills",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ReduxProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
