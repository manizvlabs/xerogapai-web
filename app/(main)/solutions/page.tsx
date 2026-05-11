import type { Metadata } from 'next';
import { Solutions } from '@/src/views/Solutions';

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Four AI products built for real business outcomes: AI Review Generator, AgentMitra, Setu, and BankLens. See how VyaptIX transforms business operations.',
  alternates: { canonical: 'https://vyaptix.com/solutions' },
};

export default function SolutionsPage() {
  return <Solutions />;
}
