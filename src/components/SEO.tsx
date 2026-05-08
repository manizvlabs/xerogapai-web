// SEO metadata is handled via Next.js Metadata API in app/ page files.
// This component is kept as a no-op to avoid breaking existing page components during migration.

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO(_: SEOProps) {
  return null;
}
