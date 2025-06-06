import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getWebNavigationList } from '@/network/webNavigation';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import WebNavCardList from '@/components/webNav/WebNavCardList';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.agents',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: '/agents',
    },
  };
}

export const revalidate = 3600;

export default async function AgentsPage() {
  const res = await getWebNavigationList({ pageNum: 1, pageSize: 50 });
  const t = await getTranslations('Agents');

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>{t('directory')}</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>{t('explore-description')}</p>
        </div>

        <div className='mb-12'>
          <h2 className='mb-6 text-center text-2xl font-semibold text-white'>{t('agents-title')}</h2>
          <WebNavCardList dataList={res.rows} />
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('join-ecosystem')}</h2>
          <p className='mb-4 text-white'>{t('join-description')}</p>
          <ul className='mb-4 ml-4 list-inside list-disc space-y-1 text-gray-300'>
            <li>{t('contribute-1')}</li>
            <li>{t('contribute-2')}</li>
            <li>{t('contribute-3')}</li>
            <li>{t('contribute-4')}</li>
            <li>{t('contribute-5')}</li>
          </ul>
          <div className='mt-4 flex justify-center'>
            <Link
              href='/resources'
              className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
            >
              {t('get-started')}
              <CircleChevronRight className='h-[16px] w-[16px]' />
            </Link>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
