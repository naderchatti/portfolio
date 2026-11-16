import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Picture } from '@/components/media/picture';
import { minutesLabel } from '@/components/log/post-card';
import prose from '@/components/log/prose.module.css';
import { TableOfContents } from '@/components/log/toc';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { findImage } from '@/content/media';
import { formatPostDate, getLogStrings } from '@/content/ui-log';
import { getMessages, isLocale, locales, otherLocale } from '@/lib/i18n';
import { getAdjacentPosts, getAllPosts, getPost } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamicParams = false;

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (lang) => (await getAllPosts(lang)).map((post) => ({ lang, slug: post.slug }))),
  );
  return params.flat();
}

export async function generateMetadata({ params }: PageProps<'/[lang]/log/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = await getPost(slug, lang);
  if (!post) return {};
  const other = otherLocale(lang);
  const translated = (await getAllPosts(other)).some((entry) => entry.slug === slug);
  const path = (locale: string) => `/${locale}/log/${slug}/`;
  const image = { url: `/og/${lang}/${slug}.png`, width: 1200, height: 630, alt: post.title };

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: path(lang),
      languages: translated
        ? { [lang]: path(lang), [other]: path(other), 'x-default': path('en') }
        : { [lang]: path(lang) },
    },
    openGraph: {
      type: 'article',
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      title: post.title,
      description: post.summary,
      url: path(lang),
      images: [image],
      ...(post.date ? { publishedTime: post.date } : {}),
      authors: [site.name],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.summary, images: [image.url] },
  };
}

function sourceLabel(url: string): string {
  try {
    const { hostname, pathname } = new URL(url);
    const path = pathname.replace(/\/$/, '');
    return `${hostname.replace(/^www\./, '')}${path}`;
  } catch {
    return url;
  }
}

export default async function PostPage({ params }: PageProps<'/[lang]/log/[slug]'>) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = await getPost(slug, lang);
  if (!post) notFound();
  const messages = getMessages(lang);
  const ui = getLogStrings(lang);
  const { previous, next } = await getAdjacentPosts(slug, lang);
  const { Content } = post;

  // The cover is usually also the first figure of the body; only show it on top when it is not.
  const cover = post.cover ? findImage(post.cover) : undefined;
  const showCover = cover !== undefined && !post.bodyMedia.includes(cover.name);
  // Posts that already end with a “Credits & sources” chapter keep theirs.
  const showSources = post.sources.length > 0 && !post.toc.some((entry) => /credit|crédit|source/i.test(entry.text));
  const toc = showSources ? [...post.toc, { id: 'sources', text: ui.credits }] : post.toc;

  return (
    <article className="mx-auto max-w-[1080px] px-4 pb-20 sm:px-8">
      <header className="border-b pt-14 pb-9 text-center sm:pt-16 sm:text-left">
        <p className="font-mono text-[13px] break-all text-muted-foreground">
          <Link href={`/${lang}/log/`} className="rounded-sm hover:text-foreground">
            <span className="font-medium text-foreground">~</span>/log
          </Link>{' '}
          / {post.slug}
        </p>
        <h1 className="mx-auto mt-3.5 mb-4 max-w-[820px] text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-balance sm:mx-0 sm:text-[46px] sm:leading-[1.05]">
          {post.title}
        </h1>
        <p className="mx-auto mb-5 max-w-[640px] text-[17px] text-muted-foreground sm:mx-0">{post.summary}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-muted-foreground sm:justify-start">
          {post.date ? (
            <>
              <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
              <Dot />
            </>
          ) : null}
          <span>{minutesLabel(messages, post.readingMinutes)}</span>
          <Dot />
          <Link
            href={`/${lang}/log/?category=${post.category}`}
            className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-sans text-xs font-semibold text-foreground hover:bg-secondary"
          >
            {ui.categories[post.category]}
          </Link>
          {post.draft ? (
            <>
              <Dot />
              <span className="font-sans font-semibold text-destructive">{messages.log.draft}</span>
            </>
          ) : null}
        </div>
      </header>

      <div className="grid items-start gap-7 pt-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 lg:pt-12">
        <TableOfContents entries={toc} label={messages.log.onThisPage} />

        <div className="min-w-0">
          <div className={prose.prose}>
            {showCover ? (
              <figure>
                <Picture
                  image={cover}
                  lang={lang}
                  priority
                  fit={cover.focal ? 'cover' : 'contain'}
                  sizes="(min-width: 1080px) 720px, 100vw"
                  className="aspect-[4/3] rounded-card border bg-secondary"
                />
              </figure>
            ) : null}

            <Content components={mdxComponents(lang)} />

            {showSources ? (
              <section aria-labelledby="sources">
                <h2 id="sources">{ui.credits}</h2>
                <ul role="list" className="!flex !list-none !gap-0 overflow-hidden rounded-card border !p-0">
                  {post.sources.map((url) => (
                    <li key={url} className="border-b px-4 py-3 text-[15px] last:border-b-0">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium break-all">
                        {sourceLabel(url)}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {previous || next ? (
            <nav aria-label={ui.postNav} className="mt-12 grid max-w-[68ch] gap-3 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={`/${lang}/log/${previous.slug}/`}
                  rel="prev"
                  className="flex min-h-11 flex-col gap-1 rounded-card border p-4 transition-colors hover:bg-secondary"
                >
                  <span className="font-mono text-xs text-muted-foreground">← {ui.previous}</span>
                  <span className="text-[15px] font-semibold">{previous.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/${lang}/log/${next.slug}/`}
                  rel="next"
                  className="flex min-h-11 flex-col gap-1 rounded-card border p-4 text-right transition-colors hover:bg-secondary"
                >
                  <span className="font-mono text-xs text-muted-foreground">{ui.next} →</span>
                  <span className="text-[15px] font-semibold">{next.title}</span>
                </Link>
              ) : null}
            </nav>
          ) : null}

          <footer className="mt-12 flex max-w-[68ch] flex-wrap items-center justify-center gap-3.5 border-t pt-6 text-center sm:flex-nowrap sm:justify-start sm:text-left">
            <Logo className="size-10 shrink-0" />
            <div>
              <p className="font-semibold">{site.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{ui.endOfEntry}</p>
            </div>
            <Link
              href={`/${lang}/log/`}
              className="inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-secondary sm:ml-auto sm:min-h-9"
            >
              {ui.allEntries}
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}

function Dot() {
  return <i aria-hidden="true" className="inline-block size-[3px] rounded-full bg-muted-foreground" />;
}
