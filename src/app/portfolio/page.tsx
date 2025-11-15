import type { Metadata } from "next";
import PortfolioPage from '@/components/PortfolioPage';

export const metadata: Metadata = {
  title: "Portfolio - VyaptIX AI",
  description: "Explore VyaptIX AI's successful projects including AI automation systems, WhatsApp CX solutions, and digital transformation initiatives. See our proven track record.",
};

export default function Portfolio() {
  return <PortfolioPage />;
}
