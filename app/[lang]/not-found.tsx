import { lang } from 'next/root-params';
import { NotFoundView } from '@/components/not-found-view';
import { defaultLocale, getMessages, isLocale } from '@/lib/i18n';

export default async function LocaleNotFound() {
  const value = await lang();
  const locale = value && isLocale(value) ? value : defaultLocale;
  return <NotFoundView locale={locale} messages={getMessages(locale).notFound} />;
}
