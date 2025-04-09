import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getWebNavigationList } from '@/network/webNavigation';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import Faq from '@/components/Faq';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './',
    },
  };
}

export const revalidate = 3600;

export default async function Page() {
  const t = await getTranslations('Home');
  const res = await getWebNavigationList({ pageNum: 1, pageSize: 12 });

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        {/* Hero Section */}
        <div className='my-5 flex flex-col text-center lg:mx-auto lg:my-10 lg:gap-1'>
          <h1 className='text-2xl font-bold text-white lg:text-5xl'>{t('title')}</h1>
          <h2 className='text-balance text-xs font-bold text-white lg:text-sm'>{t('subTitle')}</h2>
        </div>

        {/* About A2A Protocol */}
        <div className='mb-10'>
          <h2 className='mb-4 text-center text-[18px] lg:text-[32px]'>{t('a2a-introduction')}</h2>
          <div className='rounded-lg bg-gray-800 p-6'>
            <p className='mb-4 text-white'>
              Agent2Agent Protocol (A2A) is a new, open protocol launched by Google Cloud with support from over 50
              technology partners. It enables AI agents to communicate with each other, securely exchange information,
              and coordinate actions across enterprise platforms and applications.
            </p>
            <p className='text-white'>
              The protocol complements Anthropic&apos;s Model Context Protocol (MCP) and is designed to address the
              challenges of deploying large-scale, multi-agent systems. A2A empowers developers to build agents that can
              connect with any other agent built using the protocol.
            </p>
            <div className='mt-4 flex justify-center'>
              <Link
                href='/overview'
                className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
              >
                Learn More
                <CircleChevronRight className='h-[16px] w-[16px]' />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured A2A Agents */}
        <div className='mb-10'>
          <h2 className='mb-4 text-center text-[18px] lg:text-[32px]'>{t('a2a-partners')}</h2>
          <WebNavCardList dataList={res.rows} />
          <Link
            href='/agents'
            className='mx-auto mb-5 flex w-fit items-center justify-center gap-5 rounded-[9px] border border-white p-[10px] text-sm leading-4 hover:opacity-70'
          >
            {t('viewAllPartners')}
            <CircleChevronRight className='mt-[0.5] h-[20px] w-[20px]' />
          </Link>
        </div>

        {/* Key Features */}
        <div className='mb-10'>
          <h2 className='mb-4 text-center text-[18px] lg:text-[32px]'>{t('a2a-features')}</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg bg-gray-800 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-white'>Agentic Capabilities</h3>
              <p className='text-gray-300'>
                Enables collaboration between agents even when they don&apos;t share memory, tools and context.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-white'>Built on Standards</h3>
              <p className='text-gray-300'>
                Uses HTTP, SSE, JSON-RPC for easier integration with existing IT infrastructure.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-white'>Secure by Default</h3>
              <p className='text-gray-300'>Designed with enterprise-grade authentication and authorization systems.</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-white'>Long-Running Tasks</h3>
              <p className='text-gray-300'>Supports both quick tasks and deep research that may take hours or days.</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-white'>Modality Agnostic</h3>
              <p className='text-gray-300'>Supports various modalities including text, audio, and video streaming.</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-white'>Collaborative Design</h3>
              <p className='text-gray-300'>
                Created with input from leading technology companies and service providers.
              </p>
            </div>
          </div>
        </div>

        {/* Case Studies Preview */}
        <div className='mb-10'>
          <h2 className='mb-4 text-center text-[18px] lg:text-[32px]'>{t('a2a-cases')}</h2>
          <div className='rounded-lg bg-gray-800 p-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Candidate Sourcing Example</h3>
            <p className='mb-4 text-white'>
              Hiring a software engineer can be significantly simplified with A2A collaboration. A hiring manager can
              task their agent to find candidates matching specific requirements, with the agent interacting with
              specialized agents to source potential candidates, schedule interviews, and streamline the entire hiring
              process.
            </p>
            <div className='mt-4 flex justify-center'>
              <Link
                href='/case-studies'
                className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
              >
                View All Case Studies
                <CircleChevronRight className='h-[16px] w-[16px]' />
              </Link>
            </div>
          </div>
        </div>

        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
