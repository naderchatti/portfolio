'use client';

import { Dock, DockIcon } from './ui/dock';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Discord } from './ui/icons/discord';
import { X } from './ui/icons/x';

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
            href="https://x.com/naderchatti"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <X className="h-6 w-6" />
          </a>
        </DockIcon>
        <DockIcon>
          <a
            href="https://discord.com/users/naderchatti"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2"
          >
            <Discord className="h-6 w-6" />
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
