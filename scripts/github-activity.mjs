#!/usr/bin/env node
// Snapshot of the last year of GitHub contributions → content/activity.generated.json.
//
//   pnpm data:activity
//   GITHUB_USER=someone pnpm data:activity
//
// Reads the public profile calendar (https://github.com/users/<user>/contributions, no token), which counts
// private contributions anonymously like the profile graph. Parsing is shared with functions/api/activity.ts.
// The build never calls this: it reads the committed snapshot. On failure (no network, unexpected page)
// the existing snapshot is kept and the script exits 0 so CI keeps working.
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contributionsUrl, parseContributions } from '../lib/activity/parse-contributions.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'content/activity.generated.json');
const user = process.env.GITHUB_USER ?? 'naderchatti';

function keep(reason) {
  console.warn(`data:activity: ${reason}; keeping ${existsSync(out) ? 'the committed snapshot' : 'no snapshot'}`);
  process.exit(0);
}

async function main() {
  let response;
  try {
    response = await fetch(contributionsUrl(user), {
      headers: { Accept: 'text/html', 'User-Agent': 'naderchatti-portfolio' },
    });
  } catch (error) {
    keep(`request failed (${error instanceof Error ? error.message : 'network error'})`);
  }
  if (!response.ok) keep(`GitHub answered ${response.status}`);

  const calendar = parseContributions(await response.text());
  if (!calendar) keep('unexpected contributions page');

  const snapshot = { user, generatedAt: new Date().toISOString(), total: calendar.total, weeks: calendar.weeks };
  // One week per line keeps the committed snapshot diffable.
  const weeks = snapshot.weeks.map((week) => `    ${JSON.stringify(week)}`).join(',\n');
  const head = { user: snapshot.user, generatedAt: snapshot.generatedAt, total: snapshot.total };
  const headJson = JSON.stringify(head, null, 2).replace(/\n}$/, '');
  await writeFile(out, `${headJson},\n  "weeks": [\n${weeks}\n  ]\n}\n`);
  const sum = snapshot.weeks.reduce((acc, week) => acc + week.days.reduce((s, day) => s + day.count, 0), 0);
  console.log(
    `data:activity: ${snapshot.total} contributions (days sum ${sum}) over ${snapshot.weeks.length} weeks → ${path.relative(root, out)}`
  );
}

main().catch((error) => keep(error instanceof Error ? error.message : String(error)));
