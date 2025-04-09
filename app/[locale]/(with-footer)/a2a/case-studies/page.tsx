import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.a2a.caseStudies',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './a2a/case-studies',
    },
  };
}

export const revalidate = 3600;

export default async function CaseStudiesPage() {
  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>A2A Protocol Case Studies</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>
            Real-world examples of how the Agent2Agent Protocol is transforming business processes and workflows.
          </p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Candidate Sourcing with A2A</h2>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Challenge</h3>
            <p className='text-gray-300'>
              Hiring managers spend significant time sourcing candidates, reviewing resumes, and coordinating
              interviews, with information scattered across multiple systems and platforms.
            </p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>A2A Solution</h3>
            <p className='mb-4 text-gray-300'>
              With A2A, a unified interface like Agentspace allows a hiring manager to task their agent to find
              candidates matching specific criteria. The agent then:
            </p>
            <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
              <li>Communicates with specialized recruiting agents</li>
              <li>Sources potential candidates across different platforms</li>
              <li>Coordinates interviews and follow-ups</li>
              <li>Manages the entire hiring workflow</li>
            </ol>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Results</h3>
            <p className='text-gray-300'>
              Hiring managers save hours per position, candidates receive faster responses, and the entire process
              becomes more transparent and efficient, with all information centralized and accessible.
            </p>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Supply Chain Optimization</h2>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Challenge</h3>
            <p className='text-gray-300'>
              Supply chain managers deal with multiple systems, vendors, and unpredictable variables when planning
              logistics and inventory management, leading to inefficiencies and increased costs.
            </p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>A2A Solution</h3>
            <p className='mb-4 text-gray-300'>
              A2A enables supply chain agents to communicate across different systems:
            </p>
            <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
              <li>Inventory management agents share real-time stock levels</li>
              <li>Logistics agents provide transportation options and timelines</li>
              <li>Vendor management agents negotiate pricing and availability</li>
              <li>Weather and external event agents predict potential disruptions</li>
            </ol>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Results</h3>
            <p className='text-gray-300'>
              Companies using A2A for supply chain management report reduced inventory costs, faster delivery times,
              fewer stockouts, and better resilience to supply chain disruptions.
            </p>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Customer Service Enhancement</h2>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Challenge</h3>
            <p className='text-gray-300'>
              Customer service representatives often need to access multiple systems and databases to resolve customer
              issues, leading to longer wait times and frustrated customers.
            </p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>A2A Solution</h3>
            <p className='mb-4 text-gray-300'>A customer service agent enhanced with A2A capabilities can:</p>
            <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
              <li>Communicate with order management systems to check status</li>
              <li>Interact with product knowledge bases for detailed information</li>
              <li>Coordinate with shipping and logistics agents for delivery updates</li>
              <li>Interface with billing systems to resolve payment issues</li>
              <li>Document interactions in CRM systems automatically</li>
            </ol>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 text-xl font-semibold text-white'>Results</h3>
            <p className='text-gray-300'>
              Customer service departments implementing A2A report 40% faster resolution times, higher customer
              satisfaction scores, and reduced training time for new representatives.
            </p>
          </div>
        </div>

        <div className='mb-8 flex justify-center gap-4'>
          <Link
            href='/a2a/partners'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            Explore Partner Solutions
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
          <Link
            href='/a2a/resources'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            Implementation Resources
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
