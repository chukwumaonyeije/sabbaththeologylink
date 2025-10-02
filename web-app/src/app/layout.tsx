import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SabbathTheologyLink",
  description: "Your SDA Bible Study Companion - Connecting believers through theological study and Sabbath School resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // DEPLOYMENT VERIFICATION - FORCE UPDATE cc444b9
  if (typeof window !== 'undefined') {
    console.log('🚀🚀🚀🚀🚀 ROOT LAYOUT CLIENT EMERGENCY - Commit cc444b9 FORCE CACHE BUST - ' + Date.now());
  }
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
