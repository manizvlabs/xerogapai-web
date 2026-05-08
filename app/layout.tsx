import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'VyaptIX — AI Automation for Business Growth',
    template: '%s | VyaptIX',
  },
  description:
    'AI-powered tools that turn every customer interaction into a Google review, a qualified lead, or a closed deal — without adding headcount.',
  metadataBase: new URL('https://vyaptix.com'),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    siteName: 'VyaptIX',
    type: 'website',
    images: [{ url: '/vyaptix-logo.png', width: 400, alt: 'VyaptIX — AI Automation for Business Growth' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Vyaptix_ai',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
