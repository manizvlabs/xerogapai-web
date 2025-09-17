import type { Metadata } from "next";
import ServicesPage from '@/components/ServicesPage';

export const metadata: Metadata = {
  title: "Services - Zero Digital",
  description: "Comprehensive digital transformation solutions including AI automation, mobile app development, digital marketing, and AI agent development.",
};

export default function Services() {
  return <ServicesPage />;
}
