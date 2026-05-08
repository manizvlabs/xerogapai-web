'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Dynamically load Decap CMS to avoid SSR issues
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <link rel="cms-config-url" href="/admin/config.yml" />
      <div id="nc-root" />
    </>
  );
}
