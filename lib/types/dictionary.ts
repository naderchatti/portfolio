export interface Dictionary {
  navigation: {
    language: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  home: {
    title: string;
    description: string;
    about: {
      title: string;
      description: string[];
    };
    skills: {
      title: string;
    };
    realisations: {
      title: string;
      techStack: string;
      status: string;
      inDevelopment: string;
      active: string;
    };
    timeline: {
      title: string;
      current: string;
      university: string;
      aidiagme: {
        description: string;
      };
      renovationDevis: {
        description: string;
      };
      mhm: {
        description: string;
      };
      vasta: {
        description: string;
      };
      deepBridge: {
        description: string;
      };
      masters: {
        title: string;
        m2: string;
        m1: string;
      };
      bachelors: {
        title: string;
        description: string;
      };
    };
    backToTop: string;
  };
  notFound: {
    title: string;
    heading: string;
    description: string;
    goHome: string;
  };
}

export interface TimelineDict {
  home: {
    timeline: {
      current: string;
      university: string;
      aidiagme: {
        description: string;
      };
      renovationDevis: {
        description: string;
      };
      mhm: {
        description: string;
      };
      vasta: {
        description: string;
      };
      deepBridge: {
        description: string;
      };
      masters: {
        title: string;
        m2: string;
        m1: string;
      };
      bachelors: {
        title: string;
        description: string;
      };
    };
  };
}

export interface NotFoundDict {
  notFound: {
    title: string;
    heading: string;
    description: string;
    goHome: string;
  };
}
