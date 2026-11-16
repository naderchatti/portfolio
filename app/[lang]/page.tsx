import { notFound } from 'next/navigation';
import { Hero } from '@/components/home/hero';
import { Activity } from '@/components/home/activity';
import { Built } from '@/components/home/built';
import { Experience } from '@/components/home/experience';
import { Lab } from '@/components/home/lab';
import { Education } from '@/components/home/education';
import { Stack } from '@/components/home/stack';
import { Contact } from '@/components/home/contact';
import { getMessages, isLocale } from '@/lib/i18n';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = getMessages(lang);

  return (
    <>
      <Hero lang={lang} messages={messages} />
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <Activity lang={lang} messages={messages} />
        <Built lang={lang} messages={messages} />
        <Experience lang={lang} messages={messages} />
        <Lab lang={lang} messages={messages} />
        <Education lang={lang} messages={messages} />
        <Stack lang={lang} messages={messages} />
        <Contact lang={lang} messages={messages} />
      </div>
    </>
  );
}
