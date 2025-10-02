import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Analytics from '@/components/analytics/Analytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SabbathTheologyLink - SDA Bible Study Companion",
    template: "%s | SabbathTheologyLink"
  },
  description: "Deepen your Seventh-day Adventist faith through interactive Bible studies, Sabbath School Quarterly lessons, and theological insights. Join our community of believers exploring God's Word together.",
  keywords: ["Seventh-day Adventist", "SDA", "Bible study", "Sabbath School", "theology", "Christian education", "Ellen White", "biblical studies"],
  authors: [{ name: "SabbathTheologyLink Team" }],
  creator: "SabbathTheologyLink",
  publisher: "SabbathTheologyLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sabbaththeologylink.vercel.app'),
  openGraph: {
    title: "SabbathTheologyLink - SDA Bible Study Companion",
    description: "Deepen your Seventh-day Adventist faith through interactive Bible studies, Sabbath School Quarterly lessons, and theological insights.",
    url: 'https://sabbaththeologylink.vercel.app',
    siteName: 'SabbathTheologyLink',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SabbathTheologyLink - SDA Bible Study Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SabbathTheologyLink - SDA Bible Study Companion",
    description: "Interactive Bible studies and Sabbath School lessons for Seventh-day Adventists",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
