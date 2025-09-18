import type { Metadata } from "next";
import PortfolioPage from '@/components/PortfolioPage';

export const metadata: Metadata = {
  title: "Portfolio - XeroGap AI",
  description: "Explore XeroGap AI's successful projects including AI automation systems, WhatsApp CX solutions, and digital transformation initiatives. See our proven track record.",
};

export default function Portfolio() {
  return <PortfolioPage />;
}
