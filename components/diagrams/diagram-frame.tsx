import type { ReactNode } from 'react';
import { getLogStrings } from '@/content/ui-log';
import { t, type Text } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import styles from './diagrams.module.css';

export type Connection = { from: Text; to: Text; signal: Text; accent?: boolean };

/** Keyboard-scrollable box for content wider than the column (SVGs, tables). */
export function ScrollBox({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    // A focusable region so keyboard users can scroll it; the label names what is inside.
    <div role="region" aria-label={label} tabIndex={0} className={cn(styles.scroll, className)}>
      {children}
    </div>
  );
}

export function ConnectionTable({ lang, rows, caption }: { lang: Locale; rows: Connection[]; caption: string }) {
  const ui = getLogStrings(lang).diagram;
  return (
    <ScrollBox label={caption}>
      <table className={styles.table}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{ui.from}</th>
            <th scope="col">{ui.to}</th>
            <th scope="col">{ui.signal}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={row.accent ? styles.accent : undefined}>
              <td>{t(row.from, lang)}</td>
              <td>{t(row.to, lang)}</td>
              <td>{t(row.signal, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollBox>
  );
}

type DiagramFrameProps = {
  lang: Locale;
  slug: string;
  title: string;
  subtitle: string;
  /** The SVG drawing. */
  drawing: ReactNode;
  connections: Connection[];
  note?: { title: string; body: string };
  /** Extra steps rendered after the connection table (e.g. the speakers' jumper setup). */
  children?: ReactNode;
};

export function DiagramFrame({ lang, slug, title, subtitle, drawing, connections, note, children }: DiagramFrameProps) {
  const ui = getLogStrings(lang).diagram;
  const titleId = `diagram-${slug}-title`;

  return (
    <figure data-diagram={slug} aria-labelledby={titleId} className={cn(styles.root, 'my-10 flex flex-col gap-4')}>
      <figcaption className="flex flex-col gap-1">
        <span className="font-mono text-xs text-muted-foreground">{ui.label}</span>
        <span id={titleId} className="text-lg font-semibold tracking-[-0.02em]">
          {title}
        </span>
        <span className="font-mono text-xs leading-5 text-muted-foreground">{subtitle}</span>
      </figcaption>

      <div className={styles.legend} aria-hidden="true">
        <span>
          <i />
          {ui.legendSignal}
        </span>
        <span>
          <i className={styles.legendGround} />
          {ui.legendGround}
        </span>
        <span>
          <i className={styles.legendAccent} />
          {ui.legendAccent}
        </span>
      </div>

      <span className="-mb-2 block font-mono text-[11px] text-muted-foreground min-[760px]:hidden">{ui.scrollHint}</span>
      <ScrollBox label={`${ui.label}: ${title}`}>{drawing}</ScrollBox>

      <ConnectionTable lang={lang} rows={connections} caption={`${ui.connections}: ${title}`} />

      {note ? (
        <p className={styles.note}>
          <b>{note.title}</b>
          <br />
          {note.body}
        </p>
      ) : null}

      {children}
    </figure>
  );
}

export { styles as diagramStyles };
