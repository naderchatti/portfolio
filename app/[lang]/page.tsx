import { ValidLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/getDictionary';
import { getTimelineData } from '@/data/timeline';
import ClientPage from './client-page';

interface PageProps {
  params: Promise<{ lang: ValidLocale }>;
}

export default async function Home({ params }: PageProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  const timelineData = getTimelineData(dict);

  return (
    <ClientPage
      dict={dict}
      lang={resolvedParams.lang}
      timelineData={timelineData}
    />
  );
}
