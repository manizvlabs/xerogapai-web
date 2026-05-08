import type { Metadata } from 'next';
import { PrivacyPolicy } from '@/src/views/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the VyaptIX privacy policy — how we collect, use, and protect your data.',
  alternates: { canonical: 'https://vyaptix.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
