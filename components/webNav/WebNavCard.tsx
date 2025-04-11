import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { WebNavigationListRow } from '@/lib/data';

import BaseImage from '../image/BaseImage';

export default function WebNavCard({
  name,
  thumbnailUrl,
  title,
  content,
}: Omit<WebNavigationListRow, 'url' | 'id' | 'imageUrl'>) {
  const t = useTranslations('Navigation');
  
  // 尝试获取翻译，如果没有则使用原始文本
  const translatedTitle = t(title, { fallback: title });
  const translatedContent = t(content, { fallback: content });
  
  return (
    <div className='flex flex-col gap-3 rounded-[12px] bg-[#2C2D36] p-2 lg:p-5'>
      <Link href={`/agents/${name}`} title={translatedTitle} className='hover:opacity-70'>
        <BaseImage
          width={278}
          height={156}
          src={thumbnailUrl || ''}
          alt={translatedTitle}
          title={translatedTitle}
          className='aspect-[278/156] rounded-[8px] bg-white/40'
        />
      </Link>
      <div className='flex items-center justify-between'>
        <Link href={`/agents/${name}`} title={translatedTitle} className='w-full hover:opacity-70'>
          <h3 className='line-clamp-1 text-sm font-bold lg:text-base'>{translatedTitle}</h3>
        </Link>
      </div>
      <Link href={`/agents/${name}`} title={translatedTitle} className='hover:opacity-70'>
        <p className='line-clamp-5 text-xs text-white/70 lg:text-sm'>{translatedContent}</p>
      </Link>
    </div>
  );
}
