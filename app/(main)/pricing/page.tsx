import type { Metadata } from 'next';
import { Pricing } from '@/src/views/Pricing';

export const metadata: Metadata = {
  title: 'Pricing — VyaptIX Products',
  description:
    'Simple, transparent pricing for VyaptIX products. Start free with the AI Review Generator or discuss a custom AI automation engagement.',
  alternates: { canonical: 'https://vyaptix.com/pricing' },
};

export default function PricingPage() {
  return <Pricing />;
}
