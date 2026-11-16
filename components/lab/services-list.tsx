import { services } from '@/content/lab';
import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';

export function ServicesList({ lang }: { lang: Locale }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 font-mono text-[12.5px] md:grid-cols-2">
      {services.map((service) => (
        <li key={service.name} className="flex justify-between gap-3 border-b py-2">
          <span>{service.name}</span>
          <span className="text-right text-muted-foreground">{t(service.purpose, lang)}</span>
        </li>
      ))}
    </ul>
  );
}
