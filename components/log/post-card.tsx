import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Picture } from '@/components/media/picture';
import { findImage } from '@/content/media';
import { formatPostDate, getLogStrings } from '@/content/ui-log';
import type { Locale, Messages } from '@/lib/i18n';
import type { PostMeta } from '@/lib/posts';

export function minutesLabel(messages: Messages, minutes: number): string {
  return messages.log.minutes.replace('{count}', String(minutes));
}

/** Thumbnail: photos crop to 4:3 around their focal point, screenshots are letterboxed. */
function PostThumb({ post, lang, className }: { post: PostMeta; lang: Locale; className?: string }) {
  const image = post.cover ? findImage(post.cover) : undefined;
  if (!image) return null;
  const screenshot = !image.focal;
  return (
    <Picture
      image={image}
      lang={lang}
      alt=""
      fit={screenshot ? 'contain' : 'cover'}
      sizes="132px"
      className={`aspect-[4/3] shrink-0 rounded-lg border bg-secondary ${className ?? ''}`}
    />
  );
}

/** One entry in the log index. The title link stretches over the whole row. */
export function PostCard({ post, lang, messages }: { post: PostMeta; lang: Locale; messages: Messages }) {
  const ui = getLogStrings(lang);
  const href = `/${lang}/log/${post.slug}/`;

  return (
    <article className="group relative grid gap-2 py-6 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ring min-[900px]:grid-cols-[120px_minmax(0,1fr)_24px] min-[900px]:items-baseline min-[900px]:gap-6">
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs text-muted-foreground min-[900px]:flex-col">
        {post.date ? <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time> : null}
        <span>{minutesLabel(messages, post.readingMinutes)}</span>
        <span>{ui.categories[post.category]}</span>
      </div>

      <div className="flex items-start justify-between gap-4 sm:gap-5">
        <div className="min-w-0">
          {post.draft ? (
            <span className="mb-1.5 inline-flex rounded-md border px-2 py-px text-[11px] font-semibold">
              {messages.log.draft}
            </span>
          ) : null}
          <h2 className="text-[19px] leading-snug font-semibold tracking-[-0.02em]">
            <Link
              href={href}
              className="underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-1 mb-2.5 text-sm text-muted-foreground">{post.excerpt}</p>
          {post.inside.length > 0 ? (
            <p className="font-mono text-xs leading-5 text-muted-foreground">
              <span className="mr-2 text-foreground">{messages.log.inside}</span>
              {post.inside.join(' · ')}
            </p>
          ) : null}
        </div>
        <PostThumb post={post} lang={lang} className="w-[88px] sm:w-[132px]" />
      </div>

      <ArrowRight
        aria-hidden="true"
        className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none min-[900px]:block"
      />
    </article>
  );
}
