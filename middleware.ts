import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // Used when no locale matches
  defaultLocale: 'en-US',
  localePrefix: 'always',
});

// 配置需要国际化的路由
export const config = {
  // 跳过 /docs 路径的国际化处理
  matcher: ['/((?!docs|api|_next|_vercel|.*\\..*).*)']
};
