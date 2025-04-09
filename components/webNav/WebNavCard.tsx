import Link from 'next/link';

import { WebNavigationListRow } from '@/lib/data';

import BaseImage from '../image/BaseImage';

export default function WebNavCard({
  name,
  thumbnailUrl,
  title,
  content,
}: Omit<WebNavigationListRow, 'url' | 'id' | 'imageUrl'>) {
  return (
    <div className='flex flex-col gap-3 rounded-[12px] bg-[#2C2D36] p-2 lg:p-5'>
      <Link href={`/agents/${name}`} title={title} className='hover:opacity-70'>
        <BaseImage
          width={278}
          height={156}
          src={thumbnailUrl || ''}
          alt={title}
          title={title}
          className='aspect-[278/156] rounded-[8px] bg-white/40'
        />
      </Link>
      <div className='flex items-center justify-between'>
        <Link href={`/agents/${name}`} title={title} className='w-full hover:opacity-70'>
          <h3 className='line-clamp-1 text-sm font-bold lg:text-base'>{title}</h3>
        </Link>
      </div>
      <Link href={`/agents/${name}`} title={title} className='hover:opacity-70'>
        <p className='line-clamp-5 text-xs text-white/70 lg:text-sm'>{content}</p>
      </Link>
    </div>
  );
}
