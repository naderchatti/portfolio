import { ValidLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/getDictionary';
import { getTimelineData } from '@/data/timeline';
import ClientPage from './client-page';

interface PageProps {
  params: { lang: ValidLocale };
}

export default async function Home({ params }: PageProps) {
  const { lang } = await Promise.resolve(params);
  const dict = await getDictionary(lang);
  const timelineData = getTimelineData(dict);

  return <ClientPage dict={dict} lang={lang} timelineData={timelineData} />;
}
