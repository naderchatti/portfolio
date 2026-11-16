import { CornerTicks } from '@/components/ui/corner-ticks';
import { FramedImage } from '@/components/ui/framed-image';
import { haStats, nodes, nodesFootnote } from '@/content/lab';
import { t } from '@/content/types';
import { uiLab } from '@/content/ui-lab';
import type { Locale } from '@/lib/i18n';

/** The four machines, the rack footnote and the Home Assistant stats strip, in one framed panel. */
export function NodePanel({ lang }: { lang: Locale }) {
  return (
    <div className="relative rounded-card border bg-card">
      <CornerTicks />
      <ul className="grid grid-cols-1 border-b sm:grid-cols-2 lg:grid-cols-4">
        {nodes.map((node) => (
          <li
            key={node.id}
            className={[
              'border-b p-5 last:border-b-0',
              // 2 columns: right border on the left column, no bottom border on the last row.
              'sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0',
              'lg:border-b-0 lg:border-r lg:last:border-r-0',
            ].join(' ')}
          >
            <div className="mb-2.5 flex justify-between font-mono text-[11px] text-muted-foreground">
              <span>{node.id}</span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full ${node.status === 'up' ? 'bg-foreground' : 'border border-foreground'}`}
                />
                {t(node.status === 'up' ? uiLab.statusUp : uiLab.statusDown, lang)}
              </span>
            </div>
            <h3 className="text-[15px] font-semibold">{t(node.name, lang)}</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">{t(node.hardware, lang)}</p>
            {node.image ? (
              <figure className="mt-3">
                <FramedImage
                  name={node.image.name}
                  lang={lang}
                  ratio="4/3"
                  radius="lg"
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw"
                />
                <figcaption className="mt-1.5 font-mono text-[11.5px] text-muted-foreground">
                  {t(node.image.caption, lang)}
                </figcaption>
              </figure>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="border-b px-5 py-3 font-mono text-xs text-muted-foreground max-sm:text-center">
        {t(nodesFootnote, lang)}
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 px-5 py-4 max-sm:justify-center max-sm:text-center">
        <ul
          aria-label={t(uiLab.statsLabel, lang)}
          className="flex flex-wrap items-baseline gap-x-8 gap-y-3 max-sm:justify-center"
        >
          {haStats.map((stat) => (
            <li key={t(stat.label, 'en')} className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-medium">{t(stat.value, lang)}</span>
              <span className="text-[13px] text-muted-foreground">{t(stat.label, lang)}</span>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-muted-foreground max-sm:w-full sm:ml-auto">
          {t(uiLab.statsSource, lang)}
        </p>
      </div>
    </div>
  );
}
