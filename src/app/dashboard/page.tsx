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
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { DotPattern } from '@/src/components/ui/atoms/dot-pattern';
import { Header } from '@/src/components/ui/molecules/header';
import { BarChart, LogOut, Play } from 'lucide-react';
import { CircularProgress } from '@/src/components/ui/atoms/circular-progress';
import { LineChart } from '@/src/components/ui/molecules/line-chart';

interface GameRun {
  id: string;
  createdAt: string;
  blendingScore: {
    correct: number;
    total: number;
  };
  segmentingScore: {
    correct: number;
    total: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const [runs, setRuns] = useState<GameRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchRuns = async () => {
        setLoading(true);
        try {
          const runsRef = collection(db, 'gameRuns');
          const q = query(runsRef, where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          const fetchedRuns = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as GameRun[];
          setRuns(fetchedRuns);
        } catch (error) {
          console.error('Error fetching game runs:', error);
        } finally {
          setLoading(false);
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

  if (authLoading || !user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getChartData = (runs: GameRun[], type: 'blending' | 'segmenting' | 'total') => {
    return [...runs].reverse().map(run => ({
      date: new Date(run.createdAt).toLocaleDateString(),
      score:
        type === 'blending'
          ? run.blendingScore.correct
          : type === 'segmenting'
            ? run.segmentingScore.correct
            : run.blendingScore.correct + run.segmentingScore.correct,
      blendingScore: run.blendingScore.correct,
      segmentingScore: run.segmentingScore.correct,
      totalScore: run.blendingScore.correct + run.segmentingScore.correct,
    }));
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <DotPattern className="fixed inset-0 bg-gray-100 text-green-400" />
      <div className="relative z-10 flex flex-col overflow-x-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100/80 backdrop-blur-sm">
          <Header />
        </div>

        <main className="flex-grow container mx-auto px-8 pb-20 pt-32">
          <div className="w-full flex flex-col md:flex-row shadow-xl rounded-3xl relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 mb-8">
            <div className="flex-1 p-8 md:p-12 flex flex-col items-start relative">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome Back!</h1>
              <p className="text-lg text-white mb-6">{user.email}</p>
              <div className="flex gap-4">
                <Link href="/game">
                  <Button className="bg-white text-green-600 hover:bg-green-50 inline-flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Play Game
                  </Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-white border-white/30 hover:border-white hover:bg-white/20 bg-white/10 inline-flex items-center gap-2 transition-all duration-200">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <BarChart className="text-blue-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Game History</h2>
            </div>

            {loading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : runs.length > 0 ? (
              <>
                <LineChart data={getChartData(runs, 'total')} title="Overall Progress" color="#7c3aed" />
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <LineChart data={getChartData(runs, 'blending')} title="Blending Progress" color="#16a34a" />
                  <LineChart data={getChartData(runs, 'segmenting')} title="Segmenting Progress" color="#dc2626" />
                </div>
                <div className="mt-8 bg-white rounded-3xl shadow-lg p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-blue-100 p-3 rounded-2xl">
                      <BarChart className="text-blue-500 w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Game History</h2>
                  </div>

                  <div className="max-h-[600px] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {runs.map(run => (
                      <div
                        key={run.id}
                        className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-200 hover:shadow-md">
                        <p className="text-sm text-gray-500 mb-6">{formatDate(run.createdAt)}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
                          <CircularProgress
                            value={run.blendingScore.correct}
                            total={run.blendingScore.total}
                            color="#16a34a"
                            backgroundColor="#dcfce7"
                            label="Blending"
                            labelColor="#15803d"
                          />
                          <CircularProgress
                            value={run.segmentingScore.correct}
                            total={run.segmentingScore.total}
                            color="#dc2626"
                            backgroundColor="#fee2e2"
                            label="Segmenting"
                            labelColor="#b91c1c"
                          />
                          <CircularProgress
                            value={run.blendingScore.correct + run.segmentingScore.correct}
                            total={run.blendingScore.total + run.segmentingScore.total}
                            color="#7c3aed"
                            backgroundColor="#ede9fe"
                            label="Total Score"
                            labelColor="#6d28d9"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-4">No games played yet.</p>
                <Link href="/game">
                  <Button className="bg-green-500 text-white hover:bg-green-600 inline-flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Playing
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
