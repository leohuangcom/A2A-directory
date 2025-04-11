import { Suspense } from 'react';
import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import GoogleAdScript from '@/components/ad/GoogleAdScript';
import SeoScript from '@/components/seo/SeoScript';

import Loading from './loading';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className='dark'>
      <head>
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </head>
      <body className='relative mx-auto flex min-h-screen flex-col bg-tap4-black text-white'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            position='top-center'
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
          />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
        <SeoScript />
        <GoogleAdScript />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'A2A Directory',
  description:
    'The official directory and guide for the Agent2Agent (A2A) protocol - an open framework for agent interoperability',
  icons: {
    icon: [
      {
        url: '/docs/images/a2a_logo.png',
        href: '/docs/images/a2a_logo.png',
      },
    ],
    shortcut: ['/docs/images/a2a_logo.png'],
    apple: ['/docs/images/a2a_logo.png'],
  },
};
