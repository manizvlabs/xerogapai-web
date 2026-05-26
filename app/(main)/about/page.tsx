import type { Metadata } from 'next';
import { About } from '@/src/views/About';

export const metadata: Metadata = {
  title: 'About VyaptIX — AI Automation Built for Real Businesses',
  description:
    'Meet the team behind VyaptIX — an AI automation startup building practical tools for business owners to grow faster without adding headcount.',
  openGraph: {
    title: 'About VyaptIX — AI Automation Built for Real Businesses',
    description:
      'Founded to make AI automation practical for every business. Learn who we are, what we build, and why we build it differently.',
    url: 'https://vyaptix.com/about',
    type: 'website',
  },
  alternates: { canonical: 'https://vyaptix.com/about' },
};

export default function AboutPage() {
  return <About />;
}
