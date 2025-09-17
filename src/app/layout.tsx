import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
  description: `${siteConfig.tagline}. Transform your business with AI-powered automation, custom mobile apps, and digital marketing solutions. Serving startups, small businesses, and enterprises in Hyderabad and beyond.`,
  keywords: "AI automation, mobile app development, digital marketing, AI agents, Hyderabad, India, digital transformation, content automation, AI consulting, mobile development",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://${siteConfig.domain}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: `${siteConfig.tagline}. Transform your business with AI-powered automation, custom mobile apps, and digital marketing solutions.`,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `https://${siteConfig.domain}/og-image.jpg`,
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
    images: [`https://${siteConfig.domain}/og-image.jpg`],
    creator: "@zerodigital",
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
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
