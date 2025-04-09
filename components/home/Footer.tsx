import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className='relative mx-auto flex max-w-pc flex-col justify-between gap-2 px-3 pb-4 pt-10 md:flex-row lg:px-0'>
      <div className='flex flex-col items-start gap-2'>
        <div>
          <h3 className='text-xl font-bold text-white'>{t('title')}</h3>
          <p className='mt-1 max-w-lg text-white/40'>{t('subTitle')}</p>
        </div>
        <div className='mt-2 flex flex-col gap-3 text-white/60'>
          <Link href='/' className='hover:text-white'>
            A2A Protocol
          </Link>
          <Link href='/a2a/overview' className='hover:text-white'>
            Overview
          </Link>
          <Link href='/a2a/specification' className='hover:text-white'>
            Documentation
          </Link>
          <Link href='/a2a/agents' className='hover:text-white'>
            Agents
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='mt-2 flex flex-col gap-3 text-white/60'>
          <h4 className='text-lg font-semibold text-white'>{t('support')}</h4>
          <Link href='/a2a/resources' className='hover:text-white'>
            Resources
          </Link>
          <Link href='mailto:contact@a2a-protocol.dev' className='hover:text-white'>
            {t('contactUs')}
          </Link>
          <Link className='hover:text-white' href='/(footer)/privacy-policy'>
            {t('privacy')}
          </Link>
          <Link className='hover:text-white' href='/(footer)/terms-of-service'>
            {t('termsConditions')}
          </Link>
        </div>
      </div>

      <div className='mt-8 flex w-full justify-between text-white/60 md:mt-auto lg:w-auto'>
        <div className='text-left'>© {new Date().getFullYear()} A2A.plus</div>
      </div>
    </footer>
  );
}
