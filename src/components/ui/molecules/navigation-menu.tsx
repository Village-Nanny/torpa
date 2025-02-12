'use client';

//import { NavLink } from '../atoms/nav-link';
import { Button } from '../atoms/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { toast } from 'sonner';
import { LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export function NavigationMenu() {
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out!');
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="space-x-4">
      {/*<NavLink href="/features">Features</NavLink>
      <NavLink href="/about">About</NavLink>*/}
      {user ? (
        <>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="hidden sm:inline-flex items-center gap-2 font-bold bg-green-500 hover:bg-green-600 text-white border-green-400 hover:border-green-300 transition-all duration-200">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-green-500 hover:border-green-400 text-green-500 hover:text-white hover:bg-green-500 bg-transparent inline-flex items-center gap-2 transition-all duration-200 font-medium">
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </>
      ) : (
        <Button
          asChild
          className="bg-green-500 hover:bg-green-600 text-white border-green-400 hover:border-green-300 transition-all duration-200 font-bold">
          <Link href="/login">Log In</Link>
        </Button>
      )}
    </div>
  );
}
