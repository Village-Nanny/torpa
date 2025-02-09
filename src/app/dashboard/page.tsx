'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { RootState } from '@/src/store';
import { Button } from '@/src/components/ui/atoms/button';
import { toast } from 'sonner';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
      toast.success('Successfully logged out!');
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/start-page">
              <Button variant="secondary">Go to Start Page</Button>
            </Link>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-muted-foreground">You&apos;re signed in as: {user.email}</p>
          <p className="mt-4">This is a barebones dashboard page. Add your content here!</p>
        </div>
      </div>
    </div>
  );
}
