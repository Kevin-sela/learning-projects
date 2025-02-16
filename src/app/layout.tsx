"use client";
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Bars3Icon } from "@heroicons/react/24/outline";
import "./globals.css";
import { useState } from "react";
import {Providers} from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-white shadow-md flex items-center px-6">
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          </button>
          <div className="ml-4 text-lg font-semibold text-black">My App</div>
        </nav>
        {isNavOpen && (
          <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-40 p-4">
            <div className="space-y-2">
              <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100 rounded">Home</a>
              <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100 rounded">About</a>
              <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100 rounded">Contact</a>
            </div>
          </div>
        )}
        <main className="pt-20">
          <Providers>
          {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
