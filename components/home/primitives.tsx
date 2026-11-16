import type { ReactNode } from 'react';
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

export function Chips({ items, label, className }: { items: readonly string[]; label?: string; className?: string }) {
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
    </ul>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mb-3 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-6 gap-y-1 text-[13.5px]">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 size-1 flex-none rounded-[1px] bg-muted-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** `› engineering detail` line. */
export function Detail({ text, label }: { text: string; label: string }) {
  return (
    <p className="mt-3 mb-1.5 font-mono text-xs text-muted-foreground">
      <span aria-hidden="true">› </span>
      <span className="sr-only">{label}: </span>
      {text}
    </p>
  );
}

export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
