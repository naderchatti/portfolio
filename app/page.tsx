import TextReveal from '@/components/ui/text-reveal';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';

export default function Home() {
  const data = [
    {
      title: '2019-2020',
      content: (
        <div>
          <p className="text-xs md:text-sm font-bold text-muted-foreground">
            Nice, France
          </p>
          <p className="text-lg md:text-4xl font-normal mb-4">
            Université Côte d&apos;Azur
          </p>
          <p className="text-xs md:text-sm font-normal mb-8">
            M2 MBDS: Master 2 in Big Data and System Integration
          </p>
        </div>
      ),
    },
    {
      title: '2018-2019',
      content: (
        <div>
          <p className="text-xs md:text-sm font-bold text-muted-foreground">
            Nice, France
          </p>
          <p className="text-lg md:text-4xl font-normal mb-4">
            Université Côte d&apos;Azur
          </p>
          <p className="text-xs md:text-sm font-normal mb-8">
            M1 MIAGE: Master 1 in Computerized Methods Applied to Business
            Management
          </p>
        </div>
      ),
    },
    {
      title: '2013-2017',
      content: (
        <div>
          <p className="text-xs md:text-sm font-bold text-muted-foreground">
            Sousse, Tunisia
          </p>
          <p className="text-lg md:text-4xl font-normal mb-4">ISITcom</p>
          <p className="text-xs md:text-sm font-normal mb-8">
            Applied Licence Degree in Computer Network and Telecommunications
            Techniques
          </p>
        </div>
      ),
    },
  ];
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
          <Timeline data={data} />
        </section>
      </div>
    </>
  );
}
