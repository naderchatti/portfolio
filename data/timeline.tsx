import {
  BrainCircuit,
  GraduationCap,
  Hammer,
  Hotel,
  Router,
  Stethoscope,
  Waves,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TimelineDict } from '@/lib/types/dictionary';

export const stack = {
  aidiagme: [
    'Full Stack',
    'Web App',
    'Next.js',
    'PostgreSQL',
    'Wordpress',
    'AI',
    'LLM',
    'OpenAI',
    'Anthropic',
  ],
  renovationDevis: [
    'Full Stack',
    'Web App',
    'Next.js',
    'Node.js',
    'Cloudflare',
    'Workers',
    'D1',
  ],
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
  smartHome: [
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
};

export const getTimelineData = (dict: TimelineDict) => [
  {
    title: dict.home.timeline.current,
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">AI Diag Me</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Nice, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope size={32} />
          <p className="text-lg md:text-4xl font-normal">AI Diag Me</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          {dict.home.timeline.aidiagme.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.aidiagme.map((skill) => (
            <Card className="p-2" style={{ borderLeftWidth: 4 }} key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2024',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">Bati Azure Reno</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Nice, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Hammer size={32} />
          <p className="text-lg md:text-4xl font-normal">Rénovation Devis</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          {dict.home.timeline.renovationDevis.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.renovationDevis.map((skill) => (
            <Card className="p-2" style={{ borderLeftWidth: 4 }} key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2023',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">MHM Labs</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Sophia Antipolis, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Hotel size={32} />
          <p className="text-lg md:text-4xl font-normal">MyHotelMatch</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          {dict.home.timeline.mhm.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.mhm.map((skill) => (
            <Card className="p-2" style={{ borderLeftWidth: 4 }} key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">Vasta Piscine</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Saint-Laurent-du-Var, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Waves size={32} />
          <p className="text-lg md:text-4xl font-normal">Vast&apos;Appli</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          {dict.home.timeline.vasta.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.vasta.map((skill) => (
            <Card className="p-2" style={{ borderLeftWidth: 4 }} key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2021',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">{dict.home.timeline.university}</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Sophia Antipolis, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit size={32} />
          <p className="text-lg md:text-4xl font-normal">DeepBridge</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          {dict.home.timeline.deepBridge.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.deepBridge.map((skill) => (
            <Card className="p-2" style={{ borderLeftWidth: 4 }} key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2020',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">{dict.home.timeline.university}</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Sophia Antipolis, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={32} />
          <p className="text-lg md:text-4xl font-normal">
            {dict.home.timeline.masters.title}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Card className="p-2" style={{ borderLeftWidth: 4 }}>
            <p className="text-xs md:text-sm font-normal">
              <span className="font-bold">M2 MBDS:</span>{' '}
              {dict.home.timeline.masters.m2}
            </p>
          </Card>
          <Card className="p-2" style={{ borderLeftWidth: 4 }}>
            <p className="text-xs md:text-sm font-normal">
              <span className="font-bold">M1 MIAGE:</span>{' '}
              {dict.home.timeline.masters.m1}
            </p>
          </Card>
        </div>
      </div>
    ),
  },
  {
    title: '2018',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">HES</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Saint-Laurent-du-Var, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Router size={32} />
          <p className="text-lg md:text-4xl font-normal">Smart Home</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          {dict.home.timeline.smartHome.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.smartHome.map((skill) => (
            <Card className="p-2" style={{ borderLeftWidth: 4 }} key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2017',
    content: (
      <div className="text-left">
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">ISITcom</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Sousse, Tunisia</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={32} />
          <p className="text-lg md:text-4xl font-normal">
            {dict.home.timeline.bachelors.title}
          </p>
        </div>
        <Card className="p-2" style={{ borderLeftWidth: 4 }}>
          <p className="text-xs md:text-sm font-normal">
            {dict.home.timeline.bachelors.description}
          </p>
        </Card>
      </div>
    ),
  },
];
