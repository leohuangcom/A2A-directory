import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.overview',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: '/overview',
    },
  };
}

export const revalidate = 3600;

export default async function OverviewPage() {
  const t = await getTranslations('Overview');

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>{t('title')}</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>{t('description')}</p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('protocol-title')}</h2>
          <p className='mb-4 text-white'>{t('protocol-p1')}</p>
          <p className='mb-4 text-white'>{t('protocol-p2')}</p>
          <p className='text-white'>{t('protocol-p3')}</p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('principles-title')}</h2>
          <p className='mb-6 text-white'>{t('principles-intro')}</p>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('principles.1.title')}</h3>
              <p className='text-gray-300'>{t('principles.1.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('principles.2.title')}</h3>
              <p className='text-gray-300'>{t('principles.2.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('principles.3.title')}</h3>
              <p className='text-gray-300'>{t('principles.3.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('principles.4.title')}</h3>
              <p className='text-gray-300'>{t('principles.4.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('principles.5.title')}</h3>
              <p className='text-gray-300'>{t('principles.5.description')}</p>
            </div>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('how-works-title')}</h2>
          <p className='mb-6 text-white'>{t('how-works-intro')}</p>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('how-works.1.title')}</h3>
              <p className='text-gray-300'>{t('how-works.1.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('how-works.2.title')}</h3>
              <p className='text-gray-300'>{t('how-works.2.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('how-works.3.title')}</h3>
              <p className='text-gray-300'>{t('how-works.3.description')}</p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>{t('how-works.4.title')}</h3>
              <p className='text-gray-300'>{t('how-works.4.description')}</p>
            </div>
          </div>
        </div>

        <div className='mb-8 flex justify-center gap-4'>
          <Link
            href='/specification'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            {t('view-specification')}
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
          <Link
            href='/agents'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            {t('explore-agents')}
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
