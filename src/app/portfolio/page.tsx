import type { Metadata } from "next";
import PortfolioPage from '@/components/PortfolioPage';

export const metadata: Metadata = {
  title: "Portfolio - Zero Digital",
  description: "Explore Zero Digital's successful projects including mobile apps, AI automation systems, and digital marketing solutions. See our proven track record.",
};

export default function Portfolio() {
  return <PortfolioPage />;
}
