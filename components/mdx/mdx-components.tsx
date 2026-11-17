import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import type { Locale } from '@/lib/i18n';
import { Figure } from './figure';
import { PostVideo } from './post-video';
import { WiringDiagram } from './wiring-diagram';

/** Components available to every post. `Figure` and `WiringDiagram` need the locale; `PostVideo` does not. */
export function mdxComponents(lang: Locale): MDXComponents {
  return {
    Figure: (props: { name: string; alt?: string }) => <Figure {...props} lang={lang} />,
    WiringDiagram: (props: { slug: string; alt?: string }) => <WiringDiagram {...props} lang={lang} />,
    PostVideo,
    a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => {
      const external = /^https?:\/\//.test(href);
      return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props} />;
    },
    // Wide tables scroll inside their own box instead of widening the page.
    table: (props: ComponentPropsWithoutRef<'table'>) => (
      <div className="table-scroll">
        <table {...props} />
      </div>
    ),
  };
}
