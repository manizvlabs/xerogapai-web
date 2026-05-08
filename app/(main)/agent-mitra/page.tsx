import type { Metadata } from 'next';
import { AgentMitra } from '@/src/views/AgentMitra';

export const metadata: Metadata = {
  title: 'AgentMitra — AI Workspace for Business Teams',
  description:
    'Give your team instant client context, structured workflows, and live status tracking with an AI-powered unified workspace. Early access available.',
  alternates: { canonical: 'https://vyaptix.com/agent-mitra' },
};

export default function AgentMitraPage() {
  return <AgentMitra />;
}
