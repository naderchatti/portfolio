import {
  BrainCircuit,
  GraduationCap,
  Hotel,
  Router,
  Waves,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const stack = [
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

export const timelineData = [
  {
    title: '2023-2024',
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
          Development of a matching platform for hotels and travelers that
          allows hotels to find the perfect match for their guests.
        </p>
        <div className="flex flex-wrap gap-2">
          {stack[0].mhm.map((skill) => (
            <Card className="p-2 border-l-4" key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
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
          Development of a web and mobile app allowing scheduling, appointment
          management, reports, and anomaly management to replace the old
          paper-based system.
        </p>
        <div className="flex flex-wrap gap-2">
          {stack[0].vasta.map((skill) => (
            <Card className="p-2 border-l-4" key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
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
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">Université Côte d&apos;Azur</p>
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
          Development of a deep learning model for the detection of brain
          tumors. In partnership with the university hospital center of Nice, it
          allows doctors to detect brain tumors with a deep learning model.
        </p>
        <div className="flex flex-wrap gap-2">
          {stack[0].deepBridge.map((skill) => (
            <Card className="p-2 border-l-4" key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
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
        <div className="flex h-5 items-center gap-2 mb-2 text-xs md:text-sm font-bold text-muted-foreground">
          <p className="font-bold">Université Côte d&apos;Azur</p>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground rounded-full"
          />
          <p className="text-muted-foreground">Nice, France</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={32} />
          <p className="text-lg md:text-4xl font-normal">
            Master&apos;s Degree
          </p>
        </div>
        <Card className="p-2 border-l-4 mb-2">
          <p className="text-xs md:text-sm font-normal">
            <span className="font-bold">M2 MBDS:</span> Master 2 in Big Data and
            System Integration
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
          <p className="text-lg md:text-4xl font-normal">SmartHome</p>
        </div>
        <p className="text-xs md:text-sm font-normal mb-4">
          Development of a smart home platform allowing the control of home
          appliances through an app and a voice assistant. Make a non-smart home
          smart using IPX800 hardware and an app.
        </p>
        <div className="flex flex-wrap gap-2">
          {stack[0].hes.map((skill) => (
            <Card className="p-2 border-l-4" key={skill}>
              <p className="text-sm font-bold text-muted-foreground">{skill}</p>
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
