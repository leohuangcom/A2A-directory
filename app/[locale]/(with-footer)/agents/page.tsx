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
      canonical: './agents',
    },
  };
}

export const revalidate = 3600;

export default async function AgentsPage() {
  const res = await getWebNavigationList({ pageNum: 1, pageSize: 50 });

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>A2A Agents Directory</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>
            Explore the growing ecosystem of A2A compatible agents and service providers supporting the A2A Protocol.
          </p>
        </div>

        <div className='mb-12'>
          <h2 className='mb-6 text-center text-2xl font-semibold text-white'>Featured A2A Technology Agents</h2>

          <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {/* Highlighted Partners */}
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Google Cloud</h3>
              <p className='mb-3 text-gray-300'>
                Lead developer of the A2A protocol, providing cloud infrastructure and AI services that support agent
                interoperability.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Anthropic</h3>
              <p className='mb-3 text-gray-300'>
                Creator of the Model Context Protocol (MCP) which complements A2A by providing tools and context to
                agents.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Salesforce</h3>
              <p className='mb-3 text-gray-300'>
                Leading with A2A standard support to extend their open platform, enabling AI agents to work together
                seamlessly across Agentforce.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>ServiceNow</h3>
              <p className='mb-3 text-gray-300'>
                Collaborating to set a new industry standard for agent-to-agent interoperability for more efficient
                support experiences.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>SAP</h3>
              <p className='mb-3 text-gray-300'>
                Working to enable SAP Joule and other AI agents to seamlessly work across enterprise platforms and
                unlock business processes.
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>MongoDB</h3>
              <p className='mb-3 text-gray-300'>
                Combining robust database infrastructure and hybrid search capabilities with A2A to redefine AI
                applications.
              </p>
            </div>
          </div>

          <h3 className='mb-4 text-xl font-semibold text-white'>All A2A Agents</h3>
          <WebNavCardList dataList={res.rows} />
        </div>

        <div className='mb-12'>
          <h2 className='mb-6 text-center text-2xl font-semibold text-white'>A2A Service Providers</h2>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Accenture</h3>
              <p className='text-gray-300'>
                &quot;The multi-agent A2A protocol from Google Cloud is the bridge that will unite domain specific
                agents across diverse platforms to solve complex challenges.&quot;
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Deloitte</h3>
              <p className='text-gray-300'>
                &quot;Agent-to-agent interoperability is a foundational element of enabling the evolution of agentic AI
                architectures.&quot;
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>KPMG</h3>
              <p className='text-gray-300'>
                &quot;A2A provides the essential standard we need for different AI agents to truly collaborate
                effectively and responsibly.&quot;
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>HCLTech</h3>
              <p className='text-gray-300'>
                &quot;HCLTech is at the forefront of the agentic enterprise, advancing agentic AI possibilities through
                the open A2A standard.&quot;
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Tata Consultancy Services</h3>
              <p className='text-gray-300'>
                &quot;The A2A protocol is the foundation for the next era of agentic automation, where Semantic
                Interoperability takes prominence.&quot;
              </p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Wipro</h3>
              <p className='text-gray-300'>
                &quot;Because the future of AI lies in seamless collaboration, open protocols like A2A will be the
                foundation of an ecosystem where AI agents drive innovation at scale.&quot;
              </p>
            </div>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Join the A2A Ecosystem</h2>
          <p className='mb-4 text-white'>
            If your organization is interested in joining the A2A Protocol ecosystem, you can contribute in several
            ways:
          </p>
          <ul className='mb-4 ml-4 list-inside list-disc space-y-1 text-gray-300'>
            <li>Implement the A2A Protocol in your products</li>
            <li>Contribute to the protocol specification</li>
            <li>Share case studies and implementation examples</li>
            <li>Participate in the A2A community</li>
          </ul>
          <div className='mt-4 flex justify-center'>
            <Link
              href='/resources'
              className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
            >
              Get Started with A2A
              <CircleChevronRight className='h-[16px] w-[16px]' />
            </Link>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
