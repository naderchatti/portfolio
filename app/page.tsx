import { SkillsSlider } from '@/components/skills-slider';
import { Card } from '@/components/ui/card';
import TextReveal from '@/components/ui/text-reveal';
import { Timeline } from '@/components/ui/timeline';
import { Separator } from '@/components/ui/separator';
import {
  BrainCircuit,
  GraduationCap,
  Hotel,
  Router,
  Waves,
} from 'lucide-react';

export default function Home() {
  const stack = [
    {
      mhm: [
        'Full Stack',
        'Amadeus Certification',
        'Web App',
        'Mobile App',
        'Python',
        'FastAPI',
        'React Native',
        'React',
        'Node.js',
        'MongoDB',
      ],
      vasta: [
        'Full Stack',
        'Web App',
        'Mobile App',
        'React',
        'React Native',
        'Java',
        'Spring Boot',
        'Node.js',
        'PostgreSQL',
        'VPS',
      ],
      deepBridge: [
        'ML/DL',
        'Web App',
        'Python',
        'PyTorch',
        'TensorFlow',
        'Keras',
        'Numpy',
        'Pandas',
        'Angular',
      ],
      hes: [
        'Full Stack',
        'Web App',
        'Mobile App',
        'IoT',
        'Vue.js',
        'Node.js',
        'Express',
        'Android',
        'Kotlin',
        'Jarvis',
        'IPX800',
      ],
    },
  ];
  const data = [
    {
      title: '2023-2024',
      content: (
        <div className="text-left">
          <div className="flex h-5 items-center space-x-2 text-xs md:text-sm font-bold text-muted-foreground">
            <p className="font-bold">MHM Labs</p>
            <Separator orientation="vertical" className="w-1 rounded-full" />
            <p className="text-muted-foreground">Sophia Antipolis, France</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Hotel size={32} />
            <p className="text-lg md:text-4xl font-normal">MyHotelMatch</p>
          </div>
          <p className="text-xs md:text-sm font-normal mb-8">
            Development of a matching platform for hotels and travelers that
            allows hotels to find the perfect match for their guests.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack[0].mhm.map((skill) => (
              <Card className="p-2 border-l-4" key={skill}>
                <p className="text-sm font-bold text-muted-foreground">
                  {skill}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2021-2022',
      content: (
        <div className="text-left">
          <div className="flex h-5 items-center space-x-2 text-xs md:text-sm font-bold text-muted-foreground">
            <p className="font-bold">Vasta Piscine</p>
            <Separator orientation="vertical" className="w-1 rounded-full" />
            <p className="text-muted-foreground">
              Saint-Laurent-du-Var, France
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Waves size={32} />
            <p className="text-lg md:text-4xl font-normal">Vast&apos;Appli</p>
          </div>
          <p className="text-xs md:text-sm font-normal mb-8">
            Development of a web and mobile app allowing scheduling, appointment
            management, reports, and anomaly management to replace the old
            paper-based system.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack[0].vasta.map((skill) => (
              <Card className="p-2 border-l-4" key={skill}>
                <p className="text-sm font-bold text-muted-foreground">
                  {skill}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2020-2021',
      content: (
        <div className="text-left">
          <div className="flex h-5 items-center space-x-2 text-xs md:text-sm font-bold text-muted-foreground">
            <p className="font-bold">Université Côte d&apos;Azur</p>
            <Separator orientation="vertical" className="w-1 rounded-full" />
            <p className="text-muted-foreground">Sophia Antipolis, France</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit size={32} />
            <p className="text-lg md:text-4xl font-normal">DeepBridge</p>
          </div>
          <p className="text-xs md:text-sm font-normal mb-8">
            Development of a deep learning model for the detection of brain
            tumors. In partnership with the university hospital center of Nice,
            it allows doctors to detect brain tumors with a deep learning model.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack[0].deepBridge.map((skill) => (
              <Card className="p-2 border-l-4" key={skill}>
                <p className="text-sm font-bold text-muted-foreground">
                  {skill}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2018-2020',
      content: (
        <div className="text-left">
          <div className="flex h-5 items-center space-x-2 text-xs md:text-sm font-bold text-muted-foreground">
            <p className="font-bold">Université Côte d&apos;Azur</p>
            <Separator orientation="vertical" className="w-1 rounded-full" />
            <p className="text-muted-foreground">Nice, France</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={32} />
            <p className="text-lg md:text-4xl font-normal">
              Master&apos;s Degree
            </p>
          </div>
          <Card className="p-2 border-l-4 mb-2">
            <p className="text-xs md:text-sm font-normal">
              <span className="font-bold">M2 MBDS:</span> Master 2 in Big Data
              and System Integration
            </p>
          </Card>
          <Card className="p-2 border-l-4">
            <p className="text-xs md:text-sm font-normal">
              <span className="font-bold">M1 MIAGE:</span> Master 1 in
              Computerized Methods Applied to Business Management
            </p>
          </Card>
        </div>
      ),
    },
    {
      title: '2017-2018',
      content: (
        <div className="text-left">
          <div className="flex h-5 items-center space-x-2 text-xs md:text-sm font-bold text-muted-foreground">
            <p className="font-bold">HES</p>
            <Separator orientation="vertical" className="w-1 rounded-full" />
            <p className="text-muted-foreground">
              Saint-Laurent-du-Var, France
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Router size={32} />
            <p className="text-lg md:text-4xl font-normal">SmartHome</p>
          </div>
          <p className="text-xs md:text-sm font-normal mb-8">
            Development of a smart home platform allowing the control of home
            appliances through an app and a voice assistant. Make a non-smart
            home smart using IPX800 hardware and an app.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack[0].hes.map((skill) => (
              <Card className="p-2 border-l-4" key={skill}>
                <p className="text-sm font-bold text-muted-foreground">
                  {skill}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2013-2017',
      content: (
        <div className="text-left">
          <div className="flex h-5 items-center space-x-2 text-xs md:text-sm font-bold text-muted-foreground">
            <p className="font-bold">ISITcom</p>
            <Separator orientation="vertical" className="w-1 rounded-full" />
            <p className="text-muted-foreground">Sousse, Tunisia</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={32} />
            <p className="text-lg md:text-4xl font-normal">
              Bachelor&apos;s Degree
            </p>
          </div>
          <Card className="p-2 border-l-4">
            <p className="text-xs md:text-sm font-normal">
              Applied Licence Degree in Computer Network and Telecommunications
              Techniques
            </p>
          </Card>
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
