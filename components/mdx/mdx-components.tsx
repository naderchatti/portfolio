import type { MDXComponents } from 'mdx/types';
import type { Locale } from '@/lib/i18n';
import { Figure } from './figure';
import { WiringDiagram } from './wiring-diagram';

/** Components available to every post. `Figure` needs the locale for manifest alt fallbacks. */
export function mdxComponents(lang: Locale): MDXComponents {
  return {
    Figure: (props: { name: string; alt?: string }) => <Figure {...props} lang={lang} />,
    WiringDiagram,
    a: ({ href = '', ...props }) => {
      const external = /^https?:\/\//.test(href);
      return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props} />;
    },
  };
}
