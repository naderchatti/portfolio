'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto w-full lg:max-w-5xl">
        <div className="flex h-14 items-center justify-between px-4">
          <NavigationMenu className="mx-0">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <span className="font-bold text-xl">Nader.</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
