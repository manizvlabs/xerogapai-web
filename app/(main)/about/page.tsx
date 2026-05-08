import type { Metadata } from 'next';
import { About } from '@/src/views/About';

export const metadata: Metadata = {
  title: 'About VyaptIX',
  description:
    'Learn about VyaptIX — an AI automation startup building practical tools for business owners to grow faster without adding headcount.',
  alternates: { canonical: 'https://vyaptix.com/about' },
};

export default function AboutPage() {
  return <About />;
}
