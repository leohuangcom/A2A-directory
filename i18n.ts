import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const languages = [
  {
    code: 'en-US',
    lang: 'en-US',
    label: 'English',
  },
  {
    code: 'zh-CN',
    lang: 'zh-CN',
    label: '简体中文',
  },
  {
    code: 'zh-TW',
    lang: 'zh-TW',
    label: '繁體中文',
  },
  {
    code: 'ja-JP',
    lang: 'ja-JP',
    label: '日本語',
  },
  {
    code: 'de-DE',
    lang: 'de-DE',
    label: 'Deutsch',
  },
  {
    code: 'es-ES',
    lang: 'es-ES',
    label: 'Español',
  },
  {
    code: 'fr-FR',
    lang: 'fr-FR',
    label: 'Français',
  },
  {
    code: 'pt-BR',
    lang: 'pt-BR',
    label: 'Português',
  },
  {
    code: 'ru-RU',
    lang: 'ru-RU',
    label: 'Русский',
  },
];

export const locales = languages.map((lang) => lang.lang);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    // 如果找不到完整的语言代码文件，尝试使用基础语言代码
    const baseLocale = locale.split('-')[0];
    try {
      const messages = (await import(`./messages/${baseLocale}.json`)).default;
      return { messages };
    } catch (e) {
      // 如果基础语言文件也不存在，返回 404
      notFound();
    }
  }
});
