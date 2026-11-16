#!/usr/bin/env node
// Builds responsive AVIF/WebP variants + blur placeholders from the cleaned media folder
// and writes the typed manifest `content/media.generated.ts`.
//
//   MEDIA_SRC=/path/to/cleaned pnpm media          (default: ~/Downloads/portfolio-media/_build/cleaned)
//   MEDIA_FORCE=1 pnpm media                       (re-encode even when outputs are up to date)
//
// Sources must already be cleaned (EXIF/GPS stripped, faces/plates blurred). sharp drops metadata
// on output by default, which strips it a second time.
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = process.env.MEDIA_SRC ?? path.join(os.homedir(), 'Downloads/portfolio-media/_build/cleaned');
const outDir = path.join(root, 'public/media');
const manifestPath = path.join(root, 'content/media.generated.ts');
const force = process.env.MEDIA_FORCE === '1';

/** 1920 only when the source is at least that wide; smaller sources top out at their own width. */
const WIDTHS = [640, 1280, 1920];
const AVIF = { quality: 50, effort: 6 };
const WEBP = { quality: 74, effort: 5 };

/**
 * Contact sheets, previews and verification crops are working files; the video poster is copied
 * with its video. driver-stop shows a street address, so it stays unpublished. The old Fourma screens and
 * eGouvernement phone strip were replaced by the App Store renders and the multi-device composite.
 */
const SKIP = [
  /^sheet\.jpg$/,
  /^prev-/,
  /^check/,
  /-poster\.jpg$/,
  /^driver-stop\.jpg$/,
  /^fourma-(home|editor|live-light)\.jpg$/,
  /^egov-\d\.jpg$/,
];

/** Source basename → published name, where post/content refs use a different name. */
const RENAME = {
  'products/ugckit-1': 'ugckit-landing',
  'products/ugckit-2': 'ugckit-landing-light',
  'products/chtprk-1': 'chtprk-landing',
  'products/chtprk-2': 'chtprk-landing-light',
  'effiloche/customer-mobile': 'customer-mobile-menu',
  'effiloche/customer-web': 'customer-web-menu',
  'effiloche/driver-summary': 'driver-tour-summary',
  'effiloche/kitchen-alert': 'kitchen-new-order-alert',
};

const VIDEOS = [
  { name: 'pc-rgb-loop', file: 'uses/pc-rgb-loop.mp4', poster: 'uses/pc-rgb-loop-poster.jpg' },
  { name: 'ugckit-demo', file: 'ugckit/ugckit-demo.mp4', poster: 'ugckit/ugckit-demo-poster.jpg' },
  { name: 'ugckit-sample', file: 'ugckit/ugckit-sample.mp4', poster: 'ugckit/ugckit-sample-poster.jpg' },
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function isFresh(output, sourceMtime) {
  if (force || !existsSync(output)) return false;
  return (await stat(output)).mtimeMs >= sourceMtime;
}

async function processImage(file, name) {
  const { mtimeMs } = await stat(file);
  const image = sharp(file).rotate();
  const meta = await image.metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const height = meta.autoOrient?.height ?? meta.height;
  // Standard widths below the source, topped by the source width itself (capped at the largest).
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, WIDTHS[WIDTHS.length - 1]));

  const sources = { avif: [], webp: [] };
  for (const w of widths) {
    for (const format of ['avif', 'webp']) {
      const filename = `${name}-${w}.${format}`;
      const output = path.join(outDir, filename);
      if (!(await isFresh(output, mtimeMs))) {
        const pipeline = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
        await (format === 'avif' ? pipeline.avif(AVIF) : pipeline.webp(WEBP)).toFile(output);
      }
      sources[format].push({ src: `/media/${filename}`, width: w });
    }
  }

  const blur = await sharp(file).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return {
    name,
    width,
    height,
    placeholder: `data:image/webp;base64,${blur.toString('base64')}`,
    sources,
  };
}

async function main() {
  if (!existsSync(src)) {
    console.error(`media: source folder not found: ${src} (set MEDIA_SRC)`);
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });

  const files = (await walk(src))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .filter((f) => !SKIP.some((re) => re.test(path.basename(f))));

  const seen = new Map();
  const images = [];
  for (const file of files) {
    const rel = path.relative(src, file).replace(/\.(jpe?g|png)$/i, '');
    const name = RENAME[rel] ?? path.basename(rel);
    if (seen.has(name)) throw new Error(`media: duplicate name "${name}" (${seen.get(name)} and ${rel})`);
    seen.set(name, rel);
    images.push(await processImage(file, name));
    process.stdout.write('.');
  }
  process.stdout.write('\n');
  images.sort((a, b) => a.name.localeCompare(b.name));

  const videos = [];
  for (const video of VIDEOS) {
    const file = path.join(src, video.file);
    if (!existsSync(file)) continue;
    const out = `${video.name}.mp4`;
    await copyFile(file, path.join(outDir, out));
    const posterFile = `${video.name}-poster.jpg`;
    const posterPath = path.join(src, video.poster);
    const poster = sharp(posterPath);
    const { width, height } = await poster.metadata();
    await poster.jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(outDir, posterFile));
    videos.push({ name: video.name, src: `/media/${out}`, poster: `/media/${posterFile}`, width, height });
  }

  // Drop variants that no longer belong to any manifest entry.
  const expected = new Set([
    ...images.flatMap((i) => [...i.sources.avif, ...i.sources.webp].map((s) => path.basename(s.src))),
    ...videos.flatMap((v) => [path.basename(v.src), path.basename(v.poster)]),
  ]);
  for (const file of await readdir(outDir)) {
    if (!expected.has(file)) await rm(path.join(outDir, file));
  }

  const body = `// Generated by scripts/media.mjs — do not edit. Run \`pnpm media\` to regenerate.
import type { GeneratedImage, GeneratedVideo } from './media.types';

export const generatedImages = ${JSON.stringify(Object.fromEntries(images.map((i) => [i.name, i])), null, 2)} as const satisfies Record<string, GeneratedImage>;

export const generatedVideos = ${JSON.stringify(Object.fromEntries(videos.map((v) => [v.name, v])), null, 2)} as const satisfies Record<string, GeneratedVideo>;
`;
  await writeFile(manifestPath, body);

  let total = 0;
  for (const file of await readdir(outDir)) total += (await stat(path.join(outDir, file))).size;
  console.log(
    `media: ${images.length} images, ${videos.length} video(s), ${expected.size} files, ${(total / 1024 / 1024).toFixed(1)} MB in public/media`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
