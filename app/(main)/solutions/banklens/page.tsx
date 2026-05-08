import type { Metadata } from 'next';
import { BankLens } from '@/src/views/BankLens';

export const metadata: Metadata = {
  title: 'BankLens — AI Bank Statement Analysis & Credit Decisioning for NBFCs',
  description:
    '220+ financial signals, 14-signal fraud detection, and a structured APPROVE/REVIEW/REJECT decision in under 5 minutes. Built for India\'s NBFCs, DSAs, and fintech lenders. From ₹12/report.',
  alternates: { canonical: 'https://vyaptix.com/solutions/banklens' },
};

export default function BankLensPage() {
  return <BankLens />;
}
