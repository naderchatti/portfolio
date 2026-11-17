# naderchatti.com

Personal site of Nader Chatti — bilingual (EN/FR), statically exported and hosted on Cloudflare Pages.

## Stack

- Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript (strict)
- Tailwind CSS v4 (CSS-first tokens in `app/globals.css`), shadcn/ui (new-york, zinc), lucide-react
- Geist / Geist Mono via the `geist` package, `next-themes` (light/dark/system, black-first)
- i18n: the URL is the source of truth (`/en/…`, `/fr/…`); UI strings live in `messages/*.json`

## Scripts

| Command          | What it does                                                   |
| ---------------- | -------------------------------------------------------------- |
| `pnpm dev`       | Next dev server (`/` shows a static language fallback)         |
| `pnpm build`     | Static export to `out/`                                        |
| `pnpm start`     | Serve `out/` locally with `serve`                              |
| `pnpm preview`   | Serve `out/` with `wrangler pages dev` (runs `functions/` too) |
| `pnpm lint`      | ESLint 9 flat config (`eslint.config.mjs`)                     |
| `pnpm typecheck` | Route type generation + `tsc` for the app and Pages Functions  |
| `pnpm media`     | Rebuild `public/media` (AVIF/WebP) + `content/media.generated.ts` from `MEDIA_SRC` |
| `pnpm data:activity` | Refresh `content/activity.generated.json` from GitHub (`GITHUB_TOKEN` or `gh`) |
| `pnpm check:content` | Post counts, translations, `media:`/`diagram:` refs, MDX compile, manifest files |

Icons (`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/icon-*.png`) are generated from
`lib/cat-paths.ts` with `node scripts/generate-icons.mjs` (requires ImageMagick).

## Content

- `content/*.ts` — typed bilingual data (`{ en, fr }` strings, read with `t(value, lang)`).
- `content/log/<slug>/{en,fr}.mdx` — posts, compiled at build time by `lib/posts.ts` (`@mdx-js/mdx`, GFM,
  rehype-pretty-code). `![alt](media:name)` renders a `<Figure>`, `![alt](diagram:slug)` a `<WiringDiagram>`.
- Media and the GitHub activity snapshot are generated locally and committed; the build never hits the network.

## Deploy (Cloudflare Pages)

- Build command: `pnpm install && pnpm build`
- Output directory: `out`
- Environment variable: `NODE_VERSION=22`
- `functions/index.ts` handles `/` only: 302 to `/fr/` when `Accept-Language` starts with `fr`, otherwise `/en/`
  (`Vary: Accept-Language`). Every other path is a static file; `public/_headers` sets security headers and
  immutable caching for `/_next/static/*`.

## Live GitHub activity

- `functions/api/activity.ts` serves `/api/activity`: the public contribution calendar of `naderchatti` from the
  GitHub GraphQL API, in the same shape as `content/activity.generated.json`.
- Secret: `GITHUB_TOKEN` (fine-grained, public read-only, no permissions) in Pages Production and Preview.
  Missing token → 503; GitHub error or 5 s timeout → 502 `{ error }` with `no-store`.
- Cached at the edge with the Workers Cache API:
  `Cache-Control: public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400`.
- The home heatmap renders the committed snapshot, then swaps in the live data after mount when it validates
  (skipped in `pnpm dev`); any failure silently keeps the snapshot.
- Local test: `pnpm build`, then either put `GITHUB_TOKEN=…` in `.dev.vars` (git-ignored) and run `pnpm preview`,
  or `npx wrangler pages dev out --binding GITHUB_TOKEN=$(gh auth token)`; open `/api/activity`.
