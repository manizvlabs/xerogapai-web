import type { Metadata } from "next";
import ContactPage from '@/components/ContactPage';

export const metadata: Metadata = {
  title: "Contact - VyaptIX AI",
  description: "Get in touch with VyaptIX AI for AI automation, WhatsApp CX solutions, and digital transformation. Global operations serving MEA, US, and international markets.",
};

export default function Contact() {
  return <ContactPage />;
}
