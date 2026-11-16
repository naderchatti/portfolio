import { cn } from '@/lib/utils';

/** Terminal-style path prefix, e.g. `~/lab` or `~/uses/desk`. */
export function PathLabel({ path, className }: { path: string; className?: string }) {
  return (
    <p className={cn('font-mono text-[13px] text-muted-foreground', className)}>
      <span className="font-medium text-foreground">~</span>/{path}
    </p>
  );
}
