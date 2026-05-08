import type { Metadata } from 'next';
import { TermsOfService } from '@/src/views/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the VyaptIX terms of service — the rules and guidelines for using our platform.',
  alternates: { canonical: 'https://vyaptix.com/terms-of-service' },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
