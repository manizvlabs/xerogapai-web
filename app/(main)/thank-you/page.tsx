import type { Metadata } from 'next';
import { ThankYou } from '@/src/views/ThankYou';

export const metadata: Metadata = {
  title: 'Thank You',
  description: "We've received your message and will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
