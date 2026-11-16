#!/usr/bin/env -S pnpm exec tsx
// Builds the site search index (the same one `app/[lang]/search-index.json/route.ts` emits during `next build`)
// and checks it: every post `##` anchor must be indexed with the id the post page renders. Prints per-language stats.
// Usage: `pnpm search:index` (add `--write <dir>` to dump `<dir>/<lang>.json` for inspection).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildSearchIndex } from '../lib/search/build-index';
import { getAllPosts, getPost } from '../lib/posts';

const writeAt = process.argv.indexOf('--write');
const outDir = writeAt !== -1 ? process.argv[writeAt + 1] : undefined;
const errors = [];

for (const lang of ['en', 'fr']) {
  const index = await buildSearchIndex(lang);
  const json = JSON.stringify(index);
  const counts = {};
  for (const doc of index.docs) counts[doc.kind] = (counts[doc.kind] ?? 0) + 1;

  for (const meta of await getAllPosts(lang)) {
    const post = await getPost(meta.slug, lang);
    for (const entry of post?.toc ?? []) {
      const id = `section:${meta.slug}#${entry.id}`;
      if (!index.docs.some((doc) => doc.id === id)) errors.push(`${lang}/${meta.slug}: missing section "${entry.id}"`);
    }
  }

  console.log(`${lang}: ${index.docs.length} docs, ${(Buffer.byteLength(json) / 1024).toFixed(1)} KB`, counts);
  if (outDir) {
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, `${lang}.json`), JSON.stringify(index, null, 2));
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
