import type { ReactNode } from 'react';
import type { Credit } from '@/content/projects';
import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Corner registration marks around a framed box (decorative). */
export function CornerTicks() {
  const base = 'pointer-events-none absolute size-[9px] border-muted-foreground';
  return (
    <>
      <span aria-hidden="true" className={`${base} -top-[5px] -left-[5px] border-t border-l`} />
      <span aria-hidden="true" className={`${base} -top-[5px] -right-[5px] border-t border-r`} />
      <span aria-hidden="true" className={`${base} -bottom-[5px] -left-[5px] border-b border-l`} />
      <span aria-hidden="true" className={`${base} -right-[5px] -bottom-[5px] border-r border-b`} />
    </>
  );
}

/** `~/built · 01` mono breadcrumb. */
export function PathLabel({ path, index, className }: { path: string; index?: string; className?: string }) {
  return (
    <p className={cn('font-mono text-[13px] text-muted-foreground', className)}>
      <span className="font-medium text-foreground">~</span>/{path}
      {index ? <span> · {index}</span> : null}
    </p>
  );
}

type SectionProps = {
  id: string;
  index: string;
  title: string;
  /** Mono tag on the right of the header (e.g. “personal”). */
  tag?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, title, tag, lead, children, className }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn('scroll-mt-16 border-b py-14 sm:py-20', className)}
    >
      <div className="mb-7 flex flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
        <div>
          <PathLabel path={id} index={index} />
          <h2 id={titleId} className="mt-1.5 text-3xl font-semibold tracking-[-0.03em] text-balance">
            {title}
          </h2>
          {lead ? <p className="mt-1.5 text-[15px] text-muted-foreground">{lead}</p> : null}
        </div>
        {tag ? <span className="font-mono text-xs text-muted-foreground">{tag}</span> : null}
      </div>
      {children}
    </section>
  );
}

type ChipsProps = {
  items: readonly string[];
  /** Muted, dashed extra tag after the stack (e.g. a later rebuild). */
  note?: string;
  label?: string;
  className?: string;
};

export function Chips({ items, note, label, className }: ChipsProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border px-[7px] py-px font-mono text-[11.5px] whitespace-nowrap text-foreground"
        >
          {item}
        </li>
      ))}
      {note ? (
        <li className="rounded-md border border-dashed px-[7px] py-px font-mono text-[11.5px] text-muted-foreground">
          {note}
        </li>
      ) : null}
    </ul>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mb-3 flex max-w-[720px] flex-col gap-1 text-[13.5px]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 size-1 flex-none rounded-[1px] bg-muted-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** “Built with …” attribution line with an external link on the person's name. */
export function CreditLine({ credit, lang, newTab }: { credit: Credit; lang: Locale; newTab: string }) {
  return (
    <p className="mt-3 mb-1.5 text-[13px] text-muted-foreground">
      {t(credit.before, lang)}
      <a
        href={credit.href}
        target="_blank"
        rel="noopener"
        className="font-medium text-foreground underline underline-offset-[3px] hover:text-muted-foreground"
      >
        {credit.name}
        <span className="sr-only"> {newTab}</span>
      </a>
      {credit.after ? t(credit.after, lang) : null}
    </p>
  );
}

export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
