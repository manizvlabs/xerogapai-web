import type { Metadata } from 'next';
import { Home } from '@/src/views/Home';

export const metadata: Metadata = {
  title: 'VyaptIX — AI Automation Tools for Business | Live in 3–7 Days',
  description:
    'VyaptIX builds focused AI tools that remove real friction from business operations — Google review automation, WhatsApp marketing, credit decisioning, and service ops. Live in 3–7 days.',
  openGraph: {
    title: 'VyaptIX — AI Automation Tools for Business',
    description:
      'Focused AI tools that go live in days, not months. Used by restaurants, clinics, CA firms, lenders, and service teams worldwide.',
    url: 'https://vyaptix.com',
    type: 'website',
  },
  alternates: { canonical: 'https://vyaptix.com' },
};

export default function HomePage() {
  return <Home />;
}
