import { cn } from '@/lib/utils';

/** A wrapping list of small monospace tags. */
export function ChipList({ items, label, className }: { items: readonly string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border px-[7px] py-px font-mono text-[11.5px] whitespace-nowrap text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
