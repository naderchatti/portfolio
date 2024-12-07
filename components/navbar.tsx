'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background xs:px-2 sm:px-8 md:px-16 lg:px-32 xl:px-48">
      <div className="flex h-14 items-center justify-between px-4">
        <NavigationMenu className="mx-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <p className="font-bold text-xl">Nader.</p>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
