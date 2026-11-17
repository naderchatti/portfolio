import snapshot from './activity.generated.json';
import { languages } from './site';

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;
export type ContributionDay = { date: string; count: number; level: ContributionLevel };
export type ActivitySnapshot = {
  user: string;
  generatedAt: string;
  total: number;
  weeks: { days: ContributionDay[] }[];
};

function isLevel(value: number): value is ContributionLevel {
  return value === 0 || value === 1 || value === 2 || value === 3 || value === 4;
}

/** Committed snapshot from `pnpm data:activity`; the build never hits the network. */
export const activity: ActivitySnapshot = {
  ...snapshot,
  weeks: snapshot.weeks.map((week) => ({
    days: week.days.map((day) => ({ ...day, level: isLevel(day.level) ? day.level : 0 })),
  })),
};

export { languages };
