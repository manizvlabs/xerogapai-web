import type { Metadata } from 'next';
import { Contact } from '@/src/views/Contact';

export const metadata: Metadata = {
  title: 'Get in Touch',
  description:
    'Ready to automate your business with AI? Get in touch with the VyaptIX team — no generic presentations, just real answers.',
  alternates: { canonical: 'https://vyaptix.com/contact' },
};

export default function ContactPage() {
  return <Contact />;
}
