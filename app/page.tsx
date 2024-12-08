import { SkillsSlider } from '@/components/skills-slider';
import { Card } from '@/components/ui/card';
import TextReveal from '@/components/ui/text-reveal';
import { Timeline } from '@/components/ui/timeline';
import { timelineData } from '@/data/timeline';

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col text-center space-y-24">
        <section className="h-[calc(100dvh-10rem)] flex flex-col justify-end px-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight mb-4 tracking-tight">
            Nader Chatti
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Software Engineer & Developer
          </p>
        </section>
        <section className="z-10 flex min-h-64 items-center justify-center">
          <TextReveal
            text={[
              "Originally from Tunisia and living in France, I started with a Bachelor's degree in network and telecommunications before continuing my studies with a Master's degree in applied management information systems and finishing with a Master's degree in Mobility, Big Data, and Systems Integration.",
              "I started working as a developer in 2017 and then as a Deep Learning solutions developer in 2019. After obtaining my master's degree, I specialized in Fullstack, web, and Mobile development solutions.",
              'Today, I assist large companies as well as small clients, both professionals and individuals, in developing their solutions.',
            ]}
          />
        </section>
        <section className="w-full lg:max-w-5xl mx-auto">
          <Timeline data={timelineData} />
        </section>
        <section className="h-full pb-24 md:pb-0 md:h-[100dvh] flex flex-col gap-12 justify-center w-full lg:max-w-5xl mx-auto px-4">
          <div>
            <SkillsSlider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <Card className="p-4">
              <p className="text-lg font-bold text-muted-foreground">01</p>
              <p className="text-2xl font-extrabold mb-2">
                Backend Development
              </p>
              <p className="text-md font-light text-muted-foreground">
                I have experience with backend development using python, node.js
                and express. Databases used include MongoDB, PostgreSQL, and
                MySQL.
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-lg font-bold text-muted-foreground">02</p>
              <p className="text-2xl font-extrabold mb-2">
                Frontend Development
              </p>
              <p className="text-md font-light text-muted-foreground">
                I have experience with frontend development using React, Next.js
                for web development and React Native for mobile development.
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-lg font-bold text-muted-foreground">03</p>
              <p className="text-2xl font-extrabold mb-2">DevOps & Cloud</p>
              <p className="text-md font-light text-muted-foreground">
                I have experience with infrastructure using Cloudflare, Google
                Cloud Platform, and custom VPS configurations.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
