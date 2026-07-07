import type { Metadata } from 'next';
import { Setu } from '@/src/views/Setu';

export const metadata: Metadata = {
  title: 'Setu — WhatsApp Growth Platform | VyaptIX',
  description:
    'Broadcast campaigns, 24/7 AI chatbot, shared team inbox, lead pipeline, and WhatsApp commerce — all on WhatsApp. 90%+ open rate. Plans from ₹2,500/month. VyaptIX Setu.',
  alternates: { canonical: 'https://vyaptix.com/solutions/setu' },
};

export default function SetuPage() {
  return <Setu />;
}
