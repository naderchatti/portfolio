'use client';

import { Dock, DockIcon } from './ui/dock';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function SocialsDock() {
  return (
    <div className="z-50 fixed bottom-0 left-0 right-0 flex justify-center pb-4">
      <Dock>
        <DockIcon>
          <a
            href="https://github.com/naderchatti"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <Github className="h-6 w-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <a
            href="https://www.linkedin.com/in/naderchatti"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <a
            href="https://twitter.com/naderchatti"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <a href="mailto:contact@naderchatti.com" className="p-2">
            <Mail className="h-6 w-6" />
          </a>
        </DockIcon>
      </Dock>
    </div>
  );
}
