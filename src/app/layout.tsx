import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { siteConfig } from "@/config/site";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import DarkModeTest from "@/components/DarkModeTest";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: `${siteConfig.tagline}. Transform your business with AI-powered automation, custom mobile apps, and digital marketing solutions. Serving startups, small businesses, and enterprises.`,
  keywords: "AI automation, mobile app development, digital marketing, AI agents, digital transformation, content automation, AI consulting, mobile development",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}` : 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: `${siteConfig.tagline}. Transform your business with AI-powered automation, custom mobile apps, and digital marketing solutions.`,
    url: process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}` : `http://localhost:3000`,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}/og-image.jpg` : '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: `${siteConfig.tagline}. Transform your business with AI-powered automation.`,
    images: [process.env.NODE_ENV === 'production' ? `https://${siteConfig.domain}/og-image.jpg` : '/og-image.jpg'],
    creator: "@vyaptix",
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
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="apple-touch-icon" href="/favicon-32.png" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                const defaultTheme = '${siteConfig.defaultTheme}';
                const themeToUse = saved && (saved === 'light' || saved === 'dark') ? saved : defaultTheme;

                if (themeToUse === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                // Fallback to default theme if localStorage is not available
                if ('${siteConfig.defaultTheme}' === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <RegionProvider>
            <StructuredData type="organization" />
            <Suspense fallback={null}>
              <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
            </Suspense>
            <DarkModeTest />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </RegionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
