/** Four small corner brackets drawn just outside a `relative` frame. Decorative. */
export function CornerTicks() {
  const base = 'pointer-events-none absolute size-[9px] border-muted-foreground';
  return (
    <>
      <span aria-hidden="true" className={`${base} -top-[5px] -left-[5px] border-t border-l`} />
      <span aria-hidden="true" className={`${base} -top-[5px] -right-[5px] border-t border-r`} />
      <span aria-hidden="true" className={`${base} -bottom-[5px] -left-[5px] border-b border-l`} />
      <span aria-hidden="true" className={`${base} -right-[5px] -bottom-[5px] border-r border-b`} />
    </>
  );
}
