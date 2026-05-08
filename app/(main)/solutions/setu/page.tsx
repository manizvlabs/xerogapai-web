import type { Metadata } from 'next';
import { Setu } from '@/src/views/Setu';

export const metadata: Metadata = {
  title: 'Setu — WhatsApp Marketing & Automation for Indian Businesses',
  description:
    'Send campaigns to thousands, automate replies 24/7, manage your team inbox, and close more leads — all on WhatsApp. Starts at ₹999/month. VyaptIX Setu.',
  alternates: { canonical: 'https://vyaptix.com/solutions/setu' },
};

export default function SetuPage() {
  return <Setu />;
}
