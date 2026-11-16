#!/usr/bin/env -S pnpm exec tsx
// Content integrity check (run with `pnpm check:content`, which uses tsx so it can import the TS content).
// Fails on: wrong post counts, missing translations, unknown media/diagram refs, broken internal links,
// MDX that does not compile, or manifest entries whose files are missing.
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { generatedImages, generatedVideos } from '../content/media.generated';
import { findImage } from '../content/media';
import { projects } from '../content/projects';
import { labIntro, nodes, tiles, compactOrder, screens } from '../content/lab';
import { usesIntro, usesSections } from '../content/uses';
import { activity } from '../content/activity';
import { extractRefs } from '../lib/mdx/remark-media-refs';
import { getAllPosts, getPostSlugs, LOG_DIR, UNDATED_ORDER } from '../lib/posts';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { remarkMediaRefs } from '../lib/mdx/remark-media-refs';

const EXPECTED_POSTS = 13;
const DIAGRAMS = new Set(['standing-desk', 'smart-usb-kvm', 'voice-satellite', 'speakers']);

const errors = [];
const warnings = [];
const used = new Set();

function refImage(name, where) {
  used.add(name);
  if (!findImage(name)) errors.push(`${where}: unknown media "${name}"`);
}

// Posts -------------------------------------------------------------------
const slugs = await getPostSlugs();
const published = {};
for (const lang of ['en', 'fr']) {
  const posts = await getAllPosts(lang, { includeDrafts: false });
  published[lang] = new Set(posts.map((p) => p.slug));
  if (posts.length !== EXPECTED_POSTS) errors.push(`${lang}: ${posts.length} published posts, expected ${EXPECTED_POSTS}`);
  for (const post of posts) {
    if (!UNDATED_ORDER.includes(post.slug) && !post.date) warnings.push(`${post.slug}: undated and not in UNDATED_ORDER`);
  }
}
for (const slug of published.en) if (!published.fr.has(slug)) errors.push(`${slug}: missing fr.mdx`);
for (const slug of published.fr) if (!published.en.has(slug)) errors.push(`${slug}: missing en.mdx`);

for (const slug of slugs) {
  for (const lang of ['en', 'fr']) {
    const file = path.join(LOG_DIR, slug, `${lang}.mdx`);
    if (!existsSync(file)) continue;
    const where = path.relative(process.cwd(), file);
    const { data, content } = matter(await readFile(file, 'utf8'));
    if (typeof data.cover === 'string') refImage(data.cover, `${where} cover`);
    for (const ref of extractRefs(content)) {
      if (ref.kind === 'media') refImage(ref.name, where);
      else if (!DIAGRAMS.has(ref.name)) errors.push(`${where}: unknown diagram "${ref.name}"`);
    }
    if (/Stirling/i.test(content)) errors.push(`${where}: mentions Stirling-PDF (use BentoPDF)`);
    try {
      await evaluate(content, { ...runtime, remarkPlugins: [remarkGfm, remarkMediaRefs] });
    } catch (error) {
      errors.push(`${where}: MDX does not compile — ${error instanceof Error ? error.message : error}`);
    }
  }
}

// Structured content -----------------------------------------------------
const allPosts = new Set([...published.en]);
for (const project of projects) {
  const m = project.media;
  if (m.kind === 'landing') {
    refImage(m.dark, `projects/${project.slug}`);
    if (m.light) refImage(m.light, `projects/${project.slug}`);
  } else m.items.forEach((name) => refImage(name, `projects/${project.slug}`));
}
refImage(labIntro.hero.image, 'lab hero');
for (const node of nodes) if (node.image) refImage(node.image.name, `lab node ${node.id}`);
for (const tile of tiles) {
  if (tile.media) [tile.media.main, ...(tile.media.thumbs ?? [])].forEach((n) => refImage(n, `lab tile ${tile.slug}`));
  for (const slug of [tile.post, tile.secondaryPost?.slug]) {
    if (slug && !allPosts.has(slug)) errors.push(`lab tile ${tile.slug}: unknown post "${slug}"`);
  }
}
const tileSlugs = new Set(tiles.map((t) => t.slug));
for (const slug of compactOrder) {
  if (!tileSlugs.has(slug)) errors.push(`lab compactOrder: unknown tile "${slug}"`);
  else if (!tiles.find((t) => t.slug === slug)?.compact) errors.push(`lab tile ${slug}: in compactOrder without "compact"`);
}
screens.forEach((s) => refImage(s.image, 'lab screens'));
usesIntro.figures.forEach((f) => refImage(f.image, 'uses intro'));
for (const section of usesSections) {
  [...(section.figures ?? []), ...(section.buildLog ?? [])].forEach((f) => refImage(f.image, `uses/${section.id}`));
  if (section.video) {
    refImage(section.video.fallback, `uses/${section.id}`);
    if (!(section.video.name in generatedVideos)) errors.push(`uses/${section.id}: unknown video "${section.video.name}"`);
  }
  for (const item of section.items) {
    const href = item.link?.href;
    const log = href?.match(/^\/log\/([^/]+)\/$/);
    if (log && !allPosts.has(log[1])) errors.push(`uses/${section.id}: link to unknown post "${log[1]}"`);
  }
}

// Manifest files ---------------------------------------------------------
for (const image of Object.values(generatedImages)) {
  for (const source of [...image.sources.avif, ...image.sources.webp]) {
    if (!existsSync(path.join('public', source.src))) errors.push(`manifest ${image.name}: missing ${source.src}`);
  }
  if (!used.has(image.name)) warnings.push(`media "${image.name}" is published but unused`);
}
for (const video of Object.values(generatedVideos)) {
  for (const src of [video.src, video.poster]) if (!existsSync(path.join('public', src))) errors.push(`missing ${src}`);
}

if (!(activity.total > 0) || activity.weeks.length < 52) errors.push('activity snapshot looks empty');

// Report -----------------------------------------------------------------
if (warnings.length) console.warn(`${warnings.length} warning(s):\n  ${warnings.join('\n  ')}`);
if (errors.length) {
  console.error(`check:content failed with ${errors.length} error(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(
  `check:content ok — ${published.en.size} EN + ${published.fr.size} FR posts, ${used.size} media refs resolved, ` +
    `${Object.keys(generatedImages).length} images in manifest, activity total ${activity.total}`,
);
