import { notFound } from 'next/navigation';
import { Logo } from '@/components/logo';
import { getMessages, isLocale } from '@/lib/i18n';
import { navItems } from '@/lib/site';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = getMessages(lang);

  return (
    <>
      <section className="border-b bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[20px_20px]">
        <div className="mx-auto max-w-[1120px] px-4 pt-16 pb-14 text-center sm:px-8 sm:pt-[88px] sm:pb-[72px] sm:text-left">
          <p className="mb-7 font-mono text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">~</span> / operator
          </p>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
            <div className="relative flex size-32 shrink-0 items-center justify-center rounded-card border bg-background">
              <CornerTicks />
              <Logo className="size-[100px]" tracking label={messages.a11y.catLabel} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-[44px] leading-none font-semibold tracking-[-0.045em] sm:text-[64px]">
                Nader Chatti
              </h1>
              <p className="mx-auto mt-3 max-w-[640px] text-xl tracking-[-0.01em] sm:mx-0">
                {messages.home.role}
              </p>
            </div>
          </div>
          <p className="mx-auto mt-5 max-w-[640px] text-base text-muted-foreground sm:mx-0">
            {messages.home.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        {navItems.map((item) => (
          <section
            key={item.key}
            id={item.key}
            aria-labelledby={`${item.key}-title`}
            className="scroll-mt-16 border-b py-16 last:border-b-0"
          >
            <p className="font-mono text-[13px] text-muted-foreground">
              <span className="font-medium text-foreground">~</span>/{item.key} · {item.index}
            </p>
            <h2 id={`${item.key}-title`} className="mt-1.5 text-3xl font-semibold tracking-[-0.03em]">
              {messages.nav[item.key]}
            </h2>
            <p className="mt-3 text-muted-foreground">{messages.home.soon}</p>
          </section>
        ))}
      </div>
    </>
  );
}

function CornerTicks() {
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
