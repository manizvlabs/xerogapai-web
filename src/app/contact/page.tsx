import type { Metadata } from "next";
import ContactPage from '@/components/ContactPage';

export const metadata: Metadata = {
  title: "Contact - Zero Digital",
  description: "Get in touch with Zero Digital for AI automation, mobile app development, and digital transformation solutions. Based in Hyderabad, serving clients globally.",
};

export default function Contact() {
  return <ContactPage />;
}
