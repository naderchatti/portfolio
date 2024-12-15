'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from './language-provider';
import { getDictionary } from '@/lib/getDictionary';

const themes = ['light', 'dark', 'system'] as const;

const getThemeIcon = (
  theme: (typeof themes)[number],
  resolvedTheme: string | undefined
) => {
  switch (theme) {
    case 'light':
      return <Sun className="h-5 w-5" />;
    case 'dark':
      return <Moon className="h-5 w-5" />;
    case 'system':
      return resolvedTheme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      );
  }
};

export function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [dict, setDict] = React.useState<any>(null);
  const { locale } = useLanguage();

  React.useEffect(() => {
    setMounted(true);
    getDictionary(locale).then(setDict);
  }, [locale]);

  if (!mounted || !dict) {
    return (
      <button className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
        <div className="h-5 w-5 animate-pulse bg-muted rounded" />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
          {getThemeIcon(theme as (typeof themes)[number], resolvedTheme)}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {themes.slice(0, 2).map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            className={`${
              theme === themeOption ? 'bg-accent' : ''
            } cursor-pointer flex items-center gap-2`}
            onClick={() => {
              if (theme !== themeOption) {
                setTheme(themeOption);
              }
            }}
          >
            {getThemeIcon(themeOption, resolvedTheme)}
            <span>{dict.theme[themeOption]}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`${
            theme === 'system' ? 'bg-accent' : ''
          } cursor-pointer flex items-center gap-2`}
          onClick={() => {
            if (theme !== 'system') {
              setTheme('system');
            }
          }}
        >
          <Monitor className="h-5 w-5" />
          <span>{dict.theme.system}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
