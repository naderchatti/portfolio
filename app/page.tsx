'use client';

import { SkillsSlider } from '@/components/skills-slider';
import { Card } from '@/components/ui/card';
import TextReveal from '@/components/ui/text-reveal';
import { Timeline } from '@/components/ui/timeline';
import { timelineData } from '@/data/timeline';
import { realisations } from '@/data/realisations';
import { cn } from '@/lib/utils';
import { LinkPreview } from '@/components/ui/link-preview';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function Home() {
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

  return (
    <>
      <div className="h-screen flex flex-col text-center space-y-24">
        <section className="h-[calc(100dvh-3.5rem)] flex flex-col justify-end px-4 pb-28 space-y-4">
          <p className="text-base sm:text-xl md:text-2xl">
            Welcome to my portfolio
          </p>
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
              <span className="text-muted-foreground">Enjoy your visit</span>
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </motion.div>
        </section>
        <section
          id="about"
          className="z-10 flex min-h-64 items-center justify-center px-4"
        >
          <div className="mx-auto w-full lg:max-w-5xl">
            <TextReveal
              text={[
                "Originally from Tunisia and currently based in France, my name is Nader Chatti, I'm a passionate Fullstack developer and software engineer with a Master's degree, specializing in modern web technologies and software architecture.",
                'Currently focused on freelance work and building SaaS products, I combine my multicultural background with technical expertise to create efficient and scalable solutions.',
              ]}
            />
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
                  Technical Expertise
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
                  Realisations
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
                                  realisation.status === 'In Development',
                              },
                              {
                                'bg-green-500': realisation.status === 'Active',
                              },
                              'relative',
                              realisation.status === 'Active' &&
                                'after:absolute after:inset-0 after:rounded-full after:bg-green-500 after:opacity-40 after:animate-ping'
                            )}
                          />
                        </div>
                        {realisation.role && (
                          <Badge className="text-xs">{realisation.role}</Badge>
                        )}
                        <p className="text-muted-foreground">
                          {realisation.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Tech Stack:
                            </span>{' '}
                            {realisation.tech}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Status:
                            </span>{' '}
                            {realisation.status}
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
            <Timeline data={timelineData} />
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
              <span className="text-muted-foreground">Back to top</span>
              <ArrowUp className="w-4 h-4 text-muted-foreground" />
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
}
