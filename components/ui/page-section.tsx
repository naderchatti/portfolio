import type { ReactNode } from 'react';
import { PathLabel } from '@/components/ui/path-label';
import { cn } from '@/lib/utils';

type PageSectionProps = {
  id: string;
  title: string;
  /** Optional `~/…` path shown above the title. */
  path?: string;
  /** `lg` for the larger /uses headings. */
  size?: 'md' | 'lg';
  className?: string;
  children: ReactNode;
};

/** A top-bordered page section with an `h2`; headings centre on phones. */
export function PageSection({ id, title, path, size = 'md', className, children }: PageSectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-16 border-t py-12', className)}>
      <div className={cn('max-sm:text-center', size === 'lg' ? 'mb-6' : 'mb-4')}>
        {path ? <PathLabel path={path} /> : null}
        <h2
          id={headingId}
          className={cn(
            'font-semibold',
            size === 'lg' ? 'mt-1.5 text-[26px] tracking-[-0.03em]' : 'text-2xl tracking-[-0.02em]',
          )}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
