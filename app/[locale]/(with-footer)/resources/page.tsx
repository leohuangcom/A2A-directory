import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.resources',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: '/resources',
    },
  };
}

export const revalidate = 3600;

export default async function ResourcesPage() {
  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>A2A Protocol Resources</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>
            Documentation, code samples, and implementation guides for the Agent2Agent Protocol.
          </p>
        </div>

        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='rounded-lg bg-gray-800 p-6'>
            <h2 className='mb-4 text-2xl font-semibold text-white'>Documentation</h2>
            <ul className='ml-4 list-inside list-disc space-y-3 text-gray-300'>
              <li>
                <a
                  href='https://developers.googleblog.com/zh-hans/a2a-a-new-era-of-agent-interoperability/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400 hover:underline'
                >
                  A2A Protocol Announcement
                </a>
                <p className='mt-1 text-sm text-gray-400'>Announcement of the A2A Protocol from Google Cloud</p>
              </li>
              <li>
                <button type='button' className='text-blue-400 hover:underline' onClick={() => {}}>
                  Full Protocol Specification
                </button>
                <p className='mt-1 text-sm text-gray-400'>Technical details and API documentation</p>
              </li>
              <li>
                <button type='button' className='text-blue-400 hover:underline' onClick={() => {}}>
                  Implementation Guide
                </button>
                <p className='mt-1 text-sm text-gray-400'>
                  Step-by-step guide to implementing A2A in your applications
                </p>
              </li>
              <li>
                <button type='button' className='text-blue-400 hover:underline' onClick={() => {}}>
                  Security Best Practices
                </button>
                <p className='mt-1 text-sm text-gray-400'>Guidelines for secure implementation of A2A</p>
              </li>
            </ul>
          </div>

          <div className='rounded-lg bg-gray-800 p-6'>
            <h2 className='mb-4 text-2xl font-semibold text-white'>Code Samples</h2>
            <div className='mb-4'>
              <h3 className='mb-2 text-xl font-semibold text-white'>Client Agent Example</h3>
              <pre className='overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-200'>
                {`// Example client agent implementation
const clientAgent = new A2AClientAgent({
  name: "TaskManagerAgent",
  version: "1.0.0",
  description: "Manages tasks across systems"
});

// Create a task for a remote agent
const task = await clientAgent.createTask({
  agentUrl: "https://example.com/agents/recruitment",
  capability: "findCandidates",
  parameters: {
    role: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    location: "Remote"
  }
});

// Subscribe to task updates
clientAgent.onTaskUpdate(task.id, (update) => {
  console.log(\`Task status: \${update.status}\`);
  if (update.artifacts) {
    console.log(\`Received \${update.artifacts.length} candidates\`);
  }
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Getting Started with A2A</h2>

          <div className='space-y-6'>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>1. Understand the Protocol</h3>
              <p className='text-gray-300'>
                Start by reading the{' '}
                <Link href='/overview' className='text-blue-400 hover:underline'>
                  Protocol Overview
                </Link>{' '}
                and
                <Link href='/specification' className='ml-1 text-blue-400 hover:underline'>
                  Technical Specification
                </Link>{' '}
                to understand the core concepts and architecture.
              </p>
            </div>

            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>2. Choose Your Implementation Approach</h3>
              <p className='text-gray-300'>
                Decide whether you need to implement a client agent, a remote agent, or both. Review the code samples
                and select the appropriate libraries and frameworks for your technology stack.
              </p>
            </div>

            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>3. Implement Basic Functionality</h3>
              <p className='text-gray-300'>
                Start with implementing core functionality such as Agent Card creation, task management, and basic
                message exchange. Test with simple scenarios before expanding.
              </p>
            </div>

            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>4. Add Security and Authentication</h3>
              <p className='text-gray-300'>
                Implement appropriate authentication mechanisms and security measures following the best practices
                guide.
              </p>
            </div>

            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>5. Test and Iterate</h3>
              <p className='text-gray-300'>
                Test your implementation thoroughly, focusing on interoperability with other A2A-compatible agents.
                Iterate based on feedback and real-world usage.
              </p>
            </div>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Community and Support</h2>
          <p className='mb-4 text-white'>
            Join the A2A Protocol community to get help, share your experiences, and contribute to the protocol&apos;s
            development:
          </p>
          <ul className='mb-4 ml-4 list-inside list-disc space-y-2 text-gray-300'>
            <li>Community Forum (Coming Soon)</li>
            <li>GitHub Repository (Coming Soon)</li>
            <li>Developer Discord Channel (Coming Soon)</li>
          </ul>
          <p className='text-white'>
            For enterprise support, please contact your Google Cloud representative or one of our
            <Link href='/agents' className='ml-1 text-blue-400 hover:underline'>
              service provider partners
            </Link>
            .
          </p>
        </div>

        <div className='mb-4 text-gray-300'>
          Ready to join the A2A ecosystem? View the
          <Link href='/agents' className='ml-1 text-blue-400 hover:underline'>
            A2A Agents Directory
          </Link>
          or get started with the reference implementation.
        </div>

        <div className='mb-8 flex justify-center gap-4'>
          <Link
            href='/agents'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            Explore A2A Agents
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
          <Link
            href='/specification'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            Read Documentation
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
