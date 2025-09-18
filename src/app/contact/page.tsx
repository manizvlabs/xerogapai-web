import type { Metadata } from "next";
import ContactPage from '@/components/ContactPage';

export const metadata: Metadata = {
  title: "Contact - XeroGap AI",
  description: "Get in touch with XeroGap AI for AI automation, WhatsApp CX solutions, and digital transformation. Global operations serving MEA, US, and international markets.",
};

export default function Contact() {
  return <ContactPage />;
}
