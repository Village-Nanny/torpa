'use client';

import { NavLink } from '../atoms/nav-link';
import { Button } from '../atoms/button';
import React from 'react';

export function NavigationMenu() {
  return (
    <div className="space-x-4">
      <NavLink href="/features">Features</NavLink>
      <NavLink href="/about">About</NavLink>
      <Button size="sm" className="border-purple text-purple hover:bg-purple hover:text-white">
        Get Started
      </Button>
    </div>
  );
}
