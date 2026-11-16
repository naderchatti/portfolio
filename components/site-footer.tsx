import { SocialIcon } from '@/components/icons';
import type { Messages } from '@/lib/i18n';
import { socials } from '@/lib/site';

type SiteFooterProps = {
  messages: Messages;
};

export function SiteFooter({ messages }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4 px-4 pt-6 pb-10 text-[13px] text-muted-foreground sm:flex-row sm:flex-wrap sm:px-8">
        <div className="flex flex-col items-center gap-1 font-mono sm:flex-row sm:gap-4">
          <span>{messages.footer.copyright.replace('{year}', String(year))}</span>
          <span aria-hidden="true">{messages.footer.tagline}</span>
        </div>
        <ul aria-label={messages.a11y.socialNav} className="flex flex-wrap items-center justify-center gap-1 sm:ml-auto">
          {socials.map((social) => {
            const label = social.key === 'email' ? messages.footer.email : social.label;
            return (
              <li key={social.key}>
                <a
                  href={social.href}
                  {...(social.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer me' })}
                  aria-label={label}
                  title={label}
                  className="inline-flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-secondary hover:text-foreground sm:size-9"
                >
                  <SocialIcon name={social.key} />
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center rounded-lg px-3 font-medium text-foreground transition-colors hover:bg-secondary sm:min-h-9"
        >
          {messages.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
