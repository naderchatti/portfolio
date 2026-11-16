import { Mail } from 'lucide-react';
import { SocialIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { CornerTicks, PathLabel } from '@/components/home/primitives';
import { profile, socials } from '@/content/site';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
import type { Locale, Messages } from '@/lib/i18n';

type ContactProps = { lang: Locale; messages: Messages };

export function Contact({ lang, messages }: ContactProps) {
  const links = socials.filter((social) => social.key !== 'email');

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 py-14 sm:py-20">
      <div className="relative grid items-center gap-6 rounded-card border bg-card p-6 text-center sm:p-8 min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:text-left">
        <CornerTicks />
        <div>
          <PathLabel path={t(uiHome.contact.breadcrumb, lang)} index="06" />
          <h2 id="contact-title" className="mt-1.5 text-3xl font-semibold tracking-[-0.03em] text-balance">
            {t(profile.contact.title, lang)}
          </h2>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            {t(profile.contact.body, lang)}{' '}
            <a href={`mailto:${profile.email}`} className="break-all underline-offset-[3px] hover:underline">
              {profile.email}
            </a>
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Button asChild className="h-11 sm:h-9">
            <a href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" />
              {messages.sections.contact.emailMe}
            </a>
          </Button>
          <ul aria-label={messages.a11y.socialNav} className="flex flex-wrap justify-center gap-2">
            {links.map((social) => (
              <li key={social.key}>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-11 shadow-none sm:size-9 dark:border-border dark:bg-background dark:hover:bg-secondary"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer me" aria-label={social.label}>
                    <SocialIcon name={social.key} />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
