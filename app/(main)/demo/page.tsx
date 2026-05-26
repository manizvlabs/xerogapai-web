import type { Metadata } from 'next';
import { Demo } from '@/src/views/Demo';

export const metadata: Metadata = {
  title: 'Book a Demo — VyaptIX',
  description:
    'Schedule a 30-minute discovery call with the VyaptIX team. No pitch decks — real answers about where AI can remove friction in your business.',
  alternates: { canonical: 'https://vyaptix.com/demo' },
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <Demo />;
}
