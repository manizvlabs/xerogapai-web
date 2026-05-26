import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'VyaptIX — AI Automation Tools for Business',
    template: '%s | VyaptIX',
  },
  description:
    'VyaptIX builds focused AI tools that remove real friction from business operations — Google review automation, WhatsApp marketing, credit decisioning, and service ops. Live in 3–7 days.',
  metadataBase: new URL('https://vyaptix.com'),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    siteName: 'VyaptIX',
    type: 'website',
    title: 'VyaptIX — AI Automation Tools for Business',
    description:
      'Focused AI tools that go live in days, not months. Used by restaurants, clinics, CA firms, lenders, and service teams worldwide.',
    images: [{ url: '/vyaptix-logo.png', width: 400, alt: 'VyaptIX — AI Automation Tools for Business' }],
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
