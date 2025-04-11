'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    // 使用相对路径重定向到 docsify 文档
    router.push('/docs/index.html');
  }, [router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Loading Documentation...</h1>
        <p className='mt-2'>Please wait while we redirect you to the A2A Protocol documentation.</p>
      </div>
    </div>
  );
}
