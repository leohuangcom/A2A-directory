import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.specification',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './specification',
    },
  };
}

export const revalidate = 3600;

export default async function SpecificationPage() {
  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>A2A Protocol Technical Specification</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>
            The technical details of how the Agent2Agent Protocol works and how to implement it in your applications.
          </p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Protocol Basics</h2>
          <p className='mb-4 text-white'>
            The A2A protocol is built on standard web technologies like HTTP and JSON-RPC. It defines a structured way
            for AI agents to communicate with each other securely, regardless of their underlying frameworks or vendors.
          </p>
          <p className='mb-4 text-white'>
            The core of the protocol revolves around tasks, capabilities, and artifacts, with well-defined ways for
            agents to discover and communicate with each other.
          </p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Protocol Components</h2>

          <div className='mt-4 space-y-6'>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>Agent Card</h3>
              <p className='mb-3 text-gray-300'>
                An Agent Card is a JSON document that describes an agent&apos;s capabilities, including:
              </p>
              <pre className='overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-200'>
                {`{
  "name": "ExampleAgent",
  "version": "1.0.0",
  "description": "An example agent that provides search capabilities",
  "capabilities": [
    {
      "name": "search",
      "description": "Search for information",
      "parameters": {
        "query": "string",
        "max_results": "number"
      }
    }
  ]
}`}
              </pre>
            </div>

            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>Task Object</h3>
              <p className='mb-3 text-gray-300'>
                Tasks represent work that an agent performs. A task has a lifecycle and can include:
              </p>
              <ul className='ml-4 list-inside list-disc space-y-1 text-gray-300'>
                <li>Unique identifier</li>
                <li>Status (pending, in-progress, completed, failed)</li>
                <li>Input parameters</li>
                <li>Output artifacts</li>
                <li>Error information</li>
              </ul>
            </div>

            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>Message Exchange</h3>
              <p className='mb-3 text-gray-300'>Agents communicate by exchanging messages, which can contain:</p>
              <ul className='ml-4 list-inside list-disc space-y-1 text-gray-300'>
                <li>Text content</li>
                <li>Structured data</li>
                <li>Media (images, audio, video)</li>
                <li>References to artifacts</li>
                <li>UI components</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Authentication & Security</h2>
          <p className='mb-4 text-white'>A2A supports enterprise-grade authentication mechanisms:</p>
          <ul className='mb-4 ml-4 list-inside list-disc space-y-1 text-gray-300'>
            <li>OAuth 2.0</li>
            <li>API Keys</li>
            <li>JWT tokens</li>
            <li>Custom authentication schemes</li>
          </ul>
          <p className='text-white'>
            All communications can be secured using TLS, and the protocol includes provisions for audit logging and
            tracing.
          </p>
        </div>

        <div className='mb-12'>
          <h2 className='mb-4 text-center text-2xl font-semibold text-white'>Implementation Basics</h2>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Client Implementation</h3>
              <p className='mb-3 text-gray-300'>To implement a client agent:</p>
              <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
                <li>Create an Agent Card</li>
                <li>Implement the task creation API</li>
                <li>Handle message exchange</li>
                <li>Implement authentication</li>
                <li>Process responses and artifacts</li>
              </ol>
            </div>

            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Remote Agent Implementation</h3>
              <p className='mb-3 text-gray-300'>To implement a remote agent:</p>
              <ol className='ml-4 list-inside list-decimal space-y-1 text-gray-300'>
                <li>Provide an Agent Card endpoint</li>
                <li>Implement task handling</li>
                <li>Support message exchange</li>
                <li>Validate authentication</li>
                <li>Generate and return artifacts</li>
              </ol>
            </div>
          </div>
        </div>

        <div className='mb-8 flex justify-center gap-4'>
          <Link
            href='/overview'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            Back to Overview
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
          <Link
            href='/resources'
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
