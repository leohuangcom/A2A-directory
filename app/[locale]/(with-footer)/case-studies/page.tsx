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
    namespace: 'Metadata.case-studies',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './case-studies',
    },
  };
}

export const revalidate = 3600;

export default async function CaseStudiesPage() {
  const t = await getTranslations('CaseStudies');

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>{t('title')}</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>{t('description')}</p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('case1.title')}</h2>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.challenge')}</h3>
            <p className='text-gray-300'>{t('case1.challenge')}</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.solution')}</h3>
            <p className='mb-4 text-gray-300'>{t('case1.solution')}</p>
            <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
              <li>{t('case1.steps.1')}</li>
              <li>{t('case1.steps.2')}</li>
              <li>{t('case1.steps.3')}</li>
              <li>{t('case1.steps.4')}</li>
            </ol>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.results')}</h3>
            <p className='text-gray-300'>{t('case1.results')}</p>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('case2.title')}</h2>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.challenge')}</h3>
            <p className='text-gray-300'>{t('case2.challenge')}</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.solution')}</h3>
            <p className='mb-4 text-gray-300'>{t('case2.solution')}</p>
            <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
              <li>{t('case2.steps.1')}</li>
              <li>{t('case2.steps.2')}</li>
              <li>{t('case2.steps.3')}</li>
              <li>{t('case2.steps.4')}</li>
            </ol>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.results')}</h3>
            <p className='text-gray-300'>{t('case2.results')}</p>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>{t('case3.title')}</h2>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.challenge')}</h3>
            <p className='text-gray-300'>{t('case3.challenge')}</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.solution')}</h3>
            <p className='mb-4 text-gray-300'>{t('case3.solution')}</p>
            <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
              <li>{t('case3.steps.1')}</li>
              <li>{t('case3.steps.2')}</li>
              <li>{t('case3.steps.3')}</li>
              <li>{t('case3.steps.4')}</li>
              <li>{t('case3.steps.5')}</li>
            </ol>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>{t('common.results')}</h3>
            <p className='text-gray-300'>{t('case3.results')}</p>
          </div>
        </div>

        <div className='mb-8 flex justify-center gap-4'>
          <Link
            href='/agents'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            {t('explore-agents')}
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
          <Link
            href='/resources'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            {t('implementation-resources')}
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
