import type { Metadata } from 'next';
import { AIReviewGeneration } from '@/src/views/AIReviewGeneration';

export const metadata: Metadata = {
  title: 'AI Review Generator — Get More Google Reviews on Autopilot',
  description:
    'VyaptIX AI Review Generator lets customers scan a QR code, answer a quick branded conversation, and post a real Google review in about 20 seconds. Plus AI-drafted replies to every review.',
  alternates: { canonical: 'https://vyaptix.com/solutions/ai-review-generation' },
};

export default function AIReviewGenerationPage() {
  return <AIReviewGeneration />;
}
