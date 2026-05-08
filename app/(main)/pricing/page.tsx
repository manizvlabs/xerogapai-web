import type { Metadata } from 'next';
import { Pricing } from '@/src/views/Pricing';

export const metadata: Metadata = {
  title: 'Pricing — AI Review Generator & AgentMitra',
  description:
    'Simple, transparent pricing for VyaptIX products. Start free with the AI Review Generator or get early access to AgentMitra.',
  alternates: { canonical: 'https://vyaptix.com/pricing' },
};

export default function PricingPage() {
  return <Pricing />;
}
