import { SkillsSlider } from '@/components/skills-slider';
import { Card } from '@/components/ui/card';
import TextReveal from '@/components/ui/text-reveal';
import { Timeline } from '@/components/ui/timeline';
import { timelineData } from '@/data/timeline';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import { LinkPreview } from '@/components/ui/link-preview';

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col text-center space-y-24">
        <section className="h-[calc(100dvh-10rem)] flex flex-col justify-end px-4">
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground">
            Welcome to my space
          </p>
          <p className="font-extralight text-foreground text-4xl md:text-6xl">
            Nader Chatti
          </p>
        </section>
        <section className="z-10 flex min-h-64 items-center justify-center px-4">
          <div className="mx-auto w-full lg:max-w-5xl">
            <TextReveal
              text={[
                "Crafting modern web solutions as a passionate Fullstack developer and software engineer holding a Master's degree, with a deep interest in modern web technologies and software architecture.",
                'Currently focused on freelance work and building SaaS products, always exploring new ways to create efficient and scalable solutions.',
              ]}
            />
          </div>
        </section>
        <section className="flex min-h-64 items-center justify-center px-4">
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
        <section className="flex min-h-64 items-center justify-center px-4">
          <div className="mx-auto w-full lg:max-w-5xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-muted-foreground">
                  Latest Projects
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left px-4">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:bg-accent/50 transition-colors"
                  >
                    <LinkPreview url={project.link} redirect={project.redirect}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium">
                            {project.title}
                          </h3>
                          <div
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              {
                                'bg-yellow-500':
                                  project.status === 'In Development',
                              },
                              {
                                'bg-green-500': project.status === 'Active',
                              },
                              'relative',
                              project.status === 'Active' &&
                                'after:absolute after:inset-0 after:rounded-full after:bg-green-500 after:opacity-40 after:animate-ping'
                            )}
                          />
                        </div>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Tech Stack:
                            </span>{' '}
                            {project.tech}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Status:
                            </span>{' '}
                            {project.status}
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
        <section className="w-full">
          <div className="mx-auto w-full lg:max-w-5xl">
            <Timeline data={timelineData} />
          </div>
        </section>
      </div>
    </>
  );
}
