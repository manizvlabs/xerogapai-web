import type { Metadata } from 'next';
import { AIReviewGeneration } from '@/src/views/AIReviewGeneration';

export const metadata: Metadata = {
  title: 'AI Review Generator — Collect Google Reviews in Under 20 Seconds',
  description:
    'VyaptIX AI Review Generator lets customers scan a QR code and post a real Google review in under 20 seconds. Zero friction, authentic reviews.',
  alternates: { canonical: 'https://vyaptix.com/solutions/ai-review-generation' },
};

export default function AIReviewGenerationPage() {
  return <AIReviewGeneration />;
}
