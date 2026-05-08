import { Suspense } from 'react';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { ScrollToTop } from '@/src/components/ui/ScrollToTop';
import { CookieBanner } from '@/src/components/ui/CookieBanner';
import { PostHogProvider } from '@/src/components/PostHogProvider';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1 pt-22">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <PostHogProvider />
      </Suspense>
      <ScrollToTop />
      <CookieBanner />
    </div>
  );
}
