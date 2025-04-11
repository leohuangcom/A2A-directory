'use client';

import { useEffect } from 'react';

export default function DocsPage() {
  useEffect(() => {
    // 重定向到docsify文档
    window.location.href = '/docs/index.html';
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Loading Documentation...</h1>
        <p className='mt-2'>Please wait while we redirect you to the A2A Protocol documentation.</p>
      </div>
    </div>
  );
}
