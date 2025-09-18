import type { Metadata } from "next";
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: "About - XeroGap AI",
  description: "Learn about XeroGap AI's mission to provide intelligent AI automation solutions for growing businesses. Global operations serving MEA, US, and international markets.",
};

export default function About() {
  return <AboutPage />;
}
