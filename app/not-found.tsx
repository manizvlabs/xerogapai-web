import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { NotFound } from '@/src/views/NotFound';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-22">
        <NotFound />
      </main>
      <Footer />
    </div>
  );
}
