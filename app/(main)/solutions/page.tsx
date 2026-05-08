import type { Metadata } from 'next';
import { Solutions } from '@/src/views/Solutions';

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Two AI products built for real business outcomes: AI Review Generator and AgentMitra. See how they transform customer engagement and team operations.',
  alternates: { canonical: 'https://vyaptix.com/solutions' },
};

export default function SolutionsPage() {
  return <Solutions />;
}
