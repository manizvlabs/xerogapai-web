import type { Metadata } from 'next';
import { Solutions } from '@/src/views/Solutions';

export const metadata: Metadata = {
  title: 'VyaptIX Products — AI Review Generator, AgentMitra, Setu & BankLens',
  description:
    'Four AI products built for real business outcomes: AI Review Generator, AgentMitra, Setu, and BankLens. See how VyaptIX transforms business operations.',
  openGraph: {
    title: 'VyaptIX Products — AI Review Generator, AgentMitra, Setu & BankLens',
    description:
      'Remove real friction from your business. Every VyaptIX product tackles a specific, painful problem — no hype, no bloat, just tools that work.',
    url: 'https://vyaptix.com/solutions',
    type: 'website',
  },
  alternates: { canonical: 'https://vyaptix.com/solutions' },
};

export default function SolutionsPage() {
  return <Solutions />;
}
