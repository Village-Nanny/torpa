import Link from 'next/link';
import { NavigationMenu } from './navigation-menu';

import React from 'react';

export function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm absolute w-full z-10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-display font-bold text-gray-800">
          Torpa
        </Link>
        <div className="flex items-center gap-4">
          <NavigationMenu />
        </div>
      </nav>
    </header>
  );
}
