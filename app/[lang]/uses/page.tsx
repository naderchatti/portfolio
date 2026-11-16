import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FramedImage } from '@/components/ui/framed-image';
import { PageHeader } from '@/components/ui/page-header';
import { PathLabel } from '@/components/ui/path-label';
import { UsesSection } from '@/components/uses/uses-section';
import { t } from '@/content/types';
import { uiUses } from '@/content/ui-uses';
import { usesIntro, usesSections } from '@/content/uses';
import { isLocale, locales } from '@/lib/i18n';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/uses'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = t(usesIntro.title, lang);
  const description = t(uiUses.metaDescription, lang);
  const image = { url: `/og/${lang}/uses.png`, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/uses/`,
      languages: { en: '/en/uses/', fr: '/fr/uses/', 'x-default': '/en/uses/' },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      title: `${title} — ${site.name}`,
      description,
      url: `/${lang}/uses/`,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: `${title} — ${site.name}`, description, images: [image.url] },
  };
}

export default async function UsesPage({ params }: PageProps<'/[lang]/uses'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
      <div className="flex flex-col gap-8 pt-16 pb-14">
        <PageHeader path="uses" title={t(usesIntro.title, lang)} lead={t(usesIntro.lead, lang)} size="lg" />
        <div className="grid max-w-[880px] grid-cols-1 gap-4 sm:grid-cols-2">
          {usesIntro.figures.map((figure, index) => (
            <figure key={figure.image} className="flex flex-col gap-2">
              <FramedImage
                name={figure.image}
                lang={lang}
                ratio="3/4"
                priority={index === 0}
                sizes="(min-width: 960px) 432px, (min-width: 640px) 50vw, 100vw"
              />
              <figcaption className="font-mono text-xs text-muted-foreground max-sm:text-center">
                {t(figure.caption, lang)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {usesSections.map((section) => (
        <UsesSection key={section.id} section={section} lang={lang} />
      ))}

      <section className="border-t py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 text-base max-sm:flex-col max-sm:text-center">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 max-sm:flex-col max-sm:items-center">
            <PathLabel path="uses/home" />
            <p>{t(usesIntro.home.lead, lang)}</p>
          </div>
          <Link
            href={`/${lang}/lab/`}
            className="inline-flex min-h-11 items-center font-medium underline underline-offset-4 hover:text-muted-foreground"
          >
            {t(usesIntro.home.link, lang)}
          </Link>
        </div>
      </section>
    </div>
  );
}
