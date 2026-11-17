import { Chips, Section } from '@/components/home/primitives';
import { stack } from '@/content/stack';
import { t, tList } from '@/content/types';
import type { Locale, Messages } from '@/lib/i18n';

type StackProps = { lang: Locale; messages: Messages };

export function Stack({ lang, messages }: StackProps) {
  return (
    <Section id="stack" index="05" title={messages.sections.stack.title}>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {stack.map((group) => {
          const label = t(group.label, lang);
          return (
            <li key={group.id} className="rounded-card border bg-card p-5">
              <h3 className="mb-3 flex items-baseline justify-between text-base font-semibold">
                {label}
                <span aria-hidden="true" className="font-mono text-[11px] font-normal text-muted-foreground">
                  {group.id}
                </span>
              </h3>
              <Chips items={tList(group.items, lang)} label={label} />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
