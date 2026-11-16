import { readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { experience } from '@/content/experience';
import { labIntro, nodes, screens, services, tiles } from '@/content/lab';
import { projects } from '@/content/projects';
import { t, type Text } from '@/content/types';
import { getLogStrings } from '@/content/ui-log';
import { uiLab } from '@/content/ui-lab';
import { usesIntro, usesSections } from '@/content/uses';
import { getMessages, type Locale } from '@/lib/i18n';
import { slugify } from '@/lib/mdx/remark-heading-ids';
import { getAllPosts, LOG_DIR, RESERVED_IDS } from '@/lib/posts';
import type { SearchDoc, SearchIndexFile } from '@/lib/search/types';

/** Body budget per post document and per post section, in characters. */
const POST_BODY = 2400;
const SECTION_BODY = 700;
const CODE_LINES = 8;

const join = (values: readonly (string | undefined)[]) => values.filter((value) => value && value.trim()).join(' · ');

function clip(text: string, size: number): string {
  if (text.length <= size) return text;
  const cut = text.slice(0, size);
  const space = cut.lastIndexOf(' ');
  return `${space > size * 0.8 ? cut.slice(0, space) : cut}…`;
}

/** Inline Markdown → text, mirroring remark's plain text (text + inline code values). */
function inlineText(line: string): string {
  return line
    .replace(/!\[([^\]]*)\]\((?:diagram):[^)]*\)/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__|\*|~~)(?=\S)([^*~]*?\S)\1/g, '$2')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}

/** One block-level Markdown line → text (list markers, quotes, table pipes removed). */
function lineText(line: string): string {
  if (/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line)) return '';
  if (/^\s*(import|export)\s/.test(line)) return '';
  const stripped = line
    .replace(/^\s*>\s?/, '')
    .replace(/^\s*([-*+]|\d+[.)])\s+(\[[ xX]\]\s+)?/, '')
    .replace(/\|/g, ' ');
  return inlineText(stripped);
}

type Section = { depth: 2 | 3; title: string; id: string; text: string[] };

/** Splits an MDX body into its intro text and `##`/`###` sections with the same ids as `remarkHeadingIds`. */
function splitSections(body: string): { intro: string; sections: Section[] } {
  const seen = new Map<string, number>(RESERVED_IDS.map((id) => [id, 1]));
  const intro: string[] = [];
  const sections: Section[] = [];
  let fence: string | null = null;
  let codeLines = 0;
  for (const raw of body.split('\n')) {
    const target = sections.at(-1)?.text ?? intro;
    const fenceMatch = /^\s*(```+|~~~+)/.exec(raw);
    if (fenceMatch) {
      fence = fence === null ? fenceMatch[1]!.slice(0, 3) : raw.trim().startsWith(fence) ? null : fence;
      codeLines = 0;
      continue;
    }
    if (fence !== null) {
      // Code counts, but only its first lines (identifiers like `esp32` are worth finding).
      if (codeLines++ < CODE_LINES && raw.trim()) target.push(raw.trim());
      continue;
    }
    const heading = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(raw);
    if (heading) {
      const title = inlineText(heading[2]!);
      const base = slugify(title);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;
      sections.push({ depth: heading[1]!.length as 2 | 3, title, id, text: [] });
      continue;
    }
    if (/^\s*#\s/.test(raw)) continue;
    const text = lineText(raw);
    if (text) target.push(text);
  }
  return { intro: intro.join(' '), sections };
}

const squash = (parts: readonly string[]) => parts.join(' ').replace(/\s+/g, ' ').trim();

async function postDocs(lang: Locale): Promise<SearchDoc[]> {
  const ui = getLogStrings(lang);
  const posts = await getAllPosts(lang);
  const docs: SearchDoc[] = [];
  for (const post of posts) {
    const raw = await readFile(path.join(LOG_DIR, post.slug, `${lang}.mdx`), 'utf8');
    const { intro, sections } = splitSections(matter(raw).content);
    const url = `/${lang}/log/${post.slug}/`;
    const fullText = squash([intro, ...sections.map((section) => squash(section.text))]);
    docs.push({
      id: `post:${post.slug}`,
      kind: 'post',
      title: post.title,
      parent: ui.categories[post.category],
      url,
      headings: join(sections.map((section) => section.title)),
      chips: join([ui.categories[post.category], ...post.inside]),
      body: clip(squash([post.summary, fullText]), POST_BODY),
    });
    for (const section of sections) {
      docs.push({
        id: `section:${post.slug}#${section.id}`,
        kind: 'section',
        title: section.title,
        parent: post.title,
        url: `${url}#${section.id}`,
        body: clip(squash(section.text), SECTION_BODY),
      });
    }
  }
  return docs;
}

function pageDocs(lang: Locale): SearchDoc[] {
  const messages = getMessages(lang);
  return [
    {
      id: 'page:home',
      kind: 'page',
      title: lang === 'fr' ? 'Accueil' : 'Home',
      url: `/${lang}/`,
      chips: join([messages.nav.built, messages.nav.experience, messages.sections.education.title, messages.sections.stack.title]),
      body: join([messages.meta.description, messages.home.intro]),
    },
    {
      id: 'page:lab',
      kind: 'page',
      title: t(labIntro.title, lang),
      url: `/${lang}/lab/`,
      chips: join([t(uiLab.infrastructure, lang), t(uiLab.builds, lang), t(uiLab.services, lang), t(uiLab.screens, lang)]),
      body: join([t(labIntro.lead, lang), t(labIntro.summaryLine, lang)]),
    },
    {
      id: 'page:log',
      kind: 'page',
      title: messages.log.title,
      url: `/${lang}/log/`,
      body: messages.log.lead,
    },
    {
      id: 'page:uses',
      kind: 'page',
      title: t(usesIntro.title, lang),
      url: `/${lang}/uses/`,
      chips: join(usesSections.map((section) => t(section.title, lang))),
      body: t(usesIntro.lead, lang),
    },
  ];
}

function projectDocs(lang: Locale): SearchDoc[] {
  return projects.map((project) => ({
    id: `project:${project.slug}`,
    kind: 'project',
    title: project.name,
    parent: t(project.affiliation, lang),
    url: `/${lang}/#project-${project.slug}`,
    chips: join(project.stack),
    body: squash([t(project.summary, lang), ...project.bullets.map((bullet) => `${t(bullet, lang)}.`), t(project.detail, lang)]),
  }));
}

function experienceDocs(lang: Locale): SearchDoc[] {
  return experience.map((job) => ({
    id: `experience:${job.slug}`,
    kind: 'experience',
    title: job.org,
    parent: t(job.role, lang),
    url: `/${lang}/#experience`,
    chips: join(job.stack),
    body: squash([
      t(job.summary, lang),
      ...job.bullets.map((bullet) => `${t(bullet, lang)}.`),
      job.detail ? t(job.detail, lang) : '',
    ]),
  }));
}

function labDocs(lang: Locale): SearchDoc[] {
  const lab = `/${lang}/lab/`;
  const opt = (value: Text | undefined) => (value === undefined ? '' : t(value, lang));
  return [
    ...nodes.map(
      (node): SearchDoc => ({
        id: `lab:${node.id}`,
        kind: 'lab',
        title: t(node.name, lang),
        parent: `${t(uiLab.infrastructure, lang)} · ${node.id}`,
        url: `${lab}#infrastructure`,
        body: t(node.hardware, lang),
      }),
    ),
    ...tiles.map(
      (tile): SearchDoc => ({
        id: `lab:${tile.slug}`,
        kind: 'lab',
        title: t(tile.title, lang),
        parent: t(uiLab.builds, lang),
        url: `${lab}#builds`,
        chips: join([...tile.stack, ...(tile.featured?.tags ?? [])]),
        body: squash([
          t(tile.summary, lang),
          opt(tile.note),
          ...(tile.bullets ?? []).map((bullet) => `${t(bullet, lang)}.`),
          opt(tile.credit),
        ]),
      }),
    ),
    ...services.map(
      (service): SearchDoc => ({
        id: `lab:service:${slugify(service.name)}`,
        kind: 'lab',
        title: service.name,
        parent: t(uiLab.services, lang),
        url: `${lab}#services`,
        body: t(service.purpose, lang),
      }),
    ),
    ...screens.map(
      (screen): SearchDoc => ({
        id: `lab:screen:${screen.image}`,
        kind: 'lab',
        title: t(screen.caption, lang),
        parent: t(uiLab.screens, lang),
        url: `${lab}#screens`,
      }),
    ),
  ];
}

function usesDocs(lang: Locale): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const section of usesSections) {
    const title = t(section.title, lang);
    const url = `/${lang}/uses/#${section.id}`;
    const items = section.items.map((item) => ({
      label: t(item.label, lang),
      value: t(item.value, lang) || (item.link ? t(item.link.label, lang) : ''),
    }));
    docs.push({
      id: `uses:${section.id}`,
      kind: 'uses',
      title,
      parent: t(usesIntro.title, lang),
      url,
      chips: join(items.map((item) => item.label)),
      body: squash(items.map((item) => `${item.label}: ${item.value}.`)),
    });
    for (const item of items) {
      if (!item.value) continue;
      docs.push({
        id: `uses:${section.id}:${slugify(item.label)}`,
        kind: 'uses',
        title: item.value,
        parent: `${title} · ${item.label}`,
        url,
      });
    }
  }
  return docs;
}

/** Every searchable document of the site in one language. */
export async function buildSearchIndex(lang: Locale): Promise<SearchIndexFile> {
  const docs = [
    ...pageDocs(lang),
    ...(await postDocs(lang)),
    ...projectDocs(lang),
    ...experienceDocs(lang),
    ...labDocs(lang),
    ...usesDocs(lang),
  ];
  const ids = new Set<string>();
  for (const doc of docs) {
    if (ids.has(doc.id)) throw new Error(`search index: duplicate id "${doc.id}"`);
    ids.add(doc.id);
  }
  return { version: 1, lang, docs };
}
