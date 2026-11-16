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

Icons (`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/icon-*.png`) are generated from
`lib/cat-paths.ts` with `node scripts/generate-icons.mjs` (requires ImageMagick).

## Deploy (Cloudflare Pages)

- Build command: `pnpm install && pnpm build`
- Output directory: `out`
- Environment variable: `NODE_VERSION=22`
- `functions/index.ts` handles `/` only: 302 to `/fr/` when `Accept-Language` starts with `fr`, otherwise `/en/`
  (`Vary: Accept-Language`). Every other path is a static file; `public/_headers` sets security headers and
  immutable caching for `/_next/static/*`.
