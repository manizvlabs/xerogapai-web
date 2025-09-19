import React from 'react';
import type { Metadata } from "next";
import BlogPage from '@/components/BlogPage';

export const metadata: Metadata = {
  title: "Blog - XeroGap AI",
  description: "Insights, tips, and strategies for digital transformation, AI automation, and business growth. Stay updated with the latest trends and best practices.",
};

export default function Blog() {
  return <BlogPage />;
}
