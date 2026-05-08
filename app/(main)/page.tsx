import type { Metadata } from 'next';
import { Home } from '@/src/views/Home';

export const metadata: Metadata = {
  title: 'VyaptIX — AI Automation for Business Growth',
  description:
    'Deploy AI tools that collect Google reviews and automate business workflows. Trusted by 500+ businesses globally.',
  openGraph: {
    title: 'VyaptIX — AI Automation for Business Growth',
    description:
      'Deploy AI tools that collect Google reviews and automate business workflows. Trusted by 500+ businesses globally.',
    url: 'https://vyaptix.com',
    type: 'website',
  },
  alternates: { canonical: 'https://vyaptix.com' },
};

export default function HomePage() {
  return <Home />;
}
