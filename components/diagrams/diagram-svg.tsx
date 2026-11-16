import type { ReactNode } from 'react';
import styles from './diagrams.module.css';

type MarkerId = 'ah-w' | 'ah-a' | 'as-w' | 'as-a';

type DiagramSvgProps = {
  /** Unique per diagram, so marker ids never collide when several diagrams share a page. */
  prefix: string;
  width: number;
  height: number;
  label: string;
  children: (marker: (id: MarkerId) => string) => ReactNode;
};

/**
 * Line-art SVG shell: arrow markers plus theme-aware classes (see diagrams.module.css).
 * Colours come from CSS variables, so the same markup works in light and dark.
 */
export function DiagramSvg({ prefix, width, height, label, children }: DiagramSvgProps) {
  const id = (marker: MarkerId) => `${prefix}-${marker}`;
  const marker = (name: MarkerId) => `url(#${id(name)})`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      className={styles.svg}
      style={{ minWidth: Math.min(width, 720) }}
    >
      <defs>
        {(['ah-w', 'ah-a'] as const).map((name) => (
          <marker
            key={name}
            id={id(name)}
            orient="auto"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0 0 L6 3 L0 6 Z" className={name.endsWith('a') ? 'mka' : 'mkw'} />
          </marker>
        ))}
        {(['as-w', 'as-a'] as const).map((name) => (
          <marker
            key={name}
            id={id(name)}
            orient="auto-start-reverse"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0 0 L6 3 L0 6 Z" className={name.endsWith('a') ? 'mka' : 'mkw'} />
          </marker>
        ))}
      </defs>
      {children(marker)}
    </svg>
  );
}
