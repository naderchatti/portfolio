// Regenerates the favicon set from the cat geometry in lib/cat-paths.ts.
// Usage: node scripts/generate-icons.mjs   (requires ImageMagick `magick` with rsvg/inkscape SVG support)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as cat from '../lib/cat-paths.ts';

const FACE = '#09090B';
const FUR_LIGHT = '#FFFFFF';
const FUR_DARK = '#FAFAFA';
const RING = '#3F3F46';

const furPaths = (withMouth) =>
  [cat.LEFT_PATCH, withMouth ? cat.MOUTH : null, cat.RIGHT_PATCH, cat.LEFT_EAR, cat.RIGHT_EAR].filter(Boolean);
const eyePaths = [cat.LEFT_EYE, cat.RIGHT_EYE];

/** Adaptive favicon: plain black circle on light tabs, black circle + zinc ring on dark tabs (option B). */
function adaptiveSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 30 400 400">
<style>
.c{fill:${FACE}}.f{fill:${FUR_LIGHT}}.e{fill:${FACE}}
@media (prefers-color-scheme: dark){.c{stroke:${RING};stroke-width:1px;vector-effect:non-scaling-stroke}.f{fill:${FUR_DARK}}}
</style>
<circle class="c" cx="250" cy="230" r="186"/>
${furPaths(false).map((d) => `<path class="f" d="${d}"/>`).join('\n')}
${eyePaths.map((d) => `<path class="e" d="${d}"/>`).join('\n')}
</svg>
`;
}

/** Static raster source. `ringWidth` is in viewBox units (400 units = output size). */
function staticSvg({ withMouth, ringWidth, background }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 30 400 400" width="1024" height="1024">
${background ? `<rect x="50" y="30" width="400" height="400" fill="${background}"/>` : ''}
<circle cx="250" cy="230" r="${200 - ringWidth}" fill="${FACE}" stroke="${RING}" stroke-width="${ringWidth}"/>
${furPaths(withMouth).map((d) => `<path fill="${FUR_DARK}" d="${d}"/>`).join('\n')}
${eyePaths.map((d) => `<path fill="${FACE}" d="${d}"/>`).join('\n')}
</svg>
`;
}

const root = new URL('..', import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), 'icons-'));
const src = (name, svg) => {
  const file = join(tmp, `${name}.svg`);
  writeFileSync(file, svg);
  return file;
};
const render = (svgFile, size, out) =>
  execFileSync('magick', ['-background', 'none', '-density', '384', svgFile, '-resize', `${size}x${size}`, out]);

try {
  writeFileSync(join(root, 'app/icon.svg'), adaptiveSvg());

  // ICO layers: ring stays ~1px at each size; 16px drops the mouth.
  const ico = [16, 32, 48].map((size) => {
    const file = join(tmp, `ico-${size}.png`);
    render(src(`ico-${size}`, staticSvg({ withMouth: size > 16, ringWidth: 400 / size, background: null })), size, file);
    return file;
  });
  execFileSync('magick', [...ico, join(root, 'app/favicon.ico')]);

  // Touch / PWA icons: full-bleed black tile (the OS applies its own mask).
  const tile = src('tile', staticSvg({ withMouth: true, ringWidth: 2, background: FACE }));
  render(tile, 180, join(root, 'app/apple-icon.png'));
  render(tile, 192, join(root, 'public/icon-192.png'));
  render(tile, 512, join(root, 'public/icon-512.png'));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
console.log('Icons written: app/icon.svg, app/favicon.ico, app/apple-icon.png, public/icon-{192,512}.png');
