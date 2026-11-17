import { FramedImage } from '@/components/ui/framed-image';
import { screens } from '@/content/lab';
import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Dashboard screenshots: the first one leads across both columns. Never cropped. */
export function ScreensGrid({ lang }: { lang: Locale }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {screens.map((screen, index) => (
        <li key={screen.image} className={cn('min-w-0', index === 0 && 'md:col-span-2')}>
          <figure className="flex flex-col gap-2">
            <FramedImage
              name={screen.image}
              lang={lang}
              ratio="native"
              zoom={{ group: 'lab-screens', caption: t(screen.caption, lang) }}
              sizes={index === 0 ? '(min-width: 1120px) 1056px, 100vw' : '(min-width: 1120px) 520px, (min-width: 768px) 50vw, 100vw'}
            />
            <figcaption className="font-mono text-[11.5px] text-muted-foreground">{t(screen.caption, lang)}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
