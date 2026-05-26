import type { Metadata } from 'next';
import { Contact } from '@/src/views/Contact';

export const metadata: Metadata = {
  title: 'Contact VyaptIX — Get in Touch or Book a Demo',
  description:
    'Ready to automate your business with AI? Get in touch with the VyaptIX team — no generic presentations, just real answers about what works for your business.',
  openGraph: {
    title: 'Contact VyaptIX — Get in Touch or Book a Demo',
    description:
      'Book a 30-minute discovery call. No pitch decks — just a real conversation about where AI can remove friction in your business.',
    url: 'https://vyaptix.com/contact',
    type: 'website',
  },
  alternates: { canonical: 'https://vyaptix.com/contact' },
};

export default function ContactPage() {
  return <Contact />;
}
