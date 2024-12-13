'use client';

export const runtime = 'experimental-edge';

import { SkillsSlider } from '@/components/skills-slider';
import { Card } from '@/components/ui/card';
import TextReveal from '@/components/ui/text-reveal';
import { Timeline } from '@/components/ui/timeline';
import { realisations } from '@/data/realisations';
import { cn } from '@/lib/utils';
import { LinkPreview } from '@/components/ui/link-preview';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ValidLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/getDictionary';
import { useEffect, useState } from 'react';
import { use } from 'react';
import { getTimelineData } from '@/data/timeline';
import { Dictionary } from '@/lib/types/dictionary';

export default function Home({
  params,
}: {
  params: Promise<{ lang: ValidLocale }>;
}) {
  const resolvedParams = use(params);
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(resolvedParams.lang).then(setDict);
  }, [resolvedParams.lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNextSection = (sectionId: string) => {
    const nextSection = document.getElementById(sectionId);
    if (nextSection) {
      if (sectionId === 'about') {
        window.scrollTo({
          top: nextSection.offsetTop + 40,
          behavior: 'smooth',
        });
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!dict) return null;

  const timelineData = getTimelineData(dict);

  return (
    <>
      <div className="h-screen flex flex-col text-center space-y-24">
        <section className="h-[calc(100dvh-3.5rem)] flex flex-col justify-end px-4 pb-28 space-y-4">
          <p className="text-base sm:text-xl md:text-2xl">{dict.home.title}</p>
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Button
              variant={'outline'}
              onClick={() => scrollToNextSection('about')}
            >
              <span className="text-muted-foreground">
                {dict.home.description}
              </span>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </motion.div>
        </section>
        <section
          id="about"
          className="z-10 flex min-h-64 items-center justify-center px-4"
        >
          <div className="mx-auto w-full lg:max-w-5xl">
            <TextReveal text={dict.home.about.description} />
          </div>
        </section>
        <section
          id="skills"
          className="flex min-h-64 items-center justify-center px-4"
        >
          <div className="mx-auto w-full lg:max-w-5xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-muted-foreground">
                  {dict.home.skills.title}
                </h2>
              </div>
              <SkillsSlider />
            </div>
          </div>
        </section>
        <section
          id="realisations"
          className="flex min-h-64 items-center justify-center px-4"
        >
          <div className="mx-auto w-full lg:max-w-5xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-muted-foreground">
                  {dict.home.realisations.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left px-4">
                {realisations.map((realisation, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:bg-accent/50 transition-colors"
                  >
                    <LinkPreview
                      url={realisation.link}
                      redirect={realisation.redirect}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium">
                            {realisation.title}
                          </h3>
                          <div
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              {
                                'bg-yellow-500':
                                  realisation.status[resolvedParams.lang] ===
                                  dict.home.realisations.inDevelopment,
                              },
                              {
                                'bg-green-500':
                                  realisation.status[resolvedParams.lang] ===
                                  dict.home.realisations.active,
                              },
                              'relative',
                              realisation.status[resolvedParams.lang] ===
                                dict.home.realisations.active &&
                                'after:absolute after:inset-0 after:rounded-full after:bg-green-500 after:opacity-40 after:animate-ping'
                            )}
                          />
                        </div>
                        {realisation.role && (
                          <Badge className="text-xs">
                            {realisation.role[resolvedParams.lang]}
                          </Badge>
                        )}
                        <p className="text-muted-foreground">
                          {realisation.description[resolvedParams.lang]}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {dict.home.realisations.techStack}:
                            </span>{' '}
                            {realisation.tech}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {dict.home.realisations.status}:
                            </span>{' '}
                            {realisation.status[resolvedParams.lang]}
                          </p>
                        </div>
                      </div>
                    </LinkPreview>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="timeline"
          className="w-full flex justify-center items-center"
        >
          <div className="mx-auto w-full lg:max-w-5xl">
            <Timeline data={timelineData} dict={dict} />
          </div>
        </section>
        <section className="h-[calc((100dvh-3.5rem)/2.5)] flex flex-col justify-end px-4 pb-28 space-y-4">
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Button variant={'outline'} onClick={scrollToTop}>
              <span className="text-muted-foreground">
                {dict.home.backToTop}
              </span>
              <ArrowUp className="w-4 h-4 text-muted-foreground" />
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
}
