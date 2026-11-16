import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LogIndex, type LogIndexItem } from '@/components/log/log-index';
import { PostCard } from '@/components/log/post-card';
import { getLogStrings } from '@/content/ui-log';
import { getMessages, isLocale } from '@/lib/i18n';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]/log'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const messages = getMessages(lang);
  const ui = getLogStrings(lang);
  const image = { url: `/og/${lang}/log.png`, width: 1200, height: 630, alt: messages.log.title };

  return {
    title: messages.log.title,
    description: messages.log.lead,
    alternates: {
      canonical: `/${lang}/log/`,
      languages: { en: '/en/log/', fr: '/fr/log/', 'x-default': '/en/log/' },
      types: { 'application/rss+xml': [{ url: `/${lang}/log/rss.xml`, title: ui.feedTitle }] },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      title: messages.log.title,
      description: messages.log.lead,
      url: `/${lang}/log/`,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: messages.log.title, description: messages.log.lead, images: [image.url] },
  };
}

export default async function LogPage({ params }: PageProps<'/[lang]/log'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = getMessages(lang);
  const ui = getLogStrings(lang);
  const posts = await getAllPosts(lang);

  const items: LogIndexItem[] = posts.map((post) => ({
    slug: post.slug,
    category: post.category,
    haystack: [post.title, post.summary, post.excerpt, ...post.inside]
      .join(' ')
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase(),
    card: <PostCard post={post} lang={lang} messages={messages} />,
  }));

  return (
    <div className="mx-auto max-w-[960px] px-4 pb-20 sm:px-8">
      <header className="border-b pt-14 pb-10 text-center sm:pt-[72px] sm:text-left">
        <p className="font-mono text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">~</span>/log
        </p>
        <h1 className="mt-3 mb-3.5 text-4xl leading-none font-semibold tracking-[-0.045em] sm:text-5xl">
          {messages.log.title}
        </h1>
        <p className="mx-auto max-w-[620px] text-[17px] text-muted-foreground sm:mx-0">{messages.log.lead}</p>
        <p className="mt-4 font-mono text-xs">
          <a
            href={`/${lang}/log/rss.xml`}
            className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4 hover:text-foreground sm:min-h-0"
          >
            {ui.rss}
          </a>
        </p>
      </header>

      <LogIndex
        items={items}
        labels={{
          filterLabel: messages.log.filterLabel,
          filters: messages.log.filters,
          searchLabel: messages.log.searchLabel,
          searchPlaceholder: messages.log.searchPlaceholder,
          countOne: messages.log.count.one,
          countOther: messages.log.count.other,
          empty: messages.log.empty,
          noResults: ui.noResults,
          clearSearch: ui.clearSearch,
          resetFilters: ui.resetFilters,
        }}
      />
    </div>
  );
}
