import type { Metadata } from 'next';
import { Pricing } from '@/src/views/Pricing';

export const metadata: Metadata = {
  title: 'Pricing — VyaptIX Products',
  description:
    'Simple, transparent pricing for VyaptIX products. AI Review Generator at ₹1,299/month launch pricing, Setu WhatsApp platform from ₹2,500/month, and custom AI automation engagements.',
  alternates: { canonical: 'https://vyaptix.com/pricing' },
};

export default function PricingPage() {
  return <Pricing />;
}
