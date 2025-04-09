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
      canonical: './overview',
    },
  };
}

export const revalidate = 3600;

export default async function OverviewPage() {
  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-8'>
          <h1 className='mb-4 text-center text-3xl font-bold text-white'>A2A Protocol Overview</h1>
          <p className='mx-auto mb-8 max-w-3xl text-center text-gray-300'>
            The Agent2Agent (A2A) Protocol is a new era of agent interoperability, enabling AI agents to communicate and
            collaborate seamlessly.
          </p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>Agent2Agent Protocol (A2A)</h2>
          <p className='mb-4 text-white'>
            A2A is an open protocol developed by Google Cloud with support from over 50 technology partners. It provides
            a standard way for AI agents to communicate with each other, securely exchange information, and coordinate
            actions across various enterprise platforms or applications.
          </p>
          <p className='mb-4 text-white'>
            This collaborative effort signifies a shared vision of a future when AI agents, regardless of their
            underlying technologies, can seamlessly collaborate to automate complex enterprise workflows and drive
            unprecedented levels of efficiency and innovation.
          </p>
          <p className='text-white'>
            A2A complements Anthropic&apos;s Model Context Protocol (MCP), which provides helpful tools and context to
            agents. Drawing on Google&apos;s internal expertise in scaling agentic systems, the A2A protocol addresses
            the challenges identified in deploying large-scale, multi-agent systems for customers.
          </p>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>A2A Design Principles</h2>
          <p className='mb-6 text-white'>The A2A protocol adheres to five key design principles:</p>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>1. Embrace Agentic Capabilities</h3>
              <p className='text-gray-300'>
                A2A focuses on enabling agents to collaborate in their natural, unstructured modalities, even when they
                don&apos;t share memory, tools and context. This enables true multi-agent scenarios without limiting an
                agent to a &quot;tool.&quot;
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>2. Build on Existing Standards</h3>
              <p className='text-gray-300'>
                The protocol is built on top of existing, popular standards including HTTP, SSE, JSON-RPC, which means
                it&apos;s easier to integrate with existing IT stacks businesses already use daily.
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>3. Secure by Default</h3>
              <p className='text-gray-300'>
                A2A is designed to support enterprise-grade authentication and authorization, with parity to
                OpenAPI&apos;s authentication schemes at launch.
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>4. Support for Long-Running Tasks</h3>
              <p className='text-gray-300'>
                A2A is designed to be flexible and support scenarios where it excels at completing everything from quick
                tasks to deep research that may take hours or even days when humans are in the loop. Throughout this
                process, A2A can provide real-time feedback, notifications, and state updates to its users.
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>5. Modality Agnostic</h3>
              <p className='text-gray-300'>
                The agentic world isn&apos;t limited to just text, which is why A2A is designed to support various
                modalities, including audio and video streaming.
              </p>
            </div>
          </div>
        </div>

        <div className='mb-12 rounded-lg bg-gray-800 p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-white'>How A2A Works</h2>
          <p className='mb-6 text-white'>
            A2A facilitates communication between a &quot;client&quot; agent and a &quot;remote&quot; agent. A client
            agent is responsible for formulating and communicating tasks, while the remote agent is responsible for
            acting on those tasks in an attempt to provide the correct information or take the correct action. This
            interaction involves several key capabilities:
          </p>
          <div className='space-y-6'>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>Capability Discovery</h3>
              <p className='text-gray-300'>
                Agents can advertise their capabilities using an &quot;Agent Card&quot; in JSON format, allowing the
                client agent to identify the best agent that can perform a task and leverage A2A to communicate with the
                remote agent.
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>Task Management</h3>
              <p className='text-gray-300'>
                The communication between a client and remote agent is oriented towards task completion, in which agents
                work to fulfill end-user requests. This &quot;task&quot; object is defined by the protocol and has a
                lifecycle. It can be completed immediately or, for long-running tasks, each of the agents can
                communicate to stay in sync with each other on the latest status of completing a task. The output of a
                task is known as an &quot;artifact.&quot;
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>Collaboration</h3>
              <p className='text-gray-300'>
                Agents can send each other messages to communicate context, replies, artifacts, or user instructions.
              </p>
            </div>
            <div>
              <h3 className='mb-2 text-xl font-semibold text-white'>User Experience Negotiation</h3>
              <p className='text-gray-300'>
                Each message includes &quot;parts,&quot; which is a fully formed piece of content, like a generated
                image. Each part has a specified content type, allowing client and remote agents to negotiate the
                correct format needed and explicitly include negotiations of the user&apos;s UI capabilities–e.g.,
                iframes, video, web forms, and more.
              </p>
            </div>
          </div>
        </div>

        <div className='mb-8 flex justify-center gap-4'>
          <Link
            href='/specification'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            View Technical Specification
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
          <Link
            href='/agents'
            className='flex items-center justify-center gap-2 rounded-[9px] border border-white px-4 py-2 text-sm hover:opacity-70'
          >
            Explore Agents
            <CircleChevronRight className='h-[16px] w-[16px]' />
          </Link>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}
