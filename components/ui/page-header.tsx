import type { ReactNode } from 'react';
import { PathLabel } from '@/components/ui/path-label';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  path: string;
  title: string;
  lead: string;
  size?: 'md' | 'lg';
  className?: string;
  children?: ReactNode;
};

/** Page intro: `~/path`, the page's single `h1` and a lead. Centred on phones. */
export function PageHeader({ path, title, lead, size = 'md', className, children }: PageHeaderProps) {
  return (
    <header className={cn('max-sm:text-center', className)}>
      <PathLabel path={path} />
      <h1
        className={cn(
          'leading-none font-semibold tracking-[-0.045em]',
          size === 'lg' ? 'my-3.5 text-[40px] sm:text-[56px]' : 'my-3 text-4xl sm:text-5xl',
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          'text-muted-foreground max-sm:mx-auto',
          size === 'lg' ? 'max-w-[68ch] text-lg' : 'max-w-[72ch] text-[17px]',
        )}
      >
        {lead}
      </p>
      {children}
    </header>
  );
}
