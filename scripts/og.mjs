#!/usr/bin/env -S pnpm exec tsx
// Open Graph images (1200×630 PNG) in the Brand.dc.html style: black, cat mark, title, category, URL.
// Usage: pnpm og   → public/og/<lang>/<page|post-slug>.png (committed; the build never renders images).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import * as cat from '../lib/cat-paths.ts';
import { getAllPosts } from '../lib/posts.ts';
import en from '../messages/en.json' with { type: 'json' };
import fr from '../messages/fr.json' with { type: 'json' };

const WIDTH = 1200;
const HEIGHT = 630;
const OUT = path.join(process.cwd(), 'public/og');
const messages = { en, fr };
const categories = { homelab: 'Homelab', saas: 'SaaS' };

const color = { bg: '#000000', fg: '#FAFAFA', muted: '#A1A1AA', border: '#27272A', face: '#111111' };

// The `geist` package ships the TTFs but does not export them; read them from its folder.
const fontDir = path.join(process.cwd(), 'node_modules/geist/dist/fonts');
const font = (file) => readFile(path.join(fontDir, file));
const fonts = [
  { name: 'Geist', data: await font('geist-sans/Geist-Regular.ttf'), weight: 400, style: 'normal' },
  { name: 'Geist', data: await font('geist-sans/Geist-Medium.ttf'), weight: 500, style: 'normal' },
  { name: 'Geist', data: await font('geist-sans/Geist-SemiBold.ttf'), weight: 600, style: 'normal' },
  { name: 'Geist Mono', data: await font('geist-mono/GeistMono-Regular.ttf'), weight: 400, style: 'normal' },
];

/** Minimal element factory for satori (no JSX in .mjs). */
function h(type, style, ...children) {
  const kids = children.flat().filter((child) => child !== null && child !== undefined && child !== false);
  return { type, props: { style, children: kids.length === 1 ? kids[0] : kids } };
}

function catMark(size) {
  const fur = [cat.LEFT_PATCH, cat.MOUTH, cat.RIGHT_PATCH, cat.LEFT_EAR, cat.RIGHT_EAR];
  const eyes = [cat.LEFT_EYE, cat.RIGHT_EYE];
  return {
    type: 'svg',
    props: {
      width: size,
      height: size,
      viewBox: '50 30 400 400',
      children: [
        { type: 'circle', props: { cx: 250, cy: 230, r: 186, fill: color.face, stroke: color.border, strokeWidth: 4 } },
        ...fur.map((d) => ({ type: 'path', props: { d, fill: color.fg } })),
        ...eyes.map((d) => ({ type: 'path', props: { d, fill: color.face } })),
      ],
    },
  };
}

const frame = (...children) =>
  h(
    'div',
    {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      background: color.bg,
      color: color.fg,
      fontFamily: 'Geist',
    },
    ...children,
  );

const mono = (text, size = 28) =>
  h('div', { fontFamily: 'Geist Mono', fontSize: size, color: color.muted, display: 'flex' }, text);

/** Default card (home): big cat top-left, URL top-right, name + role at the bottom. */
function homeCard(lang) {
  const m = messages[lang];
  return frame(
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }, catMark(180), mono('naderchatti.com')),
    h(
      'div',
      { display: 'flex', flexDirection: 'column' },
      h('div', { fontSize: 88, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }, 'Nader Chatti'),
      h('div', { marginTop: 22, fontSize: 32, lineHeight: 1.35, color: color.muted, maxWidth: 960 }, m.home.role),
    ),
  );
}

/** Post / section card: `~/log · Homelab`, title, then cat + name + URL. */
function entryCard({ kicker, title, url }) {
  const size = title.length > 70 ? 62 : title.length > 45 ? 72 : 82;
  return frame(
    mono(kicker),
    h(
      'div',
      { display: 'flex', fontSize: size, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.05, maxWidth: 1000 },
      title,
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 22, fontSize: 30, fontWeight: 500 },
      catMark(96),
      h('div', { display: 'flex' }, 'Nader Chatti'),
      h('div', { display: 'flex', flex: 1 }),
      mono(url),
    ),
  );
}

async function render(tree, file) {
  const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, png);
}

await rm(OUT, { recursive: true, force: true });
let count = 0;
for (const lang of ['en', 'fr']) {
  const m = messages[lang];
  const dir = path.join(OUT, lang);
  const pages = {
    home: homeCard(lang),
    lab: entryCard({ kicker: '~/lab', title: m.sections.lab.title, url: 'naderchatti.com/lab' }),
    uses: entryCard({ kicker: '~/uses', title: m.sections.uses.title, url: 'naderchatti.com/uses' }),
    log: entryCard({ kicker: '~/log', title: m.log.title, url: 'naderchatti.com/log' }),
  };
  for (const [name, tree] of Object.entries(pages)) {
    await render(tree, path.join(dir, `${name}.png`));
    count++;
  }
  for (const post of await getAllPosts(lang, { includeDrafts: false })) {
    const kicker = `~/log · ${categories[post.category]}`;
    await render(entryCard({ kicker, title: post.title, url: 'naderchatti.com/log' }), path.join(dir, `${post.slug}.png`));
    count++;
  }
}
console.log(`og: wrote ${count} images to ${path.relative(process.cwd(), OUT)}/`);
