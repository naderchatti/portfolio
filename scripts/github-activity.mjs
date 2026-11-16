#!/usr/bin/env node
// Snapshot of the last year of GitHub contributions → content/activity.generated.json.
//
//   pnpm data:activity                      (uses GITHUB_TOKEN, else `gh auth token`)
//   GITHUB_USER=someone pnpm data:activity
//
// The build never calls this: it reads the committed snapshot. On failure (no token, no network)
// the existing snapshot is kept and the script exits 0 so CI keeps working.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'content/activity.generated.json');
const user = process.env.GITHUB_USER ?? 'naderchatti';

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function keep(reason) {
  console.warn(`data:activity: ${reason}; keeping ${existsSync(out) ? 'the committed snapshot' : 'no snapshot'}`);
  process.exit(0);
}

async function main() {
  const auth = token();
  if (!auth) keep('no GITHUB_TOKEN and no `gh auth token`');

  let response;
  try {
    response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `bearer ${auth}`, 'Content-Type': 'application/json', 'User-Agent': 'portfolio-activity' },
      body: JSON.stringify({ query, variables: { login: user } }),
    });
  } catch (error) {
    keep(`request failed (${error instanceof Error ? error.message : 'network error'})`);
  }
  if (!response.ok) keep(`GitHub answered ${response.status}`);

  const json = await response.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) keep(`unexpected response${json?.errors ? `: ${json.errors.map((e) => e.message).join('; ')}` : ''}`);

  const snapshot = {
    user,
    generatedAt: new Date().toISOString(),
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVELS[day.contributionLevel] ?? 0,
      })),
    })),
  };
  // One week per line keeps the committed snapshot diffable.
  const weeks = snapshot.weeks.map((week) => `    ${JSON.stringify(week)}`).join(',\n');
  const head = { user: snapshot.user, generatedAt: snapshot.generatedAt, total: snapshot.total };
  const headJson = JSON.stringify(head, null, 2).replace(/\n}$/, '');
  await writeFile(out, `${headJson},\n  "weeks": [\n${weeks}\n  ]\n}\n`);
  console.log(`data:activity: ${snapshot.total} contributions over ${snapshot.weeks.length} weeks → ${path.relative(root, out)}`);
}

main().catch((error) => keep(error instanceof Error ? error.message : String(error)));
