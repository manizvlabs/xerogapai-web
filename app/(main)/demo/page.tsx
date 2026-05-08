import type { Metadata } from 'next';
import { Demo } from '@/src/views/Demo';

export const metadata: Metadata = {
  title: 'Book a Demo — VyaptIX',
  description:
    'Schedule a 15-minute intro call with the VyaptIX team. See AI Review Generator and AgentMitra in action — no fluff, just real answers.',
  alternates: { canonical: 'https://vyaptix.com/demo' },
  openGraph: {
    title: 'Book a Demo — VyaptIX',
    description: 'Schedule a 15-minute intro call with the VyaptIX team.',
    url: 'https://vyaptix.com/demo',
  },
};

export default function DemoPage() {
  return <Demo />;
}
