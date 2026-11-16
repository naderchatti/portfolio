import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { CornerTicks } from '@/components/home/primitives';
import { profile } from '@/content/site';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
import type { Locale, Messages } from '@/lib/i18n';

type HeroProps = { lang: Locale; messages: Messages };

export function Hero({ lang, messages }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[20px_20px]"
    >
      <div className="mx-auto max-w-[1120px] px-4 pt-16 pb-14 text-center sm:px-8 sm:pt-[88px] sm:pb-[72px] sm:text-left">
        <p className="mb-7 font-mono text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">~</span> / {t(uiHome.heroPath, lang)}
        </p>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
          <div className="relative flex size-32 shrink-0 items-center justify-center rounded-card border bg-background">
            <CornerTicks />
            <Logo className="size-[100px]" tracking label={messages.a11y.catLabel} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 id="hero-title" className="text-[44px] leading-none font-semibold tracking-[-0.045em] sm:text-[64px]">
              {profile.name}
            </h1>
            <p className="mx-auto mt-3 max-w-[640px] text-xl tracking-[-0.01em] text-pretty sm:mx-0">
              {t(profile.role, lang)}
            </p>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-[640px] text-base text-pretty text-muted-foreground sm:mx-0">
          {t(profile.intro, lang)}
        </p>
        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild className="h-11 w-full sm:h-9 sm:w-auto">
            <Link href={`/${lang}/#built`}>{messages.home.viewWork}</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 w-full shadow-none sm:h-9 sm:w-auto dark:border-border dark:bg-background dark:hover:bg-secondary">
            <Link href={`/${lang}/log/`}>{messages.home.readLog}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
