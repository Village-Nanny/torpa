'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { RootState } from '@/src/store';
import { Button } from '@/src/components/ui/atoms/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/src/services/firebase';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [runs, setRuns] = useState<{ id: string; score: number }[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchRuns = async () => {
        try {
          const runsRef = collection(db, 'gameRuns');
          const q = query(runsRef, where('uid', '==', user.uid));
          const snapshot = await getDocs(q);
          const fetchedRuns = snapshot.docs.map(doc => ({ id: doc.id, score: doc.data().score }));
          setRuns(fetchedRuns);
        } catch (error) {
          console.error('Error fetching game runs:', error);
        }
      };
      fetchRuns();
    }
  }, [user]);

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
            <Link href="/game">
              <Button variant="secondary">Play a Game</Button>
            </Link>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-muted-foreground">You&apos;re signed in as: {user.email}</p>
          <p className="mt-4">This is a barebones dashboard page. Add your content here!</p>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white">Game Runs</h3>
            {runs.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {runs.map(run => (
                  <li key={run.id} className="bg-card p-2 rounded">
                    <p className="text-white">Run ID: {run.id}</p>
                    <p className="text-white">Score: {run.score} / 100</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No runs recorded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
