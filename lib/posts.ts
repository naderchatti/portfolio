import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import type { MDXContent } from 'mdx/types';
import matter from 'gray-matter';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import type { Locale } from '@/lib/i18n';
import { extractRefs, remarkMediaRefs } from '@/lib/mdx/remark-media-refs';
import { remarkHeadingIds, type TocEntry } from '@/lib/mdx/remark-heading-ids';

export type { TocEntry } from '@/lib/mdx/remark-heading-ids';

export const LOG_DIR = path.join(process.cwd(), 'content/log');

export type PostCategory = 'homelab' | 'saas';

export type PostMeta = {
  slug: string;
  lang: Locale;
  title: string;
  /** Long summary (post header, meta description). */
  summary: string;
  /** Short line for log cards. */
  excerpt: string;
  category: PostCategory;
  /** Section names shown as “Inside”. */
  inside: string[];
  /** Media manifest name, or null when the post has no cover yet. */
  cover: string | null;
  /** ISO date (YYYY-MM-DD), or null while undated. */
  date: string | null;
  draft: boolean;
  sources: string[];
  readingMinutes: number;
};

export type Post = PostMeta & {
  Content: MDXContent;
  /** `##` headings, in order, with their anchor ids. */
  toc: TocEntry[];
  /** Media names referenced in the body (`![…](media:name)`). */
  bodyMedia: string[];
};

/** Anchor ids used by the post page itself; headings never reuse them. */
export const RESERVED_IDS = ['top', 'main', 'sources', 'log-list'];

/**
 * Display order for undated posts (newest-looking first). Dated posts sort before these, newest first.
 * Slugs not listed here fall to the end alphabetically.
 */
export const UNDATED_ORDER = [
  'standing-desk-over-wifi',
  'home-assistant-hub',
  'smart-usb-kvm',
  'living-room-tv-rebuilt',
  'custom-google-tv-launcher',
  'bilingual-voice-assistant',
  'speakers-bluetooth-esp32',
  'homelab-one-lxc-per-service',
  'edge-and-network',
  'observability',
  'media-and-multiroom-audio',
  'credits-that-never-drift',
  'realtime-kitchen-screens',
] as const;

const WORDS_PER_MINUTE = 220;

const prettyCode: PrettyCodeOptions = {
  // Near-monochrome themes; colours switch with the `.dark` class via CSS variables (see globals.css).
  theme: { light: 'min-light', dark: 'min-dark' },
  keepBackground: false,
  defaultLang: { block: 'plaintext', inline: 'plaintext' },
};

/** Drafts are visible in `next dev` only, unless explicitly requested. */
const showDrafts = process.env.NODE_ENV !== 'production';

function fail(file: string, message: string): never {
  throw new Error(`${path.relative(process.cwd(), file)}: ${message}`);
}

function str(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== 'string' || value.trim() === '') fail(file, `frontmatter "${key}" must be a non-empty string`);
  return value;
}

function strList(data: Record<string, unknown>, key: string, file: string): string[] {
  const value = data[key] ?? [];
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    fail(file, `frontmatter "${key}" must be a list of strings`);
  }
  return value;
}

function parseDate(value: unknown, file: string): string | null {
  if (value === null || value === undefined || value === '[DATE]') return null;
  // YAML may parse an unquoted date into a Date object.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  fail(file, 'frontmatter "date" must be YYYY-MM-DD or null');
}

export function readingMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, (code) => code.split('\n').slice(0, 20).join(' ')) // code counts, but less
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parseFrontmatter(data: Record<string, unknown>, body: string, file: string, lang: Locale): PostMeta {
  const category = str(data, 'category', file);
  if (category !== 'homelab' && category !== 'saas') fail(file, 'frontmatter "category" must be homelab or saas');
  const cover = data.cover;
  if (cover !== null && cover !== undefined && typeof cover !== 'string') fail(file, '"cover" must be a string');
  const summary = str(data, 'summary', file);
  return {
    slug: str(data, 'slug', file),
    lang,
    title: str(data, 'title', file),
    summary,
    excerpt: typeof data.excerpt === 'string' && data.excerpt ? data.excerpt : summary,
    category,
    inside: strList(data, 'inside', file),
    cover: typeof cover === 'string' && cover !== '[PHOTO]' ? cover : null,
    date: parseDate(data.date, file),
    draft: data.draft === true,
    sources: strList(data, 'sources', file),
    readingMinutes: readingMinutes(body),
  };
}

const readSource = cache(async (slug: string, lang: Locale) => {
  const file = path.join(LOG_DIR, slug, `${lang}.mdx`);
  if (!existsSync(file)) return undefined;
  const raw = await readFile(file, 'utf8');
  const { data, content } = matter(raw);
  const meta = parseFrontmatter(data, content, file, lang);
  if (meta.slug !== slug) fail(file, `slug "${meta.slug}" does not match its folder "${slug}"`);
  return { meta, body: content, file };
});

export const getPostSlugs = cache(async (): Promise<string[]> => {
  const entries = await readdir(LOG_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
});

export function comparePosts(a: PostMeta, b: PostMeta): number {
  if (a.date && b.date) return b.date.localeCompare(a.date);
  if (a.date) return -1;
  if (b.date) return 1;
  const order = UNDATED_ORDER as readonly string[];
  const ia = order.indexOf(a.slug);
  const ib = order.indexOf(b.slug);
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;
  return a.slug.localeCompare(b.slug);
}

/** Previous (newer in display order) and next entries around `slug`. */
export async function getAdjacentPosts(
  slug: string,
  lang: Locale,
): Promise<{ previous: PostMeta | undefined; next: PostMeta | undefined }> {
  const posts = await getAllPosts(lang);
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: posts[index - 1], next: posts[index + 1] };
}

/** All posts written in `lang`, sorted for display. Drafts only outside production builds. */
export const getAllPosts = cache(
  async (lang: Locale, options: { includeDrafts?: boolean } = {}): Promise<PostMeta[]> => {
    const includeDrafts = options.includeDrafts ?? showDrafts;
    const slugs = await getPostSlugs();
    const sources = await Promise.all(slugs.map((slug) => readSource(slug, lang)));
    return sources
      .flatMap((source) => (source ? [source.meta] : []))
      .filter((meta) => includeDrafts || !meta.draft)
      .sort(comparePosts);
  },
);

/** One compiled post, or undefined when it does not exist in `lang` (or is a draft in production). */
export const getPost = cache(async (slug: string, lang: Locale): Promise<Post | undefined> => {
  const source = await readSource(slug, lang);
  if (!source || (source.meta.draft && !showDrafts)) return undefined;
  const toc: TocEntry[] = [];
  const { default: Content } = await evaluate(source.body, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMediaRefs, [remarkHeadingIds, { toc, reserved: RESERVED_IDS }]],
    rehypePlugins: [[rehypePrettyCode, prettyCode]],
  });
  const bodyMedia = extractRefs(source.body).flatMap((ref) => (ref.kind === 'media' ? [ref.name] : []));
  return { ...source.meta, Content, toc, bodyMedia };
});
