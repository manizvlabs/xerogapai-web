'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    const scriptId = 'decap-cms-script';
    if (document.getElementById(scriptId)) return;

    // Keep one script instance across React Strict Mode remounts and route changes.
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <link rel="cms-config-url" href="/admin/config.yml" />
      <div id="nc-root" />
    </>
  );
}
