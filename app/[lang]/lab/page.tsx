import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BuildTiles } from '@/components/lab/build-tiles';
import { NodePanel } from '@/components/lab/node-panel';
import { ScreensGrid } from '@/components/lab/screens-grid';
import { ServicesList } from '@/components/lab/services-list';
import { FramedImage } from '@/components/ui/framed-image';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';
import { labIntro } from '@/content/lab';
import { t } from '@/content/types';
import { uiLab } from '@/content/ui-lab';
import { isLocale, locales } from '@/lib/i18n';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/lab'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = t(labIntro.title, lang);
  const description = t(uiLab.metaDescription, lang);
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/lab/`,
      languages: { en: '/en/lab/', fr: '/fr/lab/' },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      title: `${title} — ${site.name}`,
      description,
      url: `/${lang}/lab/`,
    },
  };
}

export default async function LabPage({ params }: PageProps<'/[lang]/lab'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const posts = new Set((await getAllPosts(lang)).map((post) => post.slug));

  return (
    <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
      <PageHeader path="lab" title={t(labIntro.title, lang)} lead={t(labIntro.lead, lang)} className="pt-16 pb-7" />

      <figure className="mb-10 flex flex-col gap-2">
        <FramedImage
          name={labIntro.hero.image}
          lang={lang}
          ratio="16/9"
          priority
          sizes="(min-width: 1120px) 1056px, 100vw"
        />
        <figcaption className="font-mono text-[11.5px] text-muted-foreground max-sm:text-center">
          {t(labIntro.hero.caption, lang)}
        </figcaption>
      </figure>

      <PageSection id="infrastructure" title={t(uiLab.infrastructure, lang)}>
        <NodePanel lang={lang} />
      </PageSection>

      <PageSection id="builds" title={t(uiLab.builds, lang)}>
        <BuildTiles lang={lang} posts={posts} />
      </PageSection>

      <PageSection id="services" title={t(uiLab.services, lang)}>
        <ServicesList lang={lang} />
      </PageSection>

      <PageSection id="screens" title={t(uiLab.screens, lang)} className="pb-16">
        <ScreensGrid lang={lang} />
      </PageSection>
    </div>
  );
}
