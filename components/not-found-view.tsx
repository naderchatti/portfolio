import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import type { Locale, Messages } from '@/lib/i18n';

type NotFoundViewProps = {
  locale: Locale;
  messages: Messages['notFound'];
};

export function NotFoundView({ locale, messages }: NotFoundViewProps) {
  return (
    <section className="mx-auto flex max-w-[1120px] flex-col items-center px-4 py-24 text-center sm:px-8 sm:py-32">
      <Logo className="size-16" />
      <p className="mt-8 font-mono text-[13px] text-muted-foreground">
        <span className="font-medium text-foreground">{messages.code}</span> · {messages.shell}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{messages.title}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{messages.description}</p>
      <Link href={`/${locale}/`} className={buttonVariants({ className: 'mt-8 min-h-11 sm:min-h-9' })}>
        <ArrowLeft aria-hidden="true" />
        {messages.home}
      </Link>
    </section>
  );
}
