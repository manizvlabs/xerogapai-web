import type { Metadata } from "next";
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: "About - Zero Digital",
  description: "Learn about Zero Digital's mission to democratize AI and digital transformation for businesses of all sizes. Based in Hyderabad, serving clients globally.",
};

export default function About() {
  return <AboutPage />;
}
