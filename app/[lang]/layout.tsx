import { ValidLocale } from '@/lib/i18n';
import { use } from 'react';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: ValidLocale }>;
}) {
  const resolvedParams = use(params);
  return <>{children}</>;
}
