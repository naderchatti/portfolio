import Link from 'next/link';
import type { UsesItem } from '@/content/uses';
import { t } from '@/content/types';
import { uiUses } from '@/content/ui-uses';
import type { Locale } from '@/lib/i18n';

const linkClass =
  'inline-flex min-h-11 items-center font-mono text-xs whitespace-nowrap underline underline-offset-[3px] hover:text-muted-foreground sm:min-h-0';

/** Label / value spec sheet. Rows stack on phones, so nothing scrolls sideways. */
export function SpecList({ items, lang }: { items: readonly UsesItem[]; lang: Locale }) {
  return (
    <dl className="overflow-hidden rounded-card border bg-card">
      {items.map((item) => {
        const value = t(item.value, lang);
        const link = item.link;
        return (
          <div
            key={item.label.en}
            className="grid grid-cols-1 gap-0.5 border-b px-4 py-[11px] last:border-b-0 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4 lg:grid-cols-[150px_minmax(0,1fr)]"
          >
            <dt className="pt-px font-mono text-xs text-muted-foreground">{t(item.label, lang)}</dt>
            <dd className="text-sm">
              {value}
              {link ? (
                <>
                  {value ? ' ' : null}
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {t(link.label, lang)}
                      <span className="sr-only"> {t(uiUses.newTab, lang)}</span>
                    </a>
                  ) : (
                    <Link href={`/${lang}${link.href}`} className={`${linkClass} sm:ml-1`}>
                      {t(link.label, lang)}
                    </Link>
                  )}
                </>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
